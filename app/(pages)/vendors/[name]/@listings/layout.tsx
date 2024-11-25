import { Card } from "@/components/ui/card"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationFirst,
  PaginationPrevious,
  PaginationLink,
  PaginationNext,
  PaginationLast,
} from "@/components/ui/pagination"
import ProfileListingSearch from "@/components/ui/search-bar"
import { Suspense } from "react"
import { LoadingList } from "../_loading"

type props = {
  children: React.ReactNode
}

export default async function Page({ children }: props) {
  return (
    <Card className="h-full w-full space-y-4 p-4 xs:has-[.listings]:rounded-tl-none [&>.listings]:has-[[data-pending]]:animate-pulse">
      <ProfileListingSearch />
      <div className="listings flex flex-wrap">
        <Suspense fallback={<LoadingList />}>{children}</Suspense>
      </div>
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
