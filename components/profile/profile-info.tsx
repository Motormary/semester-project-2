import { User } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Card } from "../ui/card"

type props = {
  name: string
}

export default async function ProfileInfo({ name }: props) {
  console.log(name)
  return (
    <Card className="sm:max-w-[274px] mx-auto space-y-6 overflow-hidden p-4 py-5 h-fit">
      <Avatar className="h-full w-full max-h-[274px] max-w-[274px] mx-auto">
        <AvatarImage
        className="aspect-square"
          src="https://github.com/shadcn.png"
          alt="Avatar"
        />
        <AvatarFallback className="p-5"><User strokeWidth={1} stroke={"#696969"} className="h-full w-full"/></AvatarFallback>
      </Avatar>
      <div className="text-center">
        <p className="break-words text-lg">
          Username
        </p>
        <Link
          href="mailto:username@stud.noroff.no"
          className="text-sm text-muted-foreground"
        >
          username@stud.noroff.com
        </Link>
      </div>
      <div className="text-center">
        <p className="text-sm font-semibold">About</p>
        <p className="text-pretty break-words text-sm">
          It looks like readable English. Many desktop publishing packages and
          web page editors now use Lorem Ipsum as their default model text, and
          a search for will uncover many web sites still in their infancy.
          Various versions have evolved over the years, sometimes by accident,
          sometimes on purpose (injected humour and the like).
        </p>
      </div>
      <Button className="w-full" variant="outline">
        Edit profile
      </Button>
      <div className="grid grid-cols-2 gap-4 [&>div]:space-y-2">
        <div className="col-span-2 text-center">
          <p className="text-sm font-semibold">Total credits</p>
          <p>1000 Ω</p>
        </div>
        <div className="col-span-1 text-center">
          <p className="text-sm font-semibold">Active listings</p>
          <p>49</p>
        </div>
        <div className="col-span-1 text-center">
          <p className="text-sm font-semibold">Inactive listings</p>
          <p>104</p>
        </div>
      </div>
    </Card>
  )
}
