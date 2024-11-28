"use server"

import {
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
  API_SOCIAL_PROFILES,
} from "@/lib/constants"
import {
  ErrorType,
  Method,
  TYPE_GET_USER,
  TYPE_USER,
  TYPE_USER_LOGIN,
} from "@/lib/definitions"
import { createSession, verifySession } from "@/lib/session"
import { revalidateTag } from "next/cache"
import { cache } from "react"
import superFetch from "./fetch"

// TODO: Handle cache

function failedToVerify() {
  return {
    success: false,
    source: ErrorType.CAUGHT,
    data: "Failed to validate session" as any,
  }
}

export async function loginUser(data: TYPE_USER_LOGIN): Promise<TYPE_GET_USER> {
  const res = await superFetch({
    method: Method.POST,
    url: API_AUTH_LOGIN,
    body: data,
  })

  if (!res.success) {
    console.error(res.data)
    return res
  }

  return res
}

// CREATE
export async function createUser(
  data: TYPE_USER_LOGIN,
): Promise<TYPE_GET_USER> {
  const res = await superFetch({
    method: Method.POST,
    url: API_AUTH_REGISTER,
    body: data,
  })

  if (!res.success) {
    console.error(res.data)
    return res
  }

  const loginRes = await loginUser({
    email: res.data.data.email,
    password: data.password,
  })
  if (!loginRes?.success) {
    console.error(loginRes)
    return loginRes
  }
  // Create session and redirect
  await createSession({
    accessToken: loginRes.data.data.accessToken as string,
    username: loginRes.data.data.name,
  })

  /**
   * The following code is just for silencing TS when we try to access the error props
   */
  delete res.data.accessToken

  return res
}

// READ
export const getUser = cache(async (name: string): Promise<TYPE_GET_USER> => {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()

  const res = await superFetch({
    method: Method.GET,
    url: API_SOCIAL_PROFILES + `/${name}`,
    token: session.accessToken,
    tags: [`user-${name}`],
  })

  if (!res.success) {
    console.error(res.data)
    return res
  }

  return res
})

export const getCurrentUser = cache(async () => {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await getUser(session.user)
  return {
    success: res.success,
    source: res.source,
    data: res.data,
  }
})

export const getUserListings = cache(
  async ({
    name,
    searchQuery,
    tag,
    user,
  }: {
    name: string
    searchQuery: string
    tag: string
    user: string
  }): Promise<TYPE_GET_USER> => {
    const session = await verifySession()
    if (!session.accessToken)
      return {
        success: false,
        source: ErrorType.CAUGHT,
        data: "Failed to validate session" as any,
      }
    const urlWithParams = `${API_SOCIAL_PROFILES}/${user}/listings?_active=true${tag ? `&_tag=${tag}` : ""}${searchQuery ? `/search?q=${searchQuery}` : ""}`
    const res = await superFetch({
      method: Method.GET,
      url: urlWithParams,
      body: name,
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

// UPDATE
export const updateUser = async (data: TYPE_USER): Promise<TYPE_GET_USER> => {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch({
    method: Method.PUT,
    url: API_SOCIAL_PROFILES,
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

// DELETE
