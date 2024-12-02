'use client'

import {
    Pagination
} from "@/components/ui/pagination"
import { TYPE_META } from "@/lib/definitions"
import { useMemo } from 'react'

type Props = {
  meta: TYPE_META
}

export default function ListingPagination({ meta }: Props) {
  const pageNumbers = useMemo(() => {
    const totalPages = meta.pageCount
    const currentPage = meta.currentPage
    const displayPages = 5

    let startPage = Math.max(1, currentPage - Math.floor(displayPages / 2))
    const endPage = Math.min(totalPages, startPage + displayPages - 1)

    if (endPage - startPage + 1 < displayPages) {
      startPage = Math.max(1, endPage - displayPages + 1)
    }

    return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
  }, [meta.currentPage, meta.pageCount])

  const getPageHref = (page: number) => {
    // Replace this with your actual URL generation logic
    return `?page=${page}`
  }

  return (
    <Pagination>
{/*       <PaginationContent>
        <PaginationItem>
          <PaginationFirst
            size="sm"
            href={getPageHref(1)}
            disabled={meta.isFirstPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            size="sm"
            href={meta.previousPage ? getPageHref(meta.previousPage) : undefined}
            disabled={!meta.previousPage}
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
            href={meta.nextPage ? getPageHref(meta.nextPage) : undefined}
            disabled={!meta.nextPage}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLast
            size="sm"
            href={getPageHref(meta.pageCount)}
            disabled={meta.isLastPage}
          />
        </PaginationItem>
      </PaginationContent> */}
    </Pagination>
  )
}

