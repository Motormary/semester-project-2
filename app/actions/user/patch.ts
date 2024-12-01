"use server"

import { API_AH_USERS } from "@/lib/constants"
import { TYPE_USER, TYPE_GET_USER, Method } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import superFetch from "../fetch"

export const updateUser = async (data: TYPE_USER): Promise<TYPE_GET_USER> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const res = await superFetch<any>({
      method: Method.PUT,
      url: API_AH_USERS,
      body: data,
      token: session.accessToken,
    })
  
    if (!res.success) {
      console.error(res.data)
      return res
    }
  
    revalidateTag(`user-${data.name}`)
    // revalidateTag("users")
  
    return res
  }