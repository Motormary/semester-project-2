"use client"

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
import { useMediaQuery } from "@/hooks/use-media-query"
import { TYPE_META } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"
import { useMemo } from "react"

type Props = {
  meta: TYPE_META
}

export default function ListingPagination({ meta }: Props) {
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const params = useSearchParams()
  const pageNumbers = useMemo(() => {
    const displayPages = isDesktop ? 5 : 3
    const totalPages = meta.pageCount
    const currentPage = meta.currentPage
    
    // Mr.jippity calculations will try to keep current page in center of row
    let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2))
    const endPage = Math.min(totalPages, startPage + displayPages - 1)

    if (endPage - startPage + 1 < displayPages) {
      startPage = Math.max(1, endPage - displayPages + 1)
    }

    return Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i,
    )
  }, [meta.currentPage, meta.pageCount, isDesktop])

  const getPageHref = (page: number) => {
    const url = new URLSearchParams(params)
    url.set("page", page.toString())
    return `?${url.toString()}`
  }

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            size="sm"
            href={getPageHref(1)}
            className={cn(meta.isFirstPage && "hidden")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            href={meta.previousPage ? getPageHref(meta.previousPage) : ""}
            className={cn(!meta.previousPage && "hidden")}
          />
        </PaginationItem>
        {pageNumbers.map((pageNumber) => (
          <PaginationItem key={pageNumber}>
            <PaginationLink
              size="sm"
              href={getPageHref(pageNumber)}
              isActive={pageNumber === meta.currentPage}
            >
              {pageNumber}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            size="sm"
            href={meta.nextPage ? getPageHref(meta.nextPage) : ""}
            className={cn(!meta.nextPage && "hidden")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            size="sm"
            href={getPageHref(meta.pageCount)}
            className={cn(meta.isLastPage && "hidden")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}
