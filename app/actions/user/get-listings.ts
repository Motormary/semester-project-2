"use server"

import { API_AH_USERS } from "@/lib/constants"
import { CacheOptions, CacheTags, Method, TYPE_GET_LISTINGS } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

type props = {
  params?: any
  user: string
}

const getUserListings = cache(
  async ({ params, user }: props): Promise<TYPE_GET_LISTINGS> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const query = new URLSearchParams(params)
    let searchQ
    query.set("limit", "12")
    query.set("_active", "true")
    query.set("sort", "created")
    const hasSearch = params?.search

    if (hasSearch) {
      searchQ = `/search?q=${params.search}`
      query.delete("search")
    }

    const res = await superFetch<TYPE_GET_LISTINGS>({
      method: Method.GET,
      url: API_AH_USERS + `/${user}/listings` + `${hasSearch ? `${searchQ}&` : "?"}${query.toString()}`,
      token: session.accessToken,
      cache: CacheOptions.ForceCache,
      tags: [CacheTags.USER_LISTINGS + user],
    })

    if (!res.success) {
      console.error(res.data)
      return res
    }

    return res
  },
)

export default getUserListings
