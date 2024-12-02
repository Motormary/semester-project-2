import wait from "@/lib/wait"

type props = {
  username: string
}

export default async function WinsTab({username}: props) {
  await wait(1000)
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
