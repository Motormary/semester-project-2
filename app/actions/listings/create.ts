"use server"

import { API_AH_LISTINGS } from "@/lib/constants"
import {
    Method,
    TYPE_GET_LISTING
} from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import superFetch from "../fetch"

export default async function createListing(
  id: string,
): Promise<TYPE_GET_LISTING> {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_LISTING>({
    method: Method.POST,
    url: API_AH_LISTINGS,
  })

  if (!res.success) {
    console.error("⚡ createListing ~ Error creating listing:", res)
    return { ...res }
  }

  return { ...res }
}
