import wait from "@/lib/wait"
import BidsTab from "./(bids)/bids"
import InactiveTab from "./(inactive)/inactive"
import WinsTab from "./(wins)/wins"

export default async function ProfileListings({
  params,
}: {
  params: Promise<{ slug: string }>
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
    return (
      <>
        <h1 className="sr-only listings">My Listings</h1>
{/*         <Listing
          classname="md:basis-1/2 xl:basis-1/3 shadow-none focus-within:bg-muted"
          id="1"
        />
        <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
        <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
        <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" /> */}
      </>
    )
  }
  throw new Error("Not Found")
}
