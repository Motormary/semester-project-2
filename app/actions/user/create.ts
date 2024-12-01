"use server"

import { API_AUTH_REGISTER } from "@/lib/constants"
import { TYPE_USER_LOGIN, TYPE_GET_USER, Method } from "@/lib/definitions"
import superFetch from "../fetch"
import { loginUser } from "./login"

export async function createUser(
    data: TYPE_USER_LOGIN,
  ): Promise<TYPE_GET_USER> {
    const res = await superFetch<TYPE_GET_USER>({
      method: Method.POST,
      url: API_AUTH_REGISTER,
      body: data,
    })
  
    if (res && !res.success) {
      console.error("⚡ createUser ~ Error creating user:", res)
      return { ...res }
    }
  
    const loginRes = await loginUser({
      email: res?.data.data.email,
      password: data.password,
    })
  
    if (loginRes && !loginRes?.success) {
      console.error("⚡ loginUser@createUser ~ Error signing in:", loginRes)
      return { ...loginRes }
    }
  
    return { ...res }
  }