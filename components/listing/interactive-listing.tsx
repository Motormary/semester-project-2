import { getCurrentUser } from "@/app/actions/user/get"
import { TYPE_LISTING } from "@/lib/definitions"
import { Edit, User } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Badge } from "../ui/badge"
import { Button } from "../ui/button"
import { CardTitle } from "../ui/card"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import BidListDialog from "./bid-list"
import { Countdown } from "./countdown"
import BidForm from "./bid-form"
import ListingGallery from "./listing-gallery"
import NewListing from "./new-listing"
import PriceTag from "./price"
import { compareValues } from "@/lib/utils"

type props = {
  listing: TYPE_LISTING
}

export default async function InteractiveListing({ listing }: props) {
  let user
  let minBid
  const { data, success } = await getCurrentUser()
  if (success) user = data.data
  if (listing.bids?.length) {
    minBid = listing.bids?.toSorted((a, b) => compareValues(a.amount, b.amount))[0].amount
  }
  return (
    <div className="space-y-4 mx-auto">
      {/* Username */}
      <div className="flex w-full items-center justify-between">
        <Link
          href={`/vendors/${listing.seller.name}`}
          className="flex items-center gap-2"
        >
          <Avatar className="max-h-7 max-w-7">
            <AvatarImage src={listing.seller.avatar?.url} alt="Avatar" />
            <AvatarFallback>
              <User className="size-5" />
            </AvatarFallback>
          </Avatar>
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
        <div className="w-full lg:min-w-96 space-y-6">
          <CardTitle className="overflow-hidden text-wrap break-words">
            {listing.title}
          </CardTitle>
          {listing.tags?.[0] ? <Badge>{listing.tags[0]}</Badge> : null}
          <div>
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
              <Countdown endsAt={listing.endsAt} id={listing.id} />
            </div>
          </div>
          <BidForm seller={listing.seller.name} minBid={minBid} id={listing.id} />
          <div className="text-pretty">
            <p className="mb-1 font-semibold">Description</p>
            <p className="text-pretty text-sm">{listing.description}</p>
          </div>
        </div>
      </div>
      {/* 3 */}
    </div>
  )
}
