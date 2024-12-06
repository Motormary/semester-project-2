import { getUser } from "@/app/actions/user/get"
import ProfileInfo from "@/components/profile/profile-info"
import { checkAndThrowError } from "@/lib/handle-errors"

type props = {
  params: Promise<{ slug: string }>
}

export default async function Page({ params }: props) {
  const slug = (await params).slug
  if (!slug?.[0]) return null
  const { data, success, error, source } = await getUser(slug[0])
  if (!success) checkAndThrowError(error, source)
  return <ProfileInfo user={data.data} />
}
