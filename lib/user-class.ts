import { cache } from "react"
import {
  TYPE_GET_USER,
  TYPE_USER_LOGIN,
  TYPE_USER_REGISTER,
} from "./definitions"
import { createUser } from "@/app/actions/auth"

// TODO: REMOVE VOIDS

class UserApi {
  public register = async (
    data: TYPE_USER_REGISTER,
  ): Promise<TYPE_GET_USER> => {
    return await createUser(data)
    
  }

  public login = async (
    data: TYPE_USER_LOGIN,
  ): Promise<TYPE_GET_USER | void> => {}

  public get = cache(async (name: string): Promise<TYPE_GET_USER | void> => {})

  public update = async (
    data: TYPE_USER_REGISTER,
  ): Promise<TYPE_GET_USER | void> => {}
}

export const user = new UserApi()
