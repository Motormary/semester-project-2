import { User } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Separator } from "../ui/separator"
import { SheetClose, SheetFooter } from "../ui/sheet"

type props = {
  params?: string
}

export default function SidebarContent({ params }: props) {

  return (
    <>
      <div className="flex flex-col gap-2 my-2">
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
          <div className="overflow-hidden whitespace-nowrap">
            <p className="text-sm font-semibold">Username</p>
            <p className="truncate text-sm">myusername@stud.noroff.no</p>
            <p className="text-sm text-muted-foreground">
              Total credits: 1000 Ω
            </p>
          </div>
        </div>
        <Separator />
      </div>
      <div>content</div>
      <SheetFooter>
        <SheetClose asChild>
          <Button>Save changes</Button>
        </SheetClose>
      </SheetFooter>
    </>
  )
}
