"use client"

import { RevalidateCache } from "@/app/actions/revalidate"
import { CacheTags } from "@/lib/definitions"
import { calculateTimeDifference } from "@/lib/utils"
import { Dot } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

interface CountdownProps {
  endsAt: Date
  id: string
  user?: string
}

/**
 * @description - Calculates time to end of auction and shows a dynamic clock.
 * - When time reaches 00:00 all post + id of post will be revalidated.
 */
export function Countdown({ endsAt, id, user }: CountdownProps) {
  const searchParams = useSearchParams()
  const isSearchQuery = searchParams.get("search")
  const isListingQuery = searchParams.get("user_listings")
  const [timeLeft, setTimeLeft] = useState(() =>
    calculateTimeDifference(endsAt.toString()),
  )
  const [isLessThanHour, setIsLessThanHour] = useState(false)
  const [ended, setIsEnded] = useState(false)

  useEffect(() => {
    if (ended) return
    // todo: remove this
    console.log("useEffect is running amok!")
    async function handleRevalidate() {
      RevalidateCache(CacheTags.ALL_LISTINGS)
      RevalidateCache(CacheTags.LISTING + id)
      if (user) {
        RevalidateCache(CacheTags.USER_LISTINGS + user)
      }
    }

    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeDifference(endsAt.toString())
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0) {
        setIsLessThanHour(true)
      }

      if (new Date(endsAt) < new Date()) {
        setIsEnded(true)
        clearInterval(timer)

        if (!isSearchQuery || !isListingQuery) {
          handleRevalidate()
        }
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [endsAt, id, ended, isSearchQuery, isListingQuery, user])

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
