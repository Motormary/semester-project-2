import Listing from "@/components/listing/listing"
import ListingPagination from "@/components/listing/pagination"
import { Separator } from "@/components/ui/separator"
import { SearchParams } from "@/lib/definitions"
import { checkAndThrowError } from "@/lib/handle-errors"
import getAllListings from "./actions/listings/get-all"
import { cn } from "@/lib/utils"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "EBOX",
  description: "BOX up and sell your stuff on EBOX",
}

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
      <h1>
        {params?._tag ? params._tag : "All listings"}{" "}
        <span
          className={cn(
            params?.search
              ? "visible"
              : "aria-hidden:true pointer-events-none opacity-0",
            "text-xs font-normal",
          )}
        >
          Showing results for &apos;{params.search}&apos;
        </span>
      </h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        {data?.data?.length ? (
          data.data.map((listing, index) => {
            return (
              <Listing
                revalidate
                key={listing.id}
                data={listing}
                classname="hover:shadow-md dark:hover:bg-muted/20 focus-within:outline outline-2 outline-primary border"
                id={listing.id}
                priority={index < 4}
              />
            )
          })
        ) : (
          <p>No results</p>
        )}
      </div>
      <ListingPagination meta={data.meta} />
    </section>
  )
}
