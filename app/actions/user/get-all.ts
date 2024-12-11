"use server"

import { API_AH_USERS } from "@/lib/constants"
import { Method, TYPE_GET_USER } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { cache } from "react"
import superFetch from "../fetch"

const getAllUsers = cache(async (): Promise<TYPE_GET_USER> => {
    const session = await verifySession()
    if (!session.accessToken) return failedToVerify()
    const res = await superFetch<TYPE_GET_USER>({
      method: Method.GET,
      url: API_AH_USERS,
      token: session.accessToken,
      revalidate: 300,
      tags: [`users`],
    })
  
    if (!res.success) {
      console.error("⚡ getAllUsers ~ Error fetching all users:", res)
      return { ...res }
    }
  
    return { ...res }
  })

export default getAllUsers