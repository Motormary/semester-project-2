import { Card } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationFirst,
  PaginationItem,
  PaginationLast,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import ProfileListingSearch from "@/components/ui/profile-listing-search-bar"

type props = {
  children: React.ReactNode
}

export default function ListingWrapper({ children }: props) {
  return (
    <Card className="h-full w-full space-y-4 p-4 xs:has-[.listings]:rounded-tl-none [&>.listings]:has-[[data-pending]]:animate-pulse">
      <ProfileListingSearch />
      <ul id="listings" className="flex flex-wrap">
        {children}
      </ul>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationFirst
              className="max-xs:p-2 max-lg:[&_span]:hidden"
              size="sm"
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationPrevious
              className="max-xs:p-2 max-lg:[&_span]:hidden"
              size="sm"
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="max-xs:p-2" size="sm" href="#">
              1
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="max-xs:p-2" size="sm" href="#" isActive>
              2
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink className="max-xs:p-2" size="sm" href="#">
              3
            </PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              className="max-xs:p-2 max-lg:[&_span]:hidden"
              size="sm"
              href="#"
            />
          </PaginationItem>
          <PaginationItem>
            <PaginationLast
              className="max-xs:p-2 max-lg:[&_span]:hidden"
              size="sm"
              href="#"
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </Card>
  )
}
