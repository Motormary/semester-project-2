import MobileListing from "@/components/listing/mobile-listing"
import { Separator } from "@/components/ui/separator"

export default function Home() {
  return (
    <div className="space-y-4 w-full">
      <Separator />
      <h1 className="text-2xl font-semibold">All listings</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        <MobileListing />
        <MobileListing />
        <MobileListing />
        <MobileListing />
        <MobileListing />
      </div>
    </div>
  )
}
