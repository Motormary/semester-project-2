"use server"

import { API_AH_USERS } from "@/lib/constants"
import {
  CacheOptions,
  CacheTags,
  Method,
  TYPE_GET_LISTINGS,
} from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"
import createPaginatedSearchResults from "@/lib/custom-pagination"

type props = {
  params?: any
  user: string
}

const getUserListings = cache(
  async ({ params, user }: props): Promise<TYPE_GET_LISTINGS> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const isInactiveQuery = params?._active === "false"
    const query = new URLSearchParams(params)
    const searchQuery = params?.user_listings
      ? params.user_listings.toLowerCase()
      : undefined
    const page = params?.page ? Number(params.page) : 1
    const tag = params?._tags ? params._tags : undefined

    if (searchQuery || isInactiveQuery) {
      // Remove queries from API call and handle them on server
      query.delete("user_listings")
      query.delete("limit")
      query.delete("page")
      query.delete("_tags")
    }

    const res = await superFetch<TYPE_GET_LISTINGS>({
      method: Method.GET,
      url: API_AH_USERS + `/${user}/listings?` + query.toString(),
      token: session.accessToken,
      cache: CacheOptions.ForceCache,
      tags: [CacheTags.USER_LISTINGS + user],
    })

    if (!res.success) {
      console.error(res.data)
      return res
    }

    if (searchQuery || query.get("_active") === "false") {
      //! This is not a in any way "best practice". It is just for fun, don't do this. ⚡

      // Backend can't handle search queries for user listings, so we handle it on the frontend
      const newRes = { ...res, data: { ...res.data, data: [...res.data.data] } }

      if (res.data.meta.nextPage) {
        const newParams = new URLSearchParams(query)

        // Recursion - since we're limited to 100 results per page #yolo
        const fetchAllPages = async () => {
          try {
            newParams.set(
              "page",
              res.data.meta.nextPage?.toString() ?? "9999", // Just to make TS shut up as we've already checked nextpage, 99999 will return nothing anyways.
            )
            newParams.delete("_active")
            const { data, success } = await getUserListings({
              params: newParams,
              user,
            })
            if (!success) return

            newRes.data.data.push(...data.data)

            if (data.meta.nextPage) {
              res.data.meta.nextPage = data.meta.nextPage
              await fetchAllPages()
            }
          } catch (error) {
            console.error("⛔ ~ Error fetching additional pages:", error)
          }
        }

        await fetchAllPages()
      }

      return createPaginatedSearchResults(
        newRes,
        searchQuery,
        page,
        tag,
        query.get("_active") === "true",
      )
    }

    return res
  },
)

export default getUserListings
