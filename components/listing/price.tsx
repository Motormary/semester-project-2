import getListing from "@/app/actions/listings/get"
import { cn, compareValues } from "@/lib/utils"

type props = {
  id: string
  className?: string
  myBid?: number
}

export default async function PriceTag({ id, className, myBid }: props) {
  if (myBid) {
    return (
      <p className={cn(className ? className : "text-xl")}>
        {myBid} Ω
      </p>
    )
  }
  const { data, success } = await getListing(id)
  if (!success) return null
  if (!data.data.bids?.length) return null
  const sortedBids = data.data.bids.toSorted((a, b) =>
    compareValues(a.amount, b.amount),
  )
  return (
    <p className={cn(className ? className : "text-xl")}>
      {sortedBids[0].amount} Ω
    </p>
  )
}
