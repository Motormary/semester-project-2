"use server"

import { API_AH_USERS } from "@/lib/constants"
import { CacheTags, Method, TYPE_GET_USER_BIDS } from "@/lib/definitions"
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

    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()

    const query = new URLSearchParams(params)
    const isSearch = query.has("user_listings")

    if (isSearch) query.delete("limit")

    const res = await superFetch<TYPE_GET_USER_BIDS>({
      method: Method.GET,
      url: API_AH_USERS + `/${user}/bids?${query}`,
      token: session.accessToken,
      revalidate: 300,
      tags: [CacheTags.USER_BIDS + user],
    })

    if (!res.success) {
      console.error("⚡ getUserBids ~ Error fetching user bids:", res)
      return { ...res }
    }

    if (isSearch) {
      const searchValue = params.user_listings?.toLowerCase()

      res.data.data = res.data.data.filter(
        (bid) =>
          bid.listing.title.toLowerCase().includes(searchValue) ||
          (bid.listing.description && bid.listing.description.toLowerCase().includes(searchValue)),
      )
    }

    return { ...res }
  },
)

export default getUserBids
