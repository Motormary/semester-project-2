"use server"

import { API_AH_LISTINGS } from "@/lib/constants"
import {
  CacheTags,
  Method,
  TYPE_CREATE_LISTING,
  TYPE_GET_LISTING
} from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import superFetch from "../fetch"

export default async function updateListing(
  data: TYPE_CREATE_LISTING, id: string ,
): Promise<TYPE_GET_LISTING> {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_LISTING>({
    method: Method.PUT,
    url: API_AH_LISTINGS + `/${id}`,
    body: data,
    token: session.accessToken,
  })

  if (!res.success) {
    console.error("⚡ updateListing ~ Error updating listing:", res)
    return { ...res }
  }

  revalidateTag(CacheTags.ALL_LISTINGS)
  revalidateTag(CacheTags.LISTING + id)
  revalidateTag(CacheTags.USER_LISTINGS + session.user)

  return { ...res }
}
