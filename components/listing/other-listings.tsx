import getUserListings from "@/app/actions/user/get-listings"
import image from "assets/svg/alt.svg"
import Link from "next/link"
import { Fragment } from "react"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Listing from "./listing"
import PriceTag from "./price"
import { Separator } from "../ui/separator"
import ListingClock from "./listing-clock"
import { TYPE_LISTING } from "@/lib/definitions"

const containerStyles = {
  default: "flex gap-4 w-full shrink-1 max-w-[1400px]",
  xl: " mx-auto xl:w-full xl:flex-col xl:justify-center xl:border-t xl:pt-4",
}

type props = {
  user: string
  currentListingId: string // currently listing view
}

export default async function OtherListings({ user, currentListingId }: props) {
  const { data, success } = await getUserListings({
    user: user,
    params: { _active: "true" },
  })

  if (!success && data?.data?.length <= 1) return null

  const dataList = data.data.reduce<TYPE_LISTING[]>((acc, item, index) => {
    const currentDate = new Date()
    const endDate = new Date(item.endsAt)
    if (acc.length < 5 && endDate > currentDate && item.id !== currentListingId) acc.push(item)
    return acc
  }, [])

  return (
    <div className="w-full space-y-4 max-md:grid xl:max-w-[380px]">
      <h3 className="text-sm font-semibold xl:text-center">
        Other listings from this user
      </h3>
      <ScrollArea className="rounded-md pb-4">
        <div
          className={`${containerStyles.default} xl:${containerStyles.xl} py-1`}
        >
          {dataList.map((listing, index) => {
            return (
              <Fragment key={listing.id}>
                <div className="relative hidden w-full items-center gap-4 overflow-hidden rounded-md p-4 hover:bg-muted xl:flex">
                  <Link
                    className="absolute inset-0"
                    href={`/listing/${listing.id}`}
                  ></Link>
                  <picture className="flex aspect-square size-20 shrink-0 overflow-hidden rounded-md border bg-muted">
                    <img
                      src={listing.media?.[0]?.url ?? image.src}
                      alt="Listing"
                      className="h-full w-full object-cover"
                    />
                  </picture>
                  <div className="w-full space-y-3 [&>p]:leading-none">
                    <p className="max-w-[14.5rem] overflow-hidden truncate text-pretty text-sm">
                      {listing.title}
                    </p>
                    <PriceTag className={"text-sm"} id={listing.id} />
                    <div className="flex items-center">
                      <span className="flex items-center text-pretty text-xs text-muted-foreground">
                        {listing._count.bids} Bids
                        <ListingClock revalidate id={listing.id} user={user} />
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex shrink-0 basis-72 px-1 xl:hidden">
                  <Listing revalidate data={listing} />
                </div>
                {index !== dataList.length - 1 ? (
                  <Separator className="hidden xl:block" />
                ) : null}
              </Fragment>
            )
          })}
        </div>
        <ScrollBar orientation="horizontal" className="visible xl:hidden" />
      </ScrollArea>
    </div>
  )
}
