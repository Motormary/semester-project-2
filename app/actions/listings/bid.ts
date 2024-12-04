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
}

export default async function bidOnListing({
  data,
  id,
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

  return { ...res }
}
