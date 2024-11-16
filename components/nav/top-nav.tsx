/* eslint-disable tailwindcss/classnames-order */
import logo from "assets/images/logo_filled.png"
import { Button } from "../ui/button"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"

export default async function TopNav() {
  return (
    <div className="flex h-[64px] w-screen justify-center shadow-md">
      <nav className="max-w-content flex w-full items-center justify-between bg-background px-4">
        <Link href="/">
          <picture>
            <img
              width={32}
              height={32}
              src={logo.src}
              alt="NavLogo"
              className="dark:invert"
            />
          </picture>
        </Link>
        <div className="flex items-center gap-5">
          <Button variant="outline" asChild>
            <Link href="/listing">New Listing</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/home">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/users">Users</Link>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger className="rounded-full focus-within:outline-none focus-visible:outline-secondary-foreground">
              <Avatar className="max-h-8 max-w-8">
                <AvatarImage
                  height={32}
                  width={32}
                  src="https://github.com/shadcn.png"
                  alt="Avatar"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" alignOffset={-15}>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </div>
  )
}
