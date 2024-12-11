import { getCurrentUser, getUser } from "@/app/actions/user/get"
import { checkAndThrowError } from "@/lib/handle-errors"
import Link from "next/link"
import { Card } from "../ui/card"
import ProfileImage from "./profile-image"
import EditProfileDialog from "./edit-profile"

type props = {
  params: { slug: string[] }
}
export default async function ProfileInfo({ params }: props) {
  const slug = params.slug

  const { data, success, error, source } = await getUser(slug[0])
  const { data: currentUser, success: authSuccess} = await getCurrentUser()

  if (!success || !authSuccess) checkAndThrowError(error, source)
  const user = data.data
  
  return (
    <Card className="h-fit shrink-0 w-full space-y-6 overflow-hidden p-4 py-5 sm:mt-[2rem] sm:max-w-[274px]">
      <ProfileImage url={user.avatar.url} />
      <div className="text-center truncate">
        <p className="break-words text-lg">{user.name}</p>
        <Link
          href="mailto:username@stud.noroff.no"
          className="text-sm text-muted-foreground"
        >
          {user.email}
        </Link>
      </div>
      {user.bio ? (
        <div className="text-center">
          <p className="text-sm font-semibold">About</p>
          <p className="text-pretty break-words text-sm">{user.bio}</p>
        </div>
      ) : null}
      {user.name === currentUser.data.name ? (
        <EditProfileDialog user={user} />
      ): null}
      <div className="grid grid-cols-2 gap-4 [&>div]:space-y-2">
        <div className="col-span-2 text-center">
          <p className="text-sm font-semibold">Total credits</p>
          <p>{user.credits} Ω</p>
        </div>
        <div className="col-span-1 text-center">
          <p className="text-sm font-semibold">Listings</p>
          <p>{user._count.listings}</p>
        </div>
        <div className="col-span-1 text-center">
          <p className="text-sm font-semibold">Wins</p>
          <p>{user._count.wins}</p>
        </div>
      </div>
    </Card>
  )
}
