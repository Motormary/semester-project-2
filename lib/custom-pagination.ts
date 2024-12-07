"use server"
import { TYPE_GET_LISTINGS, TYPE_LISTING } from "./definitions"

/**
 *
 * @param res
 * @param searchQuery
 * @param page
 * @param tag
 * @returns - Paginated results based on search- / tag-query
 */
export default async function createPaginatedSearchResults(
  res: TYPE_GET_LISTINGS,
  searchQuery: string,
  page: number,
  tag: string,
  active?: boolean,
) {
  const filteredData = res.data.data.filter((item) => {
    const activeFlag = active
      ? new Date(item.endsAt) > new Date()
      : new Date(item.endsAt) < new Date()
    const matchesQuery =
      !searchQuery ||
      item.title.toLowerCase().includes(searchQuery) ||
      (item.description.toLowerCase().includes(searchQuery) &&
        tag &&
        item.tags.some((value) => value.toLowerCase() === tag.toLowerCase()))

    if (matchesQuery && activeFlag) return item
  })
  const maxIndex = page ? page * 12 : 12
  const minIndex = maxIndex - 12
  const newData = filteredData.reduce<TYPE_LISTING[]>((acc, item, index) => {
    const isWithinRange = index < maxIndex && index >= minIndex
    if (isWithinRange) acc.push(item)
    return acc
  }, [])
  const pageCount = Math.ceil(filteredData.length / 12)
  const newMeta = {
    isFirstPage: page <= 1,
    isLastPage: page >= pageCount,
    currentPage: page,
    previousPage: page > 1 ? page - 1 : null,
    nextPage: page < pageCount ? page + 1 : null,
    pageCount: pageCount,
    totalCount: filteredData.length,
  }

  res.data.data = newData
  res.data.meta = newMeta
  return res
}
