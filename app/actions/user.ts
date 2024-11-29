"use server"

import {
  API_AUTH_LOGIN,
  API_AUTH_REGISTER,
  API_AH_USERS,
} from "@/lib/constants"
import {
  CacheOptions,
  Method,
  TYPE_GET_USER,
  TYPE_USER,
  TYPE_USER_LOGIN,
} from "@/lib/definitions"
import { createSession, deleteSession, verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import { cache } from "react"
import superFetch from "./fetch"

// TODO: Handle cache

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

  // Create session and redirect
  await createSession({
    accessToken: res.data?.data.accessToken as string,
    username: res.data?.data.name as string,
  })

  return {...res}

}

export async function logoutUser() {
  await deleteSession()
}

// CREATE
export async function createUser(
  data: TYPE_USER_LOGIN,
): Promise<TYPE_GET_USER | void> {
  const res = await superFetch<TYPE_GET_USER>({
    method: Method.POST,
    url: API_AUTH_REGISTER,
    body: data,
  })

  if (!res.success) {
    console.error("⚡ createUser ~ Error creating user:", res)
    return res
  }

  const loginRes = await loginUser({
    email: res?.data.data.email,
    password: data.password,
  })

  if (loginRes && !loginRes?.success) {
    console.error("⚡ loginUser@createUser ~ Error signing in:", loginRes)
    return { ...loginRes }
  }
}

// READ
export const getUser = cache(async (name: string): Promise<TYPE_GET_USER> => {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await superFetch<TYPE_GET_USER>({
    method: Method.GET,
    url: API_AH_USERS + `/${name}`,
    token: session.accessToken,
    cache: CacheOptions.ForceCache,
    tags: [`user-${name}`],
  })

  if (!res.success) {
    console.error("⚡ getUser ~ Error fetching user:", res)
    return { ...res }
  }

  return res
})

export const getCurrentUser = cache(async () => {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  const res = await getUser(session.user)
  return {
    ...res,
    data: res.data.data,
  }
})

// TODO: Create schemas

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
    if (!session.accessToken) return failedToVerify()
    const urlWithParams = `${API_AH_USERS}/${user}/listings?_active=true${tag ? `&_tag=${tag}` : ""}${searchQuery ? `/search?q=${searchQuery}` : ""}`
    const res = await superFetch<any>({
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

// DELETE
