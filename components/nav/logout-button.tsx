"use client"

import { logoutUser } from "@/app/actions/user/login"
import { LogOut } from "lucide-react"

// Div element as button to trigger both sheet close and logout event. Do not try to fix with button/form/wrapping
export default function MobileLogoutButton() {
  async function logout() {
    await logoutUser()
  }
  return (
    <div
      onClick={logout}
      className="mx-auto flex h-full w-full cursor-pointer justify-between px-0 py-2 max-sm:w-full sm:w-1/2"
    >
      <p className="text-base select-none">Log out</p>
      <span>
        <LogOut className="size-5" />
      </span>
    </div>
  )
}
