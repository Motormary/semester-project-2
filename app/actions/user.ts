"use server"

import { API_AUTH_REGISTER, API_SOCIAL_PROFILES } from "@/lib/constants"
import {
  Method,
  TYPE_GET_USER,
  TYPE_USER,
  TYPE_USER_LOGIN,
} from "@/lib/definitions"
import { createSession, verifySession } from "@/lib/session"
import bcrypt from "bcrypt"
import { cache } from "react"
import superFetch from "./fetch"
import { revalidateTag } from "next/cache"

// TODO: Handle cache

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
