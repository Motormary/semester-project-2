import getListing from "@/app/actions/listings/get"
import { compareValues } from "@/lib/utils"

type props = {
  id: string
}

export default async function PriceTag({ id }: props) {
  const { data, success } = await getListing(id)
  if (!success) return null
  if (!data.data.bids?.length) return null
  const sortedBids = data.data.bids.toSorted((a, b) => compareValues(a.amount, b.amount))
  return (
    <p className="text-xl">
      {sortedBids[0].amount} Ω
    </p>
  )
}
