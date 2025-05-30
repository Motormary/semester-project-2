"use server"

import { API_AH_LISTINGS } from "@/lib/constants"
import {
  CacheTags,
  Method,
  TYPE_GET_LISTINGS
} from "@/lib/definitions"
import { cache } from "react"
import superFetch from "../fetch"

type params = {
  searchParams: any
}

const getAllListings = cache(
  async (
    params?: URLSearchParams | string[][] | string | any,
  ): Promise<TYPE_GET_LISTINGS> => {
    const query = new URLSearchParams(params)
    let searchQ
    query.set("limit", "12")
    query.set("_active", "true")
    query.set("sort", "created")
    query.set("_seller", "true")
    const hasSearch = params?.search

    if (hasSearch) {
      searchQ = `/search?q=${params.search}`
      query.delete("search")
    }

    const res = await superFetch<TYPE_GET_LISTINGS>({
      method: Method.GET,
      url:
        API_AH_LISTINGS +
        `${hasSearch ? `${searchQ}&` : "?"}${query.toString()}`, // ? Backend ignores tags when searching
      revalidate: 300,
      tags: [CacheTags.ALL_LISTINGS],
    })

    if (!res.success) {
      console.error("⚡ getAllListings ~ Error fetching listings:", res)
      return { ...res }
    }

    return { ...res }
  },
)

export default getAllListings
