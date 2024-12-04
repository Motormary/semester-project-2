"use server"

import { API_AH_USERS } from "@/lib/constants"
import { TYPE_GET_USER, Method } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

const getUserListings = cache(
  async ({
    searchQuery,
    tag,
    user,
  }: {
    searchQuery?: string
    tag?: string
    user: string
  }): Promise<TYPE_GET_USER> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const urlWithParams = `${API_AH_USERS}/${user}/listings?_active=true${tag ? `&_tag=${tag}` : ""}${searchQuery ? `/search?q=${searchQuery}` : ""}`
    const res = await superFetch<any>({
      method: Method.GET,
      url: urlWithParams,
      token: session.accessToken,
      // tags: [`user-${name}-listings`],
    })

    if (!res.success) {
      console.error(res.data)
      return res
    }

    return res
  },
)

export default getUserListings
