import InteractiveListing from "@/components/listing/interactive-listing"
import OtherListings from "@/components/listing/other-listings"
import SimilarListing from "@/components/listing/similar-listings"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <div className="space-y-4">
      <Card className="flex flex-col gap-y-6 p-[5%] md:p-6 pb-8 xl:flex-row">
        <InteractiveListing id={id} />
        <Separator className="xl:hidden" />
        <OtherListings id="1" />
      </Card>
      <SimilarListing />
    </div>
  )
}
