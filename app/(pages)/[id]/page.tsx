import InteractiveListing from "@/components/listing/interactive-listing"

export default async function ListingPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  return (
    <div>
      <InteractiveListing id={id} />
    </div>
  )
}
