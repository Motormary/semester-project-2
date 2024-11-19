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
import SearchBar from "./search-bar"
import { Box, Menu } from "lucide-react"

export default async function TopNav() {
  return (
    <div className="mb-4 flex flex-col w-full gap-4">
      <div className="flex h-[64px] justify-center bg-background shadow-sm dark:border-b">
        <nav className="flex w-full max-w-content items-center justify-between bg-background px-4">
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
            {/* Mobile */}
            <Button
              size="icon"
              variant="outline"
              className="rounded-full md:hidden"
              asChild
            >
              <Link href="/listing">
                <Box
                  className="text-primary"
                  strokeWidth={1.5}
                  style={{ width: "24px", height: "24px" }}
                />
              </Link>
            </Button>
            <Button
              size="icon"
              variant="outline"
              className="rounded-full md:hidden"
            >
              <Menu
                className="text-secondary-foreground"
                strokeWidth={1.5}
                style={{ width: "24px", height: "24px" }}
              />
            </Button>
            {/* Desktop */}
            <Button className="hidden md:block" asChild>
              <Link href="/listing">New Listing</Link>
            </Button>
            <Button className="hidden md:block" variant="ghost" asChild>
              <Link href="/">Home</Link>
            </Button>
            <Button className="hidden md:block" variant="ghost" asChild>
              <Link href="/vendors">Vendors</Link>
            </Button>
            <Button className="hidden md:block" variant="ghost" asChild>
              Vendors
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger className="hidden rounded-full focus-within:outline-none focus-visible:outline-secondary-foreground md:block">
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
                  <Link href="/vendors/currentUser">My Page</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Log out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </nav>
      </div>
      <div className="mx-auto w-full max-w-content">
        <SearchBar />
      </div>
    </div>
  )
}
