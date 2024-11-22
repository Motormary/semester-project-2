import ProfileInfo from "@/components/profile/profile-info"

export default async function SelectedVendor({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const id = (await params).id
  console.log("🚀 ~ id:", id)
  return (
    <div className="w-full">
      <ProfileInfo id={id} />
    </div>
  )
}
