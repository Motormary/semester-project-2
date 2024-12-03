"use server"

import { API_AH_USERS } from "@/lib/constants"
import { TYPE_GET_USER_BIDS, Method, CacheOptions } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

const getUserBids = cache(
  async (name: string): Promise<TYPE_GET_USER_BIDS> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const res = await superFetch<TYPE_GET_USER_BIDS>({
      method: Method.GET,
      url: API_AH_USERS + `/${name}/bids`,
      token: session.accessToken,
      cache: CacheOptions.ForceCache,
      tags: [`user-${name}-bids`],
    })

    if (!res.success) {
      console.error("⚡ getUserBids ~ Error fetching user bids:", res)
      return { ...res }
    }

    return { ...res }
  },
)

export default getUserBids