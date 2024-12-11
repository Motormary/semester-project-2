import { Skeleton } from "../ui/skeleton"

export default function ListingLoading() {
  return (
    <div
      className={`flex h-full w-full flex-col gap-4 overflow-hidden rounded-lg bg-card p-4 md:basis-1/2 xl:basis-1/3`}
    >
      <Skeleton className="aspect-[16/9] max-h-52 w-full rounded-md" />
      <div className="space-y-3">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-4 w-3/4" />
        <>
          <div className="pt-1.5">
            <Skeleton className="h-5 w-10" />
          </div>
          <div className="flex items-center space-x-2 pb-1 pt-2">
            <Skeleton className="h-3.5 w-10" />
            <Skeleton className="h-2 w-2 rounded-full" />
            <Skeleton className="h-3.5 w-14" />
          </div>
        </>
      </div>
    </div>
  )
}

export function LoadingListingBottom() {
  return (
    <>
      <div className="pt-1.5">
        <Skeleton className="h-5 w-10" />
      </div>
      <div className="flex items-center space-x-2 pb-1 pt-2">
        <Skeleton className="h-3.5 w-10" />
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-3.5 w-14" />
      </div>
    </>
  )
}
export function LoadingOther() {
  return (
    <>
      <div className="pt-1.5">
        <Skeleton className="h-3.5 w-10" />
      </div>
      <div className="flex items-center space-x-2 pb-1 pt-1.5">
        <Skeleton className="h-3.5 w-10" />
        <Skeleton className="h-2 w-2 rounded-full" />
        <Skeleton className="h-3.5 w-14" />
      </div>
    </>
  )
}
