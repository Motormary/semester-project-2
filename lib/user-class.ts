import { cache } from "react"
import { GETProfile, UserLogin, UserRegister } from "./definitions"
import { RegisterUser } from "@/app/actions/auth"

// TODO: REMOVE VOIDS

class UserApi {
  public register = async (data: UserRegister): Promise<GETProfile | void> => {
    return await RegisterUser(data)
  }

  public login = async (data: UserLogin): Promise<GETProfile | void> => {}

  public get = cache(async (name: string): Promise<GETProfile | void> => {})

  public update = async (data: UserRegister): Promise<GETProfile | void> => {}
}

export const user = new UserApi()
