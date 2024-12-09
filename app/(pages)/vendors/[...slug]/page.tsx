import getUserListings from "@/app/actions/user/get-listings"
import { SearchParams } from "@/lib/definitions"
import { checkAndThrowError } from "@/lib/handle-errors"
import BidsTab from "./(bids)/bids"
import InactiveTab from "./(inactive)/inactive"
import WinsTab from "./(wins)/wins"
import Listing from "@/components/listing/listing"
import ListingPagination from "@/components/listing/pagination"
import getUserBids from "@/app/actions/user/get-bids"
import getUserWins from "@/app/actions/user/get-wins"
import ListingResults from "@/components/profile/listing-results"

export default async function ProfileListings({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: SearchParams
}) {
  const slug = (await params).slug
  const paramsQ = await searchParams

  if (slug.length === 2) {
    switch (slug[1].toLowerCase()) {
      case "inactive": {
        const res = await getUserListings({
          user: slug[0],
          params: {
            ...paramsQ,
            _active: "false",
            limit: "12",
            _seller: "true",
          },
        })
        return <InactiveTab resData={res} />
      }
      case "bids": {
        const res = await getUserBids({
          user: slug[0],
          params: { ...paramsQ, limit: "12", _listings: "true" },
        })
        return <BidsTab bidsData={res} />
      }
      case "wins": {
        const res = await getUserWins({
          params: { ...paramsQ, limit: "12" },
          user: slug[0],
        })
        return <WinsTab winData={res} />
      }
      default:
        throw new Error("Not Found")
    }
  } else if (slug.length === 1) {
    const { data, success, error, source } = await getUserListings({
      user: slug[0],
      params: { ...paramsQ, _active: "true", limit: "12", _seller: "true" },
    })
    if (!success) checkAndThrowError(error, source)

    return (
      <>
        <h1 className="listings sr-only">My Listings</h1>
        <ListingResults meta={data.meta} />
        {data.data?.length ? (
          data.data.map((listing) => {
            return (
              <Listing
                key={listing.id}
                data={listing}
                revalidate={true}
                classname="md:basis-1/2 xl:basis-1/3 shadow-none focus-within:bg-muted"
              />
            )
          })
        ) : (
          <div className="h-full w-full p-5 text-center">
            <p className="m-auto">No results.</p>
          </div>
        )}
        <ListingPagination meta={data.meta} />
      </>
    )
  }
  throw new Error("Not Found")
}
