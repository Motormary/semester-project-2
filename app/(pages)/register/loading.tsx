import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="w-full space-y-4">
      <Separator />
      <Skeleton className="mx-auto flex h-[42rem] w-full flex-col justify-center border bg-card/70 shadow-sm backdrop-blur-sm sm:w-1/2 lg:w-1/3" />
    </div>
  )
}
