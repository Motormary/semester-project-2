import Listing from "@/components/listing/listing"
import ListingPagination from "@/components/listing/pagination"
import { TYPE_GET_LISTINGS } from "@/lib/definitions"
import { checkAndThrowError } from "@/lib/handle-errors"

type props = {
  resData: TYPE_GET_LISTINGS
}

export default async function InactiveTab({
  resData: { source, data, success, error },
}: props) {
  if (!success) checkAndThrowError(error, source)

  return (
    <>
      <h1 className="sr-only">My inactive listings</h1>
      {data.data.map((listing, index) => (
        <Listing
          key={listing.id+index}
          data={listing}
          revalidate={false}
          classname="md:basis-1/2 xl:basis-1/3 shadow-none focus-within:bg-muted"
        />
      ))}
      <ListingPagination meta={data.meta} />
    </>
  )
}
