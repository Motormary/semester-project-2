"use server"

import { API_AH_USERS } from "@/lib/constants"
import {
  TYPE_GET_USER_BIDS,
  Method,
  CacheOptions,
  CacheTags
} from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

type props = {
  user: string
  params?: any
}

const getUserBids = cache(
  async ({ user, params }: props): Promise<TYPE_GET_USER_BIDS> => {
    if (!user) throw new Error("User param is empty")
    const query = new URLSearchParams(params)
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const res = await superFetch<TYPE_GET_USER_BIDS>({
      method: Method.GET,
      url: API_AH_USERS + `/${user}/bids?${query}`,
      token: session.accessToken,
      cache: CacheOptions.ForceCache,
      tags: [CacheTags.USER_BIDS + user],
    })

    if (!res.success) {
      console.error("⚡ getUserBids ~ Error fetching user bids:", res)
      return { ...res }
    }

    return { ...res }
  },
)

export default getUserBids
