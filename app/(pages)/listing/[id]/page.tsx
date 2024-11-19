import InteractiveListing from "@/components/listing/interactive-listing"
import OtherListings from "@/components/listing/other-listings"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <Card className="p-4 pb-8 flex flex-col xl:flex-row gap-y-6">
      <InteractiveListing id={id} />
      <Separator className="xl:hidden" />
      <OtherListings id={id} />
    </Card>
  )
}
