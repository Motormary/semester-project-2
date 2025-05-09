/* eslint-disable prefer-const */
import getAllListings from "@/app/actions/listings/get-all"
import { Card } from "../ui/card"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Listing from "./listing"

type props = {
  tags: string[]
  currentListingId: string
}

export default async function SimilarListing({
  tags,
  currentListingId,
}: props) {
  const tagParam = tags?.[0]
    ? new URLSearchParams(`_tag=${tags[0]}`)
    : undefined
  let { data, success } = await getAllListings(tagParam)

  if (!success || data.data.length <= 1) {
    ;({ data, success } = await getAllListings()) // If no similar listings - get most recent
  }
  if (!success) return null

  return (
    <Card className="grid p-[5%] md:p-6">
      <h3 className="text-sm font-semibold">You might also like</h3>
      <ScrollArea className="rounded-md pb-4">
        <ul className="shrink-1 flex w-full max-w-[1400px] gap-4 py-1">
          {data.data.map((listing, index) => {
            if (listing.id === currentListingId) return
            return (
              <li key={listing.id} className="flex shrink-0 basis-72 px-1">
                <Listing
                  revalidate
                  data={listing}
                  classname="shadow-none hover:bg-muted focus-within:bg-muted"
                  id={index.toString()}
                />
              </li>
            )
          })}
        </ul>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  )
}
