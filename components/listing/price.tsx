import getListing from "@/app/actions/listings/get"
import { getCurrentUser } from "@/app/actions/user/get"
import { cn } from "@/lib/utils"
import { CircleCheck, CircleX } from "lucide-react"

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
  const sortedBids = data.data?.bids?.sort((a, b) => {
    return a.amount - b.amount
  })
  const higestBid = sortedBids?.[0] ?? []
  const isHighestBidder =
    higestBid?.bidder?.name === userData.data.name ? true : false
  const hasBidIndex =
    sortedBids?.findIndex((item) => item.bidder.name === userData.data.name) ??
    0
  const hasBidButLost = hasBidIndex > 0 ? true : false

  return (
    <div
      className={cn(
        className ? className : "text-xl",
        "pricetag flex w-full justify-between",
      )}
    >
      <p>{higestBid?.amount} Ω</p>
      {isHighestBidder ? (
        <span className="text-sm">
          Highest bid <CircleCheck className="inline size-5 text-primary" />
        </span>
      ) : hasBidButLost ? (
        <span className="text-sm">
          Lost bid <CircleX className="inline size-5 text-destructive" />
        </span>
      ) : null}
    </div>
  )
}
