import getUserBids from "@/app/actions/user/get-bids"

type props = {
  user: string
  className?: string
}

export default async function UserBidsCounter({ user, className }: props) {
  if (!user) return null

  const { data, success } = await getUserBids({user})

  if (!success) return null

  const bids = data.meta.totalCount

  return <span className={className}>{bids}</span>
}
