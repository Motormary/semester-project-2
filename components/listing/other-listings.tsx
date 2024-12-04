import getUserListings from "@/app/actions/user/get-listings"
import image from "assets/svg/alt.svg"
import Link from "next/link"
import { Fragment } from "react"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { Countdown } from "./countdown"
import Listing from "./listing"
import PriceTag from "./price"
import { Separator } from "../ui/separator"

const containerStyles = {
  default: "flex gap-4 w-full shrink-1 max-w-[1400px]",
  xl: " mx-auto xl:w-full xl:flex-col xl:justify-center xl:border-t",
}

type props = {
  user: string
  currentListingId: string // currently listing view
}

export default async function OtherListings({ user, currentListingId }: props) {
  const { data, success } = await getUserListings({ user: user })

  if (!success || data?.data?.length <= 1) return null

  return (
    <div className="w-full space-y-4 max-md:grid xl:max-w-[30%]">
      <h3 className="text-sm font-semibold xl:text-center">
        Other listings from this user
      </h3>
      <ScrollArea className="rounded-md pb-4">
        <div className={`${containerStyles.default} xl:${containerStyles.xl}`}>
          {data.data.map((listing, index) => {
            if (listing.id === currentListingId || index > 4) return
            return (
              <Fragment key={listing.id}>
                <div className="relative hidden w-full items-center gap-4 overflow-hidden rounded-md p-4 hover:bg-muted xl:flex">
                  <Link
                    className="absolute inset-0"
                    href={`/listing/${listing.id}`}
                  ></Link>
                  <picture className="flex aspect-square size-20 overflow-hidden rounded-md border bg-muted">
                    <img
                      src={listing.media?.[0]?.url ?? image.src}
                      alt="Listing"
                      className="h-full w-full object-cover"
                    />
                  </picture>
                  <div className="space-y-3 [&>p]:leading-none">
                    <p className="max-w-[14.5rem] overflow-hidden truncate text-pretty text-sm">
                      {listing.title}
                    </p>
                    <PriceTag className={"text-sm"} id={listing.id} />
                    <div className="flex items-center">
                      <span className="flex items-center text-pretty text-xs text-muted-foreground">
                        {listing._count.bids}
                        <Countdown endsAt={listing.endsAt} id={listing.id} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 basis-72 xl:hidden">
                  <Listing data={listing} />
                </div>
                {index !== data.data.length - 1 ? <Separator className="hidden xl:block" /> : null}
              </Fragment>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="xl:hidden" />
      </ScrollArea>
    </div>
  )
}
