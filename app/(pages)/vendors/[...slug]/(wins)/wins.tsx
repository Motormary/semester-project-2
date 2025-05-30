import Listing from "@/components/listing/listing"
import ListingPagination from "@/components/listing/pagination"
import ListingResults from "@/components/profile/listing-results"
import { TYPE_GET_LISTINGS } from "@/lib/definitions"
import { checkAndThrowError } from "@/lib/handle-errors"

type props = {
  winData: TYPE_GET_LISTINGS
}

export default async function WinsTab({
  winData: { data, success, error, source },
}: props) {
  if (!success) checkAndThrowError(error, source)

  return (
    <>
      <h1 className="sr-only">My wins</h1>
      <ListingResults meta={data.meta}/>
      {data.data?.length
        ? data.data.map((listing) => {
            return (
              <Listing
                key={listing.id}
                data={listing}
                revalidate={false}
                classname="md:basis-1/2 xl:basis-1/3 shadow-none focus-within:bg-muted outline-none"
              />
            )
          })
        : null}
      <ListingPagination meta={data.meta} />
    </>
  )
}
