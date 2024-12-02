"use server"

import { API_AH_LISTINGS } from "@/lib/constants"
import {
  CacheOptions,
  CacheTags,
  Method,
  TYPE_GET_LISTING,
} from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

export const getListing = cache(
  async (id: string): Promise<TYPE_GET_LISTING> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const res = await superFetch<TYPE_GET_LISTING>({
      method: Method.GET,
      url: API_AH_LISTINGS + `/${id}?_seller=true&_bids=true`,
      cache: CacheOptions.ForceCache,
      tags: [CacheTags.LISTING + id],
    })

    if (!res.success) {
      console.error("⚡ getListing ~ Error fetching listing:", res)
      return { ...res }
    }

    return { ...res }
  },
)
