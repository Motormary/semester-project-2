import Listing from "@/components/listing/listing"

export default async function BidsTab() {
  return (
    <>
      <h1 className="sr-only">My bids</h1>
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
    </>
  )
}
