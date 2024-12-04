import { Edit, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import ListingCarousel from "./listing-carousel"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { CardTitle } from "../ui/card"
import BidListDialog from "./bid-list"
import { TYPE_LISTING } from "@/lib/definitions"
import Link from "next/link"
import NewListing from "./new-listing"
import { getCurrentUser } from "@/app/actions/user/get"
import PriceTag from "./price"
import { Countdown } from "./countdown"

type props = {
  listing: TYPE_LISTING
}

export default async function InteractiveListing({ listing }: props) {
  let user
  const { data, success } = await getCurrentUser()
  if (success) user = data.data
  return (
    <div className="space-y-4">
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
      <div className="gap-6 space-y-4 md:flex">
        <ListingCarousel listing={listing} />
        <div className="w-full space-y-6">
          <CardTitle className="overflow-hidden text-wrap break-words">
            {listing.title}
          </CardTitle>
          {listing.tags?.length ? <Badge>{listing.tags[0]}</Badge> : null}

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
          <div className="space-y-4">
            <label htmlFor="bid">
              Amount
              <Input
                id="bid"
                min={0}
                placeholder="Ω"
                /*        onInput={(event) => {
                  // Forces integer value
                  const input = event.currentTarget
                  input.value = input.value.replace(/[^0-9]/g, "")
                }} */
              />
            </label>
            <Button className="w-full">Bid</Button>
            <Button variant="outline" className="w-full">
              Quick bid +1 Ω
            </Button>
          </div>
          <div>
            <p className="font-semibold mb-1">Description</p>
            <p className="text-pretty text-sm">{listing.description}</p>
          </div>
        </div>
      </div>
      {/* 3 */}
    </div>
  )
}
