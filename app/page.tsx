import Listing from "@/components/listing/listing"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationLast,
  PaginationFirst,
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"
import { getAllListings } from "./actions/listings/get-all"
import { checkAndThrowError } from "@/lib/handle-errors"

export default async function Home() {
  const { data, success, error, source } = await getAllListings()

  if (!success) checkAndThrowError(error, source)

  return (
    <div className="w-full space-y-4">
      <Separator />
      <h1>All listings</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        {data?.data?.length ? data.data.map((listing) => {
          return (
            <Listing
              key={listing.id}
              classname="hover:shadow-md focus-within:outline outline-2 outline-primary border"
              id={listing.id}
            />
          )
        }) : <p className="m-auto">No listings found</p>}
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst size="sm" href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious size="sm" href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="sm" href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="sm" href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="sm" href="#">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext size="sm" href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast size="sm" href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  )
}
