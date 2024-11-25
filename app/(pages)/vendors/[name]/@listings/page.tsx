import Listing from "@/components/listing/listing"
import wait from "@/lib/wait"

export default async function ProfileListings({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  await wait(2000)
  const name = (await params).name
  return (
    <>
      <h1 className="sr-only">My Listings</h1>
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none focus-within:bg-muted" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
    </>
  )
}