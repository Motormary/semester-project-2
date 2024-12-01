import Listing from "@/components/listing/listing"
import wait from "@/lib/wait"

type props = {
  username: string
}

export default async function InactiveTab({username}: props) {
  await wait(1000)
  console.log(username)

  return (
    <>
      <h1 className="sr-only">My inactive listings</h1>
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
    </>
  )
}
