"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { useEffect } from "react"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => console.error(error), [error])

  return (
    <div className="flex h-96 w-full items-center justify-center gap-6">
      <h2>404</h2>
      <Separator decorative orientation="vertical" className="h-16" />
      <div className="flex flex-col items-center gap-2">
        <p>This is not the page you&apos;re looking for</p>
        <Button
          size="sm"
          variant="destructive"
          className="w-fit"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  )
}

export function ProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => console.error(error), [error])
  return (
    <div className="mx-auto flex h-96 w-full flex-col items-center justify-center gap-6 overflow-hidden rounded-lg border bg-card p-4 py-5 text-center shadow-sm sm:mt-[2rem] sm:max-w-[274px]">
      <h2>Error</h2>
      <Separator decorative orientation="horizontal" />
      <div className="flex flex-col items-center gap-2">
        <p>This is not the page you&apos;re looking for</p>
        <Button
          size="sm"
          variant="destructive"
          className="w-fit"
          onClick={() => reset()}
        >
          Try again
        </Button>
      </div>
    </div>
  )
}
