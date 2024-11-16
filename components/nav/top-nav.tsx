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
import { Input } from "../ui/input"
import SearchBar from "./search-bar"
import { Box, BoxIcon, Menu } from "lucide-react"

export default async function TopNav() {
  return (
    <div className="mb-4 flex flex-col gap-4">
      <div className="flex h-[64px] w-screen justify-center bg-background shadow-sm">
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
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
              asChild
            >
              <Link href="/listing">
                <Box
                  className="text-gray-700"
                  strokeWidth={1.5}
                  style={{ width: "24px", height: "24px" }}
                />
              </Link>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full"
            >
              <Menu
                className="text-gray-700"
                strokeWidth={1.5}
                style={{ width: "24px", height: "24px" }}
              />
            </Button>
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
                  <Link href="/profile">My Profile</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
      <div className="max-w-content mx-auto w-full">
        <SearchBar />
      </div>
    </div>
  )
}
