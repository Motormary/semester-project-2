import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { Box, Home, LogOut, Menu, User, Users } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Separator } from "../ui/separator"
import Link from "next/link"
import NewListing from "../listing/new-listing"
import { cn } from "@/lib/utils"

export default async function NavMenu() {
  const session = true
  return (
    <>
      {session ? (
        <NewListing>
          <Button className="relative max-md:size-10 max-md:rounded-full max-md:p-0">
            <span className="hidden md:block">New Listing</span>
            <Box
              className="text-background md:hidden"
              strokeWidth={1.5}
              style={{ width: "24px", height: "24px" }}
            />
          </Button>
        </NewListing>
      ) : null}
      <Button className="hidden md:block" variant="ghost" asChild>
        <Link href="/">Home</Link>
      </Button>
      {/*       <Button className="hidden md:block" variant="ghost" asChild>
        <Link href="/vendors">Vendors</Link>
      </Button>
      <Button className="hidden md:block" variant="ghost" asChild>
        Vendors
      </Button> */}
      <DropdownMenu>
        <DropdownMenuTrigger className="hidden rounded-full focus-within:outline-none focus-visible:outline-secondary-foreground md:block">
          <Avatar className="max-h-8 max-w-8">
            <AvatarImage
              height={32}
              width={32}
              src="https://github.com/shadcn.png"
              alt="Avatar"
            />
            <AvatarFallback>
              <User />
            </AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" alignOffset={-15}>
          <DropdownMenuItem asChild>
            <Link href="/vendors/currentUser">My Page</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>Log out</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <Sheet>
        <SheetTrigger asChild>
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
        </SheetTrigger>
        <SheetContent className="top-[65px] max-h-[calc(100%-64px)] w-full pt-0">
          <SheetHeader className="sr-only">
            <SheetTitle>Mobile Menu</SheetTitle>
          </SheetHeader>
          <div className="my-2 flex flex-col gap-2">
            {session ? (
              <div className="flex items-center gap-4 py-2 text-left sm:self-center">
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
                <Link href="/vendors/user" className="whitespace-nowrap">
                  <p className="text-sm font-semibold">Username</p>
                  <p className="truncate text-sm">myusername@stud.noroff.no</p>
                  <p className="text-sm text-muted-foreground">
                    Total credits: 1000 Ω
                  </p>
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-6 py-4">
                <Link
                  href="/register"
                  className={cn(buttonVariants({ variant: "default" }))}
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className={cn(buttonVariants({ variant: "outline" }))}
                >
                  Sign in
                </Link>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex flex-col items-center gap-6 py-4 [&>a]:flex [&>a]:w-full [&>a]:justify-between">
            <SheetTrigger asChild>
              <Link className="py-2" href={"/"}>
                <p>Home</p>
                <Home
                  strokeWidth={1.5}
                  className="size-5"
                />
              </Link>
            </SheetTrigger>
            {session ? (
              <>
                <SheetTrigger asChild>
                  <Link className="py-2" href={"/vendors/user#listings"}>
                    <p>My listings</p>
                    <span className="p-0.5 text-sm">
                      48
                    </span>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link className="py-2" href={"/vendors/user/bids"}>
                    <p>My bids</p>
                    <span className="p-0.5 text-sm">
                      10
                    </span>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link className="py-2" href={"/vendors/user/bids"}>
                    <p>Vendors</p>
                    <Users
                      strokeWidth={1.5}
                      className="size-5"
                    />
                  </Link>
                </SheetTrigger>
                <Separator />
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="w-full justify-between px-0 py-2"
                  >
                    <p className="text-base">Log out</p>
                    <span>
                      <LogOut className="size-5" />
                    </span>
                  </Button>
                </SheetTrigger>
              </>
            ) : null}
          </div>
          <SheetFooter className="absolute bottom-5 left-1/2 w-full max-w-96 -translate-x-1/2 px-5">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
