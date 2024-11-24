import Listing from "@/components/listing/listing"

export default async function ProfileListings({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const name = (await params).name
  console.log("listings ~~~~~~~~~~", name)
  return (
    <>
      <div className="listings flex flex-wrap">
        <Listing classname="basis-1/2 shadow-none" id="1" />
        <Listing classname="basis-1/2 shadow-none" id="1" />
        <Listing classname="basis-1/2 shadow-none" id="1" />
        <Listing classname="basis-1/2 shadow-none" id="1" />
      </div>
    </>
  )
}
