import InteractiveListing from "@/components/listing/interactive-listing"
import PageWrapper from "@/components/page-wrapper"

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <PageWrapper title={`Listing ${id}`}>
      <InteractiveListing />
    </PageWrapper>
  )
}
