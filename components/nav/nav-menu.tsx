import { Button, buttonVariants } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu"
import { Box, Home, Menu, User } from "lucide-react"
import Link from "next/link"
import NewListing from "../listing/new-listing"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { Separator } from "../ui/separator"
import MobileLogoutButton from "./logout-button"
import UserBidsCounter from "./bids-counter"
import { getCurrentUser } from "@/app/actions/user/get"
import { logoutUser } from "@/app/actions/user/login"
import Notifications from "@/hooks/pusher"
import Avatar from "../next-avatar"

export default async function NavMenu() {
  let user = null
  const { data, success } = await getCurrentUser()

  if (success) user = data.data

  return (
    <>
      {!user ? null : <Notifications user={user.name} />}
      {user ? (
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
      {user ? (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="hidden md:flex">
              <Button
                variant="ghost"
                className="group px-0 hover:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
              >
                <span className="mb-[2px] max-w-36 truncate">{user.name}</span>
                <Avatar src={user.avatar.url} alt="avatar" size={32} />
              </Button>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            sideOffset={12}
            className="w-56 max-md:hidden"
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="overflow-hidden truncate">
                {user.email}
              </DropdownMenuLabel>
              <DropdownMenuItem disabled>
                <p className="overflow-hidden truncate text-sm">
                  Total credits: {user.credits} Ω
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="flex justify-between"
                  href={`/vendors/${user.name}`}
                >
                  My page <User />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="flex justify-between"
                  href={`/vendors/${user.name}/bids`}
                >
                  Bids{" "}
                  <UserBidsCounter user={user.name} className="p-0.5 text-xs" />
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  className="flex justify-between"
                  href={`/vendors/${user.name}/wins`}
                >
                  Wins <span className="p-0.5 text-xs">{user._count.wins}</span>
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <form action={logoutUser}>
              <DropdownMenuItem>
                <button
                  className="w-full text-left hover:cursor-default"
                  type="submit"
                >
                  Log out
                </button>
              </DropdownMenuItem>
            </form>
          </DropdownMenuContent>
        </DropdownMenu>
      ) : (
        /* Mobile menu */
        <>
          <Link
            className={cn(
              buttonVariants({ variant: "outline" }),
              "hidden md:block",
            )}
            href="/login"
          >
            Login
          </Link>
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "hidden md:block",
            )}
            href="/register"
          >
            Sign up
          </Link>
        </>
      )}
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
        <SheetContent className="top-[65px] grid max-h-[calc(100%-64px)] w-full items-stretch overflow-y-auto pt-0">
          <div>
            <SheetHeader className="sr-only">
              <SheetTitle>Mobile Menu</SheetTitle>
              <SheetDescription>Navigation</SheetDescription>
            </SheetHeader>
            <div className="my-2 flex flex-col gap-2">
              {user ? (
                <SheetTrigger asChild>
                  <Link
                    href={`/vendors/${user.name}`}
                    className="flex items-center gap-4 py-2 text-left sm:self-center"
                  >
                    <Avatar size={40} src={user.avatar.url} alt="Avatar" />
                    <div className="overflow-hidden truncate whitespace-nowrap">
                      <p className="text-sm font-semibold">{user.name}</p>
                      <p className="truncate text-sm">{user.email}</p>
                      <p className="text-sm text-muted-foreground">
                        Total credits: {user.credits} Ω
                      </p>
                    </div>
                  </Link>
                </SheetTrigger>
              ) : (
                <div className="mx-auto flex w-full flex-col gap-6 py-4 sm:w-1/2">
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
            <div className="flex flex-col items-center gap-6 py-4 [&>a]:flex [&>a]:justify-between [&>a]:max-sm:w-full [&>a]:sm:w-1/2">
              <SheetTrigger asChild>
                <Link className="py-2" href={"/"}>
                  <p>Home</p>
                  <Home strokeWidth={1.5} className="size-5" />
                </Link>
              </SheetTrigger>
              {user ? (
                <>
                  <SheetTrigger asChild>
                    <Link className="py-2" href={`/vendors/${user.name}/bids`}>
                      <p>Bids</p>
                      <UserBidsCounter
                        className="p-0.5 text-xs"
                        user={user.name}
                      />
                    </Link>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <Link className="py-2" href={`/vendors/${user.name}/wins`}>
                      <p>Wins</p>
                      <span className="p-0.5 text-sm">{user._count.wins}</span>
                    </Link>
                  </SheetTrigger>
                  {/*                 <SheetTrigger asChild>
                  <Link className="py-2" href={"/vendors/user/bids"}>
                    <p>Vendors</p>
                    <Users strokeWidth={1.5} className="size-5" />
                  </Link>
                </SheetTrigger> */}
                  <Separator />
                  <SheetTrigger className="h-full w-full">
                    <MobileLogoutButton />
                  </SheetTrigger>
                </>
              ) : null}
            </div>
          </div>
          <SheetFooter className="mx-auto w-full sm:w-1/2">
            <SheetClose asChild>
              <Button variant="outline">Close</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </>
  )
}
