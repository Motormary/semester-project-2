import { Home, User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SheetClose, SheetFooter, SheetTrigger } from "../ui/sheet"
import Link from "next/link"

type props = {
  params?: string
}

export default function SidebarContent({ params }: props) {
  return (
    <>
      <div className="my-2 flex flex-col gap-2">
        <div className="flex items-center gap-4 text-left sm:self-center">
          <Avatar className="max-h-10 max-w-10">
            <AvatarImage
              height={40}
              width={40}
              src="https://github.com/shadcn.png"
              alt="Avatar"
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
          <Link
            href="/vendors/user"
            className="overflow-hidden whitespace-nowrap"
          >
            <p className="text-sm font-semibold">Username</p>
            <p className="truncate text-sm">myusername@stud.noroff.no</p>
            <p className="text-sm text-muted-foreground">
              Total credits: 1000 Ω
            </p>
          </Link>
        </div>
        <Separator />
      </div>
      <div className="flex flex-col items-center gap-6 py-4 [&>a]:flex [&>a]:w-full [&>a]:justify-between">
        <SheetTrigger asChild>
          <Link className="py-2" href={"/"}>
            <p>Home</p>
            <Home strokeWidth={1.5} className="size-5" />
          </Link>
        </SheetTrigger>
        <SheetTrigger asChild>
          <Link className="py-2" href={"/vendors/user#listings"}>
            <p>My listings</p>
            <span className="p-0.5 text-sm text-muted-foreground">48</span>
          </Link>
        </SheetTrigger>
        <SheetTrigger asChild>
          <Link className="py-2" href={"/vendors/user/bids"}>
            <p>My bids</p>
            <span className="p-0.5 text-sm text-muted-foreground">10</span>
          </Link>
        </SheetTrigger>
      </div>
      <SheetFooter className="absolute bottom-5 w-full left-0 px-5">
        <SheetClose asChild>
          <Button variant="outline">Close</Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
