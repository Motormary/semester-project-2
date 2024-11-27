import { Skeleton } from "../ui/skeleton"

export default function ListingLoading() {
  return (
    <div
      className={`flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-card p-4 md:basis-1/2 xl:basis-1/3`}
    >
      <Skeleton className="aspect-[16/9] max-h-52 w-full rounded-md" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-24 rounded-full" />
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-7 w-16" />
        <div className="flex items-center space-x-2">
          <Skeleton className="h-4 w-12" />
          <Skeleton className="h-2 w-2 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  )
}
