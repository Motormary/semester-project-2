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
}

export function Countdown({ endsAt, id }: CountdownProps) {
  const url = useSearchParams()
  const hasSearch = url.has("search")
  const [timeLeft, setTimeLeft] = useState(
    calculateTimeDifference(endsAt.toString()),
  )
  const [isLessThanHour, setIsLessThanHour] = useState(false)
  const [ended, setIsEnded] = useState(
    new Date(endsAt) < new Date() ? true : false,
  )

  useEffect(() => {
    console.log("🚀 ~ Countdown - useEffect running! ~ path:")
    async function handleRevalidate() {
      RevalidateCache(CacheTags.ALL_LISTINGS)
      RevalidateCache(CacheTags.LISTING + id)
    }
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeDifference(endsAt.toString())
      setTimeLeft(newTimeLeft)

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0) {
        setIsLessThanHour(true)
      }

      // If the user has cached a page this will clean out the ended auctions when met. // ! Do not run with search & listing[id] & wins & inactive, as search will show ended listings === loop
      if (new Date(endsAt) < new Date() && !hasSearch && !ended) {
        handleRevalidate()
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endsAt, id, hasSearch])

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
