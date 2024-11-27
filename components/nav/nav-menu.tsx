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
import { cn } from "@/lib/utils"
import { Box, Home, LogOut, Menu, User, Users } from "lucide-react"
import Link from "next/link"
import NewListing from "../listing/new-listing"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"

export default async function NavMenu() {
  const session = false
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
      <Link
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "mt-[2px] hidden md:block",
        )}
        href="/"
      >
        Home
      </Link>
      {/*       <Button className="hidden md:block" variant="ghost" asChild>
        <Link href="/vendors">Vendors</Link>
      </Button>
      <Button className="hidden md:block" variant="ghost" asChild>
        Vendors
      </Button> */}
      {/* Desktop menu */}
      {session ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="hidden md:flex">
              <Button
                variant="ghost"
                className="group px-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <span className="max-w-36 truncate">Username</span>
                <Avatar className="max-h-8 max-w-8 outline-primary ring-primary ring-offset-2 group-focus:ring">
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
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={12}
            className="w-56 max-md:hidden"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel>Account</DropdownMenuLabel>
              <DropdownMenuItem disabled>
                <p className="text-sm">Total credits: 1000 Ω</p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link className="flex justify-between" href="/vendors/user">
                  My page <User />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="flex justify-between"
                  href="/vendors/user/bids"
                >
                  Bids <span className="p-0.5 text-xs">48</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="flex justify-between"
                  href="/vendors/user/wins"
                >
                  Wins <span className="p-0.5 text-xs">10</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        <>
          <Link
            className={cn(buttonVariants({ variant: "outline" }), "hidden md:block")}
            href="/login"
          >
            Login
          </Link>
          <Link
            className={cn(buttonVariants({ variant: "default" }), "hidden md:block")}
            href="/register"
          >
            Sign up
          </Link>
        </>
      )}
      {/* Mobile menu */}
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
              <SheetTrigger asChild>
                <Link
                  href={"/vendors/user "}
                  className="flex items-center gap-4 py-2 text-left sm:self-center"
                >
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
                  <div className="whitespace-nowrap">
                    <p className="text-sm font-semibold">Username</p>
                    <p className="truncate text-sm">
                      myusername@stud.noroff.no
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total credits: 1000 Ω
                    </p>
                  </div>
                </Link>
              </SheetTrigger>
            ) : (
              <div className="flex flex-col gap-6 py-4 w-full sm:w-1/2 mx-auto">
                <SheetTrigger asChild>
                  <Link
                    href="/register"
                    className={cn(buttonVariants({ variant: "default" }))}
                  >
                    Sign up
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link
                    href="/login"
                    className={cn(buttonVariants({ variant: "outline" }))}
                  >
                    Sign in
                  </Link>
                </SheetTrigger>
              </div>
            )}
          </div>
          <Separator />
          <div className="flex flex-col items-center gap-6 py-4 [&>a]:flex [&>a]:sm:w-1/2 [&>a]:max-sm:w-full [&>a]:justify-between">
            <SheetTrigger asChild>
              <Link className="py-2" href={"/"}>
                <p>Home</p>
                <Home strokeWidth={1.5} className="size-5" />
              </Link>
            </SheetTrigger>
            {session ? (
              <>
                <SheetTrigger asChild>
                  <Link className="py-2" href={"/vendors/user#listings"}>
                    <p>My listings</p>
                    <span className="p-0.5 text-sm">48</span>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link className="py-2" href={"/vendors/user/bids"}>
                    <p>My bids</p>
                    <span className="p-0.5 text-sm">10</span>
                  </Link>
                </SheetTrigger>
                <SheetTrigger asChild>
                  <Link className="py-2" href={"/vendors/user/bids"}>
                    <p>Vendors</p>
                    <Users strokeWidth={1.5} className="size-5" />
                  </Link>
                </SheetTrigger>
                <Separator />
                <SheetTrigger asChild>
                  <Button
                    variant="ghost"
                    className="max-sm:w-full sm:w-1/2 justify-between px-0 py-2"
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
          <SheetFooter className="absolute bottom-5 left-1/2 w-[95%] sm:w-1/2 -translate-x-1/2 px-5">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
