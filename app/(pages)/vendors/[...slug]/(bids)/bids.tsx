import getListing from "@/app/actions/listings/get"
import Listing from "@/components/listing/listing"
import ListingPagination from "@/components/listing/pagination"
import { TYPE_GET_USER_BIDS } from "@/lib/definitions"

type props = {
  bidsData: TYPE_GET_USER_BIDS
}

export default async function BidsTab({
  bidsData: { data, success, error, source },
}: props) {
  if (!success) return null
  return (
    <>
      <h1 className="sr-only">My bids</h1>
      {data.data.map(async (bid) => {
        const { data: listing, success } = await getListing(bid.listing.id)
        if (!success) {
          return null
        }
        return (
          <Listing
            useMyBid={bid.amount}
            key={bid.id}
            data={listing.data}
            revalidate={false}
            classname="md:basis-1/2 xl:basis-1/3 shadow-none focus-within:bg-muted"
          />
        )
      })}
      <ListingPagination meta={data.meta} />
    </>
  )
}
