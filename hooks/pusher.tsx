"use client"

import { buttonVariants } from "@/components/ui/button"
import { pusherClient } from "@/lib/pusher"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useCallback, useEffect } from "react"
import { toast } from "sonner"

type NotificationProps = {
  title: string
  description: string
  id: string
}

export default function Notifications({ user }: { user: string }) {
  const handleNotification = useCallback((notification: NotificationProps) => {
    toast.info(notification.title, {
      description: <strong>{notification.description}</strong>,
      action: (
        <Link
          className={cn(buttonVariants({ variant: "default", size: "sm" }), "ml-auto")}
          href={`/listing/${notification.id}`}
        >
          View
        </Link>
      ),
      duration: 10000,
    })
  }, [])

  useEffect(() => {
    pusherClient.subscribe(user)
    pusherClient.bind("incoming-notification", handleNotification)

    return () => {
      pusherClient.unsubscribe(user)
      pusherClient.unbind("incoming-notification", handleNotification)
      pusherClient.disconnect()
    }
  }, [handleNotification, user])

  return null
}
