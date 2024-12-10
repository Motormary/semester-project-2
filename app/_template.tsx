import Notifications from "@/hooks/pusher"
import { ReactNode } from "react"

type props = {
  children: ReactNode
}

export default async function Template({ children }: props) {
  return (
    <>
      {children}
      <Notifications />
    </>
  )
}
