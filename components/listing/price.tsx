import { getListing } from "@/app/actions/listings/get"

type props = {
  id: string
}

export default async function PriceTag({ id }: props) {
  const { data, success } = await getListing(id)
  if (!success) return null
  if (!data.data.bids?.length) return null
  return <p className="text-2xl">{data.data.bids[data.data.bids.length - 1]?.amount} Ω</p>
}
