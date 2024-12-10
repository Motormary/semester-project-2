"use server"

import { API_AH_LISTINGS } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_LISTING } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import superFetch from "../fetch"
import { pusherServer } from "@/lib/pusher"

type props = {
  data: { amount: number }
  id: string
  seller: string
}

export default async function bidOnListing({
  data,
  id,
  seller,
}: props): Promise<TYPE_GET_LISTING> {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_LISTING>({
    method: Method.POST,
    url: API_AH_LISTINGS + `/${id}/bids`,
    body: data,
    token: session.accessToken,
  })

  if (!res.success) {
    console.error("⚡ bidOnListing ~ Error bidding on listing:", res)
    return { ...res }
  }

  revalidateTag(CacheTags.ALL_LISTINGS)
  revalidateTag(CacheTags.LISTING + id)
  revalidateTag(CacheTags.USER_LISTINGS + seller)
  revalidateTag(CacheTags.USER_BIDS + session.user)
  revalidateTag(CacheTags.USER + session.user)

  // If the seller is online, trigger a notification on their end.
  pusherServer.trigger(seller, "incoming-notification", {
    title: `You have receive a bid for ${data.amount} credits`,
    description: res.data.data.title,
    id: res.data.data.id
  })

  return { ...res }
}
