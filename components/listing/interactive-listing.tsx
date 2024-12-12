import { getCurrentUser } from "@/app/actions/user/get"
import { TYPE_LISTING } from "@/lib/definitions"
import { getTopBid } from "@/lib/utils"
import { Edit } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"
import Avatar from "../next-avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import BidForm from "./bid-form"
import BidListDialog from "./bid-list"
import ListingClock from "./listing-clock"
import ListingGallery from "./listing-gallery"
import NewListing from "./new-listing"
import PriceTag from "./price"
import { Suspense } from "react"
import { LoadingListingBottom } from "./listing-skeleton"

type props = {
  listing: TYPE_LISTING
}

export default async function InteractiveListing({ listing }: props) {
  let minBid
  const { data, success } = await getCurrentUser()
  if (!success) redirect("/login")
  const user = data.data
  if (listing.bids?.length) {
    minBid = getTopBid(listing.bids)[0].amount
  }
  return (
    <div className="space-y-4 w-full">
      {/* Username */}
      <div className="flex w-full items-center justify-between">
        <Link
          href={`/vendors/${listing.seller.name}`}
          className="flex items-center gap-2"
        >
          <div className="size-8">
            <Avatar src={listing.seller.avatar.url} alt="avatar" size={32} />
          </div>
          <span className="text-sm">{listing.seller.name}</span>
        </Link>
        {user && user.name === listing.seller.name ? (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <NewListing initialData={listing}>
                  <Edit
                    strokeWidth={1.5}
                    className="size-5 hover:cursor-pointer"
                  />
                </NewListing>
              </TooltipTrigger>
              <TooltipContent>Edit listing</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ) : null}
      </div>
      <div className="gap-6 space-y-4 lg:flex">
        <ListingGallery listing={listing} />
        <div className="w-full space-y-6 lg:min-w-52 lg:max-w-80">
          <h2 title={listing.title} className="text-pretty break-words line-clamp-3">
            {listing.title}
          </h2>
          {listing.tags?.[0] ? <Badge>{listing.tags[0]}</Badge> : null}
          <>
            <Suspense fallback={<LoadingListingBottom />}>
              <PriceTag id={listing.id} />
              <div className="flex items-center">
                <BidListDialog listing={listing}>
                  <Button
                    variant="link"
                    className="px-0 text-muted-foreground underline hover:text-secondary-foreground"
                  >
                    {listing._count.bids} Bids
                  </Button>
                </BidListDialog>
                <ListingClock
                  user={listing.seller.name}
                  revalidate={false}
                  id={listing.id}
                />
              </div>
            </Suspense>
          </>
          {user.name !== listing.seller.name ? (
            <BidForm
              credits={user.credits}
              seller={listing.seller.name}
              minBid={minBid}
              id={listing.id}
            />
          ) : null}
          <div className="text-pretty break-words">
            <p className="mb-1 font-semibold">Description</p>
            <p className="text-pretty text-sm">
              {listing.description?.trim()?.length
                ? listing.description
                : "No description provided"}
            </p>
          </div>
        </div>
      </div>
      {/* 3 */}
    </div>
  )
}
