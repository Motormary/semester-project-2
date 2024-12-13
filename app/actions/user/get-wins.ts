"use server"

import { API_AH_USERS } from "@/lib/constants"
import {
  CacheTags,
  Method,
  TYPE_GET_LISTINGS
} from "@/lib/definitions"
import { cache } from "react"
import superFetch from "../fetch"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"

type props = {
  params?: any
  user: string
}

const getUserWins = cache(
  async ({ params, user }: props): Promise<TYPE_GET_LISTINGS> => {
    if (!user) throw new Error("⛔ ~ GetUserWins ~ User is missing")
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const query = new URLSearchParams(params)
    const isSearch = query.has("user_listings")
    if (isSearch) query.delete("limit")

    const res = await superFetch<TYPE_GET_LISTINGS>({
      method: Method.GET,
      url: API_AH_USERS + `/${user}/wins?${query.toString()}`,
      token: session.accessToken,
      tags: [CacheTags.USER_WINS + user],
      revalidate: 30
    })

    if (!res.success) {
      console.error("⚡ getUserWins ~ Error fetching listings:", res)
      return { ...res }
    }

    if (isSearch) {
      const searchValue = params.user_listings.toLowerCase()
      res.data.data = res.data.data.filter(
        (listing) =>
          listing.title.toLowerCase().includes(searchValue) ||
          (listing.description && listing.description.toLowerCase().includes(searchValue)),
      )
    }

    return { ...res }
  },
)

export default getUserWins
