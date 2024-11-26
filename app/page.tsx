import Listing from "@/components/listing/listing"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink, PaginationNext,
  PaginationLast,
  PaginationFirst
} from "@/components/ui/pagination"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <div className="w-full space-y-4">
      <Separator />
      <h1>All listings</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        <Listing classname="hover:shadow-md focus-within:outline outline-2 outline-primary border" id={"1"} />
        <Listing classname="hover:shadow-md focus-within:outline outline-2 outline-primary border" id={"2"} />
        <Listing classname="hover:shadow-md focus-within:outline outline-2 outline-primary border" id={"3"} />
        <Listing classname="hover:shadow-md focus-within:outline outline-2 outline-primary border" id={"4"} />
        <Listing classname="hover:shadow-md focus-within:outline outline-2 outline-primary border" id={"5"} />
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
            <PaginationLink size="sm" href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="sm" href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink size="sm" href="#">3</PaginationLink>
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
