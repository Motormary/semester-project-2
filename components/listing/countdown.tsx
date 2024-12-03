"use client"

import { calculateTimeDifference } from "@/lib/utils"
import { useState, useEffect } from "react"
import { CacheTags } from "@/lib/definitions"
import { RevalidateCache } from "@/app/actions/revalidate"
import { toast } from "sonner"
import { Dot } from "lucide-react"

interface CountdownProps {
  endsAt: string
  id: string
}

export function Countdown({ endsAt, id }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeDifference(endsAt))
  const [isLessThanHour, setIsLessThanHour] = useState(false)
  const [ended, setIsEnded] = useState(new Date(endsAt) < new Date() ? true : false)

  useEffect(() => {
    async function handleRevalidate() {
      toast.info(`Post ${id} has ended`) // Todo: Create route that checks if user has bid on item 
      RevalidateCache(CacheTags.ALL_LISTINGS)
      RevalidateCache(CacheTags.LISTING + id)
    }
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeDifference(endsAt)
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0) {
        setIsLessThanHour(true)
      }

      if (
        newTimeLeft.days === 0 &&
        newTimeLeft.hours === 0 &&
        newTimeLeft.minutes === 0 &&
        newTimeLeft.seconds === 0
      ) {
        setIsEnded(true)
        handleRevalidate()
        clearInterval(timer)
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endsAt, id])

  const formatTime = (value: number) => value.toString().padStart(2, "0")

  const formatDaysHours = (days: number, hours: number) => {
    if (days > 0) {
      return `${days}d ${formatTime(hours)}h`
    } else {
      return `${formatTime(hours)}h ${formatTime(timeLeft.minutes)}m`
    }
  }

  if (ended) {
    return (
      <>
        <Dot className="text-destructive" strokeWidth="3" />
        <span className="text-sm">Ended</span>
      </>
    )
  }

  if (isLessThanHour) {
    return (
      <>
        <Dot stroke="rgb(34 197 94)" fill="rgb(34 197 94)" strokeWidth="3" />
        <div className="text-sm text-destructive">
          {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
        </div>
      </>
    )
  }

  return (
    <>
      <Dot stroke="rgb(34 197 94)" fill="rgb(34 197 94)" strokeWidth="3" />
      <div className="text-sm">
        {formatDaysHours(timeLeft.days, timeLeft.hours)}
      </div>
    </>
  )
}
