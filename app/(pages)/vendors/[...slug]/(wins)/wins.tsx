import {
  TYPE_GET_USER_BIDS
} from "@/lib/definitions"

type props = {
  winData: TYPE_GET_USER_BIDS | any
}

export default async function WinsTab({
  winData: { data, success, error, source },
}: props) {
  return (
    <>
      <h1 className="sr-only">My wins</h1>
      {/*   <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" />
      <Listing classname="md:basis-1/2 xl:basis-1/3 shadow-none" id="1" /> */}
    </>
  )
}
