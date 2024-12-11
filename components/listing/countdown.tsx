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
  user: string
  topBidder?: string
  defaultTime: {
    days: number
    hours: number
    minutes: number
    seconds: number
  }
}

/**
 * @description - Calculates time to end of auction and shows a dynamic clock.
 * - When time reaches 00:00 all the related caches of post will be revalidated (if the listing is in view).
 * ! This should not be handled on front-end like this, but we use what we got
 */
export function Countdown({
  endsAt,
  id,
  user,
  defaultTime,
  topBidder,
}: CountdownProps) {
  const searchParams = useSearchParams()
  const isSearchQuery = searchParams.has("search")
  const isListingQuery = searchParams.has("user_listings")
  const [timeLeft, setTimeLeft] = useState(defaultTime)
  const [isLessThanHour, setIsLessThanHour] = useState(
    () => defaultTime.days === 0 && defaultTime.hours === 0,
  )
  const [ended, setIsEnded] = useState(false)

  useEffect(() => {
    // Limit unnecessary intervals, anything over 1.5 hours will stop the clock from running
    if (ended || timeLeft.days > 0 || timeLeft.hours > 1 || (timeLeft.hours === 1 && timeLeft.minutes > 30)) return
    // todo: remove this
    console.log("useEffect is running amok!")
    async function handleRevalidate() {
      // Revalidate relevant caches associated with listing
      RevalidateCache(CacheTags.ALL_LISTINGS)
      RevalidateCache(CacheTags.LISTING + id)
      RevalidateCache(CacheTags.USER_LISTINGS + user)
      RevalidateCache(CacheTags.USER + user)
      if (topBidder) {
        RevalidateCache(CacheTags.USER_WINS + topBidder)
        RevalidateCache(CacheTags.USER + topBidder)
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

        if (!isSearchQuery && !isListingQuery) {
          handleRevalidate()
        }
      }
    }, 1000)

    return () => clearInterval(timer)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ended, isSearchQuery, isListingQuery])

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
