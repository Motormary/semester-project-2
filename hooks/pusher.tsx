"use client"

import { getCurrentUser } from "@/app/actions/user/get"
import { pusherClient } from "@/lib/pusher"
import { useRouter } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { toast } from "sonner"

type NotificationProps = {
  title: string
  description: string
  id: string
}

export default function Notifications() {
  const router = useRouter()
  const [user, setUser] = useState("")

  const handleNotification = useCallback(
    (notification: NotificationProps) => {
      toast.info(notification.title, {
        description: <strong>{notification.description}</strong>,
        action: {
          label: "View",
          onClick: () => router.push(`/listings/${notification.id}`),
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

    pusherClient.subscribe(user)
    pusherClient.bind("incoming-notification", handleNotification)

    return () => {
      pusherClient.unsubscribe(user)
      pusherClient.unbind("incoming-notification", handleNotification)
      pusherClient.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  return null
}
