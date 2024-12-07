"use server"

import { API_AH_USERS } from "@/lib/constants"
import { TYPE_GET_USER, Method, CacheOptions, CacheTags } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

export const getUser = cache(async (user: string): Promise<TYPE_GET_USER> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const res = await superFetch<TYPE_GET_USER>({
      method: Method.GET,
      url: API_AH_USERS + `/${user}`,
      token: session.accessToken,
      cache: CacheOptions.ForceCache,
      tags: [CacheTags.USER + user],
    })
  
    if (!res.success) {
      console.error("⚡ getUser ~ Error fetching user:", res)
      return { ...res }
    }
    console.log("🚀 ~ getUser ~ res:", res)
  
    return { ...res }
  })
  
  export const getCurrentUser = cache(async (): Promise<TYPE_GET_USER> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const res = await getUser(session.user)
  
    return {
      ...res,
    }
  })