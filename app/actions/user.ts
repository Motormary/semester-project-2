"use server"

import { API_AUTH_REGISTER, API_SOCIAL_PROFILES } from "@/lib/constants"
import { Method, TYPE_GET_USER, TYPE_USER, TYPE_USER_LOGIN } from "@/lib/definitions"
import { createSession, verifySession } from "@/lib/session"
import bcrypt from "bcrypt"
import { cache } from "react"
import superFetch from "./fetch"
import { revalidateTag } from "next/cache"

// CREATE
export async function createUser(
  data: TYPE_USER_LOGIN,
): Promise<TYPE_GET_USER> {
  const res = await superFetch({
    method: Method.POST,
    url: API_AUTH_REGISTER,
    body: {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    },
  })

  if (!res.success) {
    console.error(res.data)
    return res
  }

  // Create session and redirect
  await createSession({
    accessToken: res.data.data.accessToken as string,
    username: res.data.data.name,
  })

  /**
   * The following code is just for silencing TS when we try to access the error props
   * |
   * |
   * V
   */
  delete res.data.data.accessToken

  return res
}

// READ
export const getUser = cache(async (name: string): Promise<TYPE_GET_USER> => {
  const session = await verifySession()
  const res = await superFetch({
    method: Method.GET,
    url: API_SOCIAL_PROFILES,
    body: name,
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
  return await getUser(session.user)
})

export const getUserListings = cache(async ({name, searchQuery, tag, param}: {
  name : string
  searchQuery: string
  tag: string
  param: string
}): Promise<TYPE_GET_USER> => {
  const session = await verifySession()
  const urlz = new URLSearchParams()
  const newUrl = `${API_SOCIAL_PROFILES}/listings?_active=true${tag ? `` : ""}`
  const res = await superFetch({
    method: Method.GET,
    url: API_SOCIAL_PROFILES + "/listings?_active=true" + searchQuery ? `/search?q=${searchQuery}` : "",
    body: name,
    token: session.accessToken,
    tags: [`user-${name}-listings`],
  })

  if (!res.success) {
    console.error(res.data)
    return res
  }

  return res
})


// UPDATE
export const updateUser = async (data: TYPE_USER): Promise<TYPE_GET_USER> => {
  const session = await verifySession()
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
  revalidateTag("users")

  return res
}


// DELETE
