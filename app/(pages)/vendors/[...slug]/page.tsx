import getUserListings from "@/app/actions/user/get-listings"
import { SearchParams } from "@/lib/definitions"
import { checkAndThrowError } from "@/lib/handle-errors"
import wait from "@/lib/wait"
import BidsTab from "./(bids)/bids"
import InactiveTab from "./(inactive)/inactive"
import WinsTab from "./(wins)/wins"

export default async function ProfileListings({
  params,
  searchParams
}: {
  params: Promise<{ slug: string }>
  searchParams: SearchParams
}) {
  const slug = (await params).slug
  await wait(1000)

  if (slug.length === 2) {
    switch (slug[1].toLowerCase()) {
      case "inactive":
        return <InactiveTab username={slug[0]} />
      case "bids":
        return <BidsTab username={slug[0]} />
      case "wins":
        return <WinsTab username={slug[0]} />
      default:
        throw new Error("Not Found")
    }
  } else if (slug.length === 1) {
    const { data, success, error, source } = await getUserListings({
      user: slug[0],
    })
    if (!success) checkAndThrowError(error, source)
    return (
      <>
        <h1 className="listings sr-only">My Listings</h1>
     {/*    <Listing
          revalidate
          classname="md:basis-1/2 xl:basis-1/3 shadow-none focus-within:bg-muted"
        /> */}
      </>
    )
  }
  throw new Error("Not Found")
}
