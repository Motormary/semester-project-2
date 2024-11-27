"use client"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <div className="flex items-center gap-6">
      <h2 className="text-2xl">404</h2>
      <Separator decorative orientation="vertical" className="h-16" />
      <div className="flex flex-col items-center gap-2">
        <p>{error.message}</p>
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
