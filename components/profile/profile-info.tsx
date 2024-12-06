import { TYPE_USER } from "@/lib/definitions"
import { User } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

type props = {
  user?: TYPE_USER
}

export default function ProfileInfo({ user }: props) {
  if (!user) return null

  return (
    <Card className="mx-auto w-full h-fit space-y-6 overflow-hidden p-4 py-5 sm:mt-[2rem] sm:max-w-[274px]">
      <Avatar className="mx-auto h-full max-h-[258px] w-full max-w-[258px]">
        <AvatarImage
          className="aspect-square"
          src="https://github.com/shadcn.png"
          alt="Avatar"
        />
        <AvatarFallback className="p-5">
          <User strokeWidth={1} stroke={"#696969"} className="h-full w-full" />
        </AvatarFallback>
      </Avatar>
      <div className="text-center">
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
      <Button className="w-full" variant="outline">
        Edit profile
      </Button>
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
