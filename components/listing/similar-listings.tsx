import { Card } from "../ui/card"
import Listing from "./listing"

export default async function SimilarListing() {
  return (
    <Card className="grid p-6">
      <h4 className="text-sm font-semibold">Similar listings</h4>
      <div className="flex gap-4 w-full shrink-1 max-w-[1400px] overflow-x-auto py-4">
        {Array.from({ length: 10 }).map((_, index) => (
          <div key={index} className="basis-72 flex shrink-0">
            <Listing key={index} classname="shadow-none hover:bg-muted" id={index.toString()} />
          </div>
        ))}
      </div>
    </Card>
  )
}
