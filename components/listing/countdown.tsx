"use client"

import { calculateTimeDifference } from "@/lib/utils"
import { useState, useEffect } from "react"

interface CountdownProps {
  endsAt: string
}

// ? Compensate for time difference created by fetching etc(?)
export function Countdown({ endsAt }: CountdownProps) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeDifference(endsAt))
  const [isLessThanHour, setIsLessThanHour] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = calculateTimeDifference(endsAt);
      setTimeLeft(newTimeLeft);

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0) {
        setIsLessThanHour(true);
      }

      if (newTimeLeft.days === 0 && newTimeLeft.hours === 0 && newTimeLeft.minutes === 0 && newTimeLeft.seconds === 0) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endsAt]);

  const formatTime = (value: number) => value.toString().padStart(2, '0');

  const formatDaysHours = (days: number, hours: number) => {
    if (days > 0) {
      return `${days}d ${formatTime(hours)}h`;
    } else {
      return `${formatTime(hours)}h ${formatTime(timeLeft.minutes)}m`;
    }
  };

  //? Will this trigger at end?
  if (new Date(endsAt) < new Date())
    return (
      <span className="text-sm">
        Ended
      </span>
    )

    if (isLessThanHour) {
      console.log("🚀 ~ Countdown ~ isLessThanHour:", isLessThanHour)
      return (
        <div className="text-sm text-destructive">
          {formatTime(timeLeft.minutes)}m {formatTime(timeLeft.seconds)}s
        </div>
      );
    }
  
    return (
      <div className="text-sm">
        {formatDaysHours(timeLeft.days, timeLeft.hours)}
      </div>
    );
}
