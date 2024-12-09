import Listing from "@/components/listing/listing"
import ListingPagination from "@/components/listing/pagination"
import { Separator } from "@/components/ui/separator"
import { SearchParams } from "@/lib/definitions"
import { checkAndThrowError } from "@/lib/handle-errors"
import getAllListings from "./actions/listings/get-all"
import { cn } from "@/lib/utils"

type props = {
  searchParams: SearchParams
}

export default async function Home({ searchParams }: props) {
  const params = await searchParams
  const { data, success, error, source } = await getAllListings(params)

  if (!success) checkAndThrowError(error, source)

  return (
    <section className="w-full space-y-4">
      <Separator />
      <h1>{params?._tag ? params._tag : "All listings"} <span className={cn(params?.search ? "visible" : "opacity-0 aria-hidden:true pointer-events-none", "text-xs font-normal")}>Showing results for &apos;{params.search}&apos;</span></h1>
      <ul className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        {data?.data?.length ? (
          data.data.map((listing) => {
            return (
              <Listing
                revalidate
                key={listing.id}
                data={listing}
                classname="hover:shadow-md focus-within:outline outline-2 outline-primary border"
                id={listing.id}
              />
            )
          })
        ) : (
          <p>No results</p>
        )}
      </ul>
      <ListingPagination meta={data.meta} />
    </section>
  )
}
