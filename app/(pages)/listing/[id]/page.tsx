import getListing from "@/app/actions/listings/get"
import InteractiveListing from "@/components/listing/interactive-listing"
import OtherListings from "@/components/listing/other-listings"
import SimilarListing from "@/components/listing/similar-listings"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { checkAndThrowError } from "@/lib/handle-errors"

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  const { data, success, error, source } = await getListing(id)

  if (!success) checkAndThrowError(error, source)

  return (
    <section className="space-y-4 w-full overflow-hidden h-fit">
      <Separator />
      <h1>Listing</h1>
      <Card className="flex flex-col gap-y-6 p-[5%] pb-8 md:p-6 xl:flex-row xl:gap-6">
        <InteractiveListing listing={data.data} />
        <Separator className="xl:hidden" />
        <OtherListings currentListingId={data.data.id} user={data.data.seller.name} />
      </Card>
      <SimilarListing currentListingId={data.data.id} tags={data.data.tags} />
    </section>
  )
}
