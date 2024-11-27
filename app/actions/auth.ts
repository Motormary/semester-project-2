"use server"

import { API_AUTH_REGISTER } from "@/lib/constants"
import superFetch from "./fetch"
import { UserLogin } from "@/lib/definitions"

export async function RegisterUser(data: UserLogin) {
  const response = await superFetch({
    method: "POST",
    url: API_AUTH_REGISTER,
    body: data,
  })

  // TODO: Handle response
  
  if (response.error) {
    throw new Error(await response.error)
  } else if (response.data && !response.data.ok) {
    console.error("Error registering user:", await response.data.json())
  } else {
    console.log("Successful registration!", await response.data?.json())
  }
}
