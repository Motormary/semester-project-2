"use client"

import { pusherClient } from "@/lib/pusher"
import { useRouter } from "next/navigation"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"

type NotificationProps = {
  title: string
  description: string
  id: string
}

export default function Notifications({ user }: { user: string }) {
  const router = useRouter()

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
    if (!user) return

    pusherClient.subscribe(user)
    pusherClient.bind("incoming-notification", handleNotification)

    return () => {
      pusherClient.unsubscribe(user)
      pusherClient.unbind("incoming-notification", handleNotification)
      pusherClient.disconnect()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
