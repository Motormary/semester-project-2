import Listing from "@/components/listing/listing"
import ListingPagination from "@/components/listing/pagination"
import { Separator } from "@/components/ui/separator"
import { SearchParams } from "@/lib/definitions"
import { checkAndThrowError } from "@/lib/handle-errors"
import { getAllListings } from "./actions/listings/get-all"

type props = {
  searchParams: SearchParams
}

export default async function Home({ searchParams }: props) {
  const params = await searchParams
  const { data, success, error, source } = await getAllListings(params)

  if (!success) checkAndThrowError(error, source)

  return (
    <div className="w-full space-y-4">
      <Separator />
      <h1>All listings</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        {data?.data?.length ? (
          data.data.map((listing) => {
            return (
              <Listing
                key={listing.id}
                data={listing}
                classname="hover:shadow-md focus-within:outline outline-2 outline-primary border"
                id={listing.id}
              />
            )
          })
        ) : (
          <p className="m-auto">No listings found</p>
        )}
      </div>
      <ListingPagination meta={data.meta}/>
    </div>
  )
}
