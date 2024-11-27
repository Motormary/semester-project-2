import ProfileInfo from "@/components/profile/profile-info"
import wait from "@/lib/wait"

export default async function SelectedVendor({
  params,
}: {
  params: Promise<{ name: string }>
}) {
  const name = (await params).name
  await wait(1000)

  return (
      <ProfileInfo name={name} />
  )
}
