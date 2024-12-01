"use server"

import { Method, TYPE_GET_USER, TYPE_USER_LOGIN } from "@/lib/definitions"
import superFetch from "../fetch"
import { API_AUTH_LOGIN } from "@/lib/constants"
import { createSession, deleteSession } from "@/lib/session"

export async function loginUser(data: TYPE_USER_LOGIN): Promise<TYPE_GET_USER> {
    const res = await superFetch<TYPE_GET_USER>({
      method: Method.POST,
      url: API_AUTH_LOGIN,
      body: data,
    })
  
    if (!res.success) {
      console.error("⚡ loginUser ~ Error signing in:", res)
      return res
    }
  
    await createSession({
      accessToken: res.data?.data.accessToken as string,
      username: res.data?.data.name as string,
    })
  
    return { ...res }
  }
  
  export async function logoutUser() {
    await deleteSession()
  }