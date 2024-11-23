import Listing from "@/components/listing/listing"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <div className="space-y-4 w-full">
      <Separator />
      <h1 className="text-2xl font-semibold">All listings</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        <Listing classname="hover:shadow-md" id={"1"} />
        <Listing classname="hover:shadow-md" id={"2"} />
        <Listing classname="hover:shadow-md" id={"3"} />
        <Listing classname="hover:shadow-md" id={"4"} />
        <Listing classname="hover:shadow-md" id={"5"} />
      </div>
    </div>
  )
}
