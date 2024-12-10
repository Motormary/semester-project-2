import getListing from "@/app/actions/listings/get"
import { Countdown } from "./countdown"
import { Dot } from "lucide-react"
import { calculateTimeDifference } from "@/lib/utils"

type props = {
  id: string
  user: string
  revalidate: boolean // Required so we don't forget to set it
}

/**
 * @description - Returns a dynamic clock based on time left of auction
 * - if revalidate is not set and auction is done, return static html. e.g @ /listing/[id] - /wins - /inactive
 * - else it will return the clock which will revalidate the listing
 */
export default async function ListingClock({ id, revalidate, user }: props) {
  const { data, success } = await getListing(id)

  if (!success) return null

  const currentTime = new Date()
  const endOfTimes = new Date(data.data.endsAt)
  
  if (currentTime > endOfTimes && !revalidate) {
    return (
      <>
        <Dot className="text-destructive" strokeWidth="3" />
        <span className="text-sm">Ended</span>
      </>
    )
  }

  const topBidder = data.data.bids.toSorted((a, b) => { return a.amount - b.amount})?.[0]?.bidder.name

  // Calculate default time value on server instead of client to make rendering of clock smooth.
  const defaultTime = calculateTimeDifference(data.data.endsAt.toString())
  return <Countdown defaultTime={defaultTime} endsAt={data.data.endsAt} user={data.data.seller.name} topBidder={topBidder} id={id} />
}
