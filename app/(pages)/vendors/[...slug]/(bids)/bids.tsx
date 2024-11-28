import Listing from "@/components/listing/listing"
import wait from "@/lib/wait"

type bids = {
  username: string
}

export default async function BidsTab({ username }: bids) {
  console.log(username)
  await wait(1000)

  return (
    <>
      <h1 className="sr-only">My bids</h1>
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
    </>
  )
}
