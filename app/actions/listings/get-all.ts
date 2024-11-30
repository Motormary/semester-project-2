"use server"

import { CacheOptions, CacheTags, Method, TYPE_GET_LISTINGS } from "@/lib/definitions"
import { cache } from "react"
import superFetch from "../fetch"
import { API_AH_LISTINGS } from "@/lib/constants"

export const getAllListings = cache(async (): Promise<TYPE_GET_LISTINGS> => {
  const res = await superFetch<TYPE_GET_LISTINGS>({
    method: Method.GET,
    url: API_AH_LISTINGS,
    cache: CacheOptions.ForceCache,
    tags: [CacheTags.ALL_LISTINGS],
  })

  if (!res.success) {
    console.error("⚡ getAllListings ~ Error fetching listings:", res)
    return { ...res }
  }

  return { ...res }
})
