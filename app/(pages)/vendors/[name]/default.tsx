
import ProfileInfo from "@/components/profile/profile-info"

export default async function SelectedVendor({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const name = (await params).name
  console.log("🚀 ~ name:", name)
  return (
      <ProfileInfo name={name} />
  )
}
