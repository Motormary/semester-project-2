"use server"

import { API_AUTH_REGISTER } from "@/lib/constants"
import {
  Method,
  TYPE_GET_USER,
  TYPE_USER_LOGIN
} from "@/lib/definitions"
import { createSession } from "@/lib/session"
import bcrypt from "bcrypt"
import superFetch from "./fetch"

// CREATE
export async function RegisterUser(
  data: TYPE_USER_LOGIN,
): Promise<TYPE_GET_USER> {
  console.log("Starting registration")
  const res = await superFetch({
    method: Method.POST,
    url: API_AUTH_REGISTER,
    body: {
      ...data,
      password: await bcrypt.hash(data.password, 10),
    },
  })

  if (!res.success) return res

  // Create session and redirect
  await createSession({
    accessToken: res.data.data.accessToken as string,
    username: res.data.data.name,
  })

  delete res.data.data.accessToken

  return res // Just to make TS shut up.

}

// READ

// UPDATE

// DELETE