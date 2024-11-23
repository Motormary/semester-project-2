import Listing from "@/components/listing/listing"

export default async function ProfileListings({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const name = (await params).name
  console.log("listings ~~~~~~~~~~", name)
  return (
    <div className="flex flex-wrap listings">
      <Listing classname="basis-1/2" id="1" />
      <Listing classname="basis-1/2" id="1" />
      <Listing classname="basis-1/2" id="1" />
      <Listing classname="basis-1/2" id="1" />
    </div>
  )
}
