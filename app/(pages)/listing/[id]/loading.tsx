import ListingLoading from "@/components/listing/listing-skeleton"
import { Separator } from "@/components/ui/separator"
import { Skeleton } from "@/components/ui/skeleton"
import { Dot } from "lucide-react"
import { Fragment } from "react"

export default function Loading() {
  return (
    <div className="h-fit w-full space-y-4 overflow-hidden">
      <Separator />
      <h1>Listing</h1>
      <div className="flex flex-col gap-y-6 rounded-lg border bg-card p-[5%] pb-8 text-card-foreground shadow-sm md:p-6 xl:flex-row xl:gap-6">
        <div className="space-y-4">
          {/* Username */}
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-2">
              <Skeleton className="size-7 rounded-full" />
              <Skeleton className="h-3.5 w-20" />
            </div>
          </div>
          <div className="gap-6 space-y-4 lg:flex">
            {/* Image */}
            <div className="space-y-4">
              <Skeleton className="aspect-square h-full w-full rounded-lg lg:h-[600px] lg:w-[600px]" />
              <Skeleton className="size-28" />
            </div>
            <div className="w-full space-y-6 lg:min-w-80">
              {/* Title + tag */}
              <Skeleton className="h-7 w-40" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoadingInteractive() {
  return (
    <div className="space-y-4">
      {/* Username */}
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Skeleton className="size-7 rounded-full" />
          <Skeleton className="h-3.5 w-20" />
        </div>
      </div>
      <div className="gap-6 space-y-4 lg:flex">
        {/* Image */}
        <div className="space-y-4">
          <Skeleton className="aspect-square h-full w-full rounded-lg lg:h-[600px] lg:w-[600px]" />
          <Skeleton className="size-28" />
        </div>
        <div className="w-full space-y-6 lg:min-w-80">
          {/* Title + tag */}
          <Skeleton className="h-7 w-40" />
        </div>
      </div>
    </div>
  )
}

export function LoadingOthers() {
  return (
    <div className="w-full space-y-4 max-md:grid xl:max-w-[380px]">
      <h3 className="text-sm font-semibold xl:text-center">
        Other listings from this user
      </h3>
      <div
        className={
          "shrink-1 flex w-full max-w-[1400px] gap-4 py-1 xl:mx-auto xl:w-full xl:flex-col xl:justify-center xl:border-t xl:pt-4"
        }
      >
        {Array.from({ length: 5 }).map((_, index) => {
          return (
            <Fragment key={index}>
              <div className="relative hidden w-full items-center gap-3.5 overflow-hidden rounded-md p-4 hover:bg-muted xl:flex">
                {/* Image */}
                <Skeleton className="aspect-square size-20" />
                <div className="w-full flex flex-col h-20 justify-between space-y-3">
                  {/* Title + price */}
                  <Skeleton className="h-4 w-2/3" />
                  <div>
                    {/* bid */}
                    <div className="flex items-center">
                      <Skeleton className="h-4 w-9" />
                      <>
                        <Dot
                          strokeWidth="3"
                          className="text-muted"
                        />
                        <Skeleton className="h-4 w-10" />
                      </>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 basis-72 px-1 xl:hidden">
                <ListingLoading />
              </div>
              {index !== 4 ? <Separator className="hidden xl:block" /> : null}
            </Fragment>
          )
        })}
      </div>
    </div>
  )
}
