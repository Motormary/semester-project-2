"use client"

import { getCurrentUser } from "@/app/actions/user/get"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"
import useWebsocket from "./websocket"

type NotificationProps = {
  title: string
  description: string
  id: string
}

export default function Notifications() {
  const router = useRouter()
  const [user, setUser] = useState("")
  const { subscribe, bind, unsubscribe, unbind } = useWebsocket(user)

  const handleNotification = useCallback(
    (notification: NotificationProps) => {
      toast.info(notification.title, {
        description: <strong>{notification.description}</strong>,
        action: {
          label: "View",
          onClick: () => router.push(`/listing/${notification.id}`),
        },
        duration: 10000,
      })
    },
    [router],
  )

  useEffect(() => {
    const getUser = async () => {
      const { data, success } = await getCurrentUser()
      if (success && data.data.name) {
        setUser(data.data.name)
      }
    }
    getUser()
  }, [])

  useEffect(() => {
    if (!user) return

    subscribe()
    bind("incoming-notification", handleNotification)

    return () => {
      unsubscribe()
      unbind("incoming-notification", handleNotification)
    }
  }, [bind, handleNotification, subscribe, unbind, unsubscribe, user])

  return null
}
