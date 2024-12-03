import ListingLoading from "@/components/listing/listing-skeleton"

export default function Loading() {
  return (
    <div className="w-full space-y-4">
      <div className="w-full border-b"></div>
      <h1>All listings</h1>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(290px,1fr))] gap-4">
        {Array.from({ length: 12 }).map((_, i) => (
          <ListingLoading key={i} />
        ))}
      </div>
    </div>
  )
}
