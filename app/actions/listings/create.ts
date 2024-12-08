"use server"

import { API_AH_LISTINGS } from "@/lib/constants"
import {
  CacheTags,
  Method,
  TYPE_CREATE_LISTING,
  TYPE_GET_LISTING,
} from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import superFetch from "../fetch"
import { revalidateTag } from "next/cache"

export default async function createListing(
  data: TYPE_CREATE_LISTING,
): Promise<TYPE_GET_LISTING> {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_LISTING>({
    method: Method.POST,
    url: API_AH_LISTINGS,
    body: data,
    token: session.accessToken
  })

  if (!res.success) {
    console.error("⚡ createListing ~ Error creating listing:", res)
    return { ...res }
  }

  revalidateTag(CacheTags.ALL_LISTINGS)
  revalidateTag(CacheTags.USER_LISTINGS + session.user)

  return { ...res }
}
