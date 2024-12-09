import ListingLoading from "@/components/listing/listing-skeleton"
import { Skeleton } from "@/components/ui/skeleton"

export function ProfileLoading() {
  return (
    <div className="mx-auto h-fit w-full space-y-6 overflow-hidden rounded-lg border bg-card p-4 py-5 shadow-sm sm:mt-8 sm:max-w-[274px]">
      <Skeleton className="mx-auto aspect-square h-[240px] w-[240px] rounded-full" />
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-6 w-24" />
        <Skeleton className="mx-auto h-4 w-48" />
      </div>
      <div className="space-y-2 text-center">
        <Skeleton className="mx-auto h-4 w-16" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mx-auto h-4 w-3/4" />
      </div>
      <Skeleton className="h-10 w-full" />
      <div className="grid grid-cols-2 gap-4 [&>div]:space-y-2">
        <div className="col-span-2 text-center">
          <Skeleton className="mx-auto h-4 w-24" />
          <Skeleton className="mx-auto h-6 w-16" />
        </div>
        <div className="col-span-1 text-center">
          <Skeleton className="mx-auto h-4 w-24" />
          <Skeleton className="mx-auto h-6 w-8" />
        </div>
        <div className="col-span-1 text-center">
          <Skeleton className="mx-auto h-4 w-24" />
          <Skeleton className="mx-auto h-6 w-8" />
        </div>
      </div>
    </div>
  )
}

export default async function LoadingProfileList() {
  return (
    <>
      <div className="w-full text-center opacity-0">
        <small className="text-muted-foreground">
          Showing 0 out of 0
        </small>
      </div>
      {Array.from({ length: 3 }).map((_, index) => (
        <ListingLoading key={index} />
      ))}
    </>
  )
}
