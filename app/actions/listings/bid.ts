"use server"

import { API_AH_LISTINGS } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_LISTING } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import superFetch from "../fetch"

type props = {
  data: { amount: number }
  id: string
  seller: string
}

export default async function bidOnListing({
  data,
  id,
  seller
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

  return { ...res }
}
