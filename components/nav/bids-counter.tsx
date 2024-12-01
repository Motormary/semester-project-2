import { getUserBids } from "@/app/actions/user/get-bids"

type props = {
  name: string
  className?: string
}

export default async function UserBidsCounter({ name, className }: props) {
  if (!name) return null

  const { data, success } = await getUserBids(name)

  let bids

  if (success) bids = data.meta.totalCount

  return <span className={className}>{bids}</span>
}
