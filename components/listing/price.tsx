import getListing from "@/app/actions/listings/get"
import { getCurrentUser } from "@/app/actions/user/get"
import { cn, compareValues } from "@/lib/utils"

type props = {
  id: string
  className?: string
  myBid?: number
}

export default async function PriceTag({ id, className, myBid }: props) {
  if (myBid) {
    return <p className={cn(className ? className : "text-xl")}>{myBid} Ω</p>
  }
  const { data, success } = await getListing(id)
  const { data: userData } = await getCurrentUser()
  if (!success) return null
  if (!data.data.bids?.length) return null
  const sortedBids = data.data.bids.toSorted((a, b) =>
    compareValues(a.amount, b.amount),
  )
  const higestBid = sortedBids[0]
  const isHighestBidder = higestBid.bidder.name === userData.data.name
  const hasBidIndex = sortedBids.findIndex(
    (item) => item.bidder.name === userData.data.name,
  )
  const hasBidButLost = hasBidIndex > 0

  return (
    <div
      data-lost={hasBidButLost ? "" : undefined}
      data-lead={isHighestBidder ? "" : undefined}
      className={cn(
        className ? className : "text-xl",
        "flex w-full justify-between pricetag",
      )}
    >
      <p>{higestBid.amount} Ω</p>
      {isHighestBidder ? (
        <span className="text-sm">Highest bid</span>
      ) : hasBidButLost ? (
        <span className="text-sm">Lost bid</span>
      ) : null}
    </div>
  )
}
