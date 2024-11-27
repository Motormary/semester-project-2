import { Card } from "../ui/card"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Listing from "./listing"

export default async function SimilarListing() {
  return (
    <Card className="grid p-6">
      <h4 className="text-sm font-semibold">Similar listings</h4>
      <ScrollArea className="rounded-md pb-4">
        <div className="shrink-1 flex w-full max-w-[1400px] gap-4">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="flex shrink-0 basis-72">
              <Listing
                key={index}
                classname="shadow-none hover:bg-muted"
                id={index.toString()}
              />
            </div>
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </Card>
  )
}
