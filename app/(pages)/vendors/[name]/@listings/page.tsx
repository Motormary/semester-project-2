export default async function ProfileListings({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const name = (await params).name
  console.log("listings ~~~~~~~~~~", name)
  return <div>Listings</div>
}
