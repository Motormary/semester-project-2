import logo from "assets/images/logo_filled.png"
import Link from "next/link"
import SearchBar from "./search-bar"
import NavMenu from "./nav-menu"
import { Suspense } from "react"
import { Skeleton } from "../ui/skeleton"

export default async function TopNav() {
  return (
    <div className="mb-4 flex w-full flex-col gap-4">
      <div className="flex h-[64px] justify-center bg-background shadow-sm dark:border-b">
        <nav className="flex w-full max-w-content items-center justify-between bg-background px-4">
          <Link href="/">
            <picture>
              <img
                width={40}
                height={40}
                src={logo.src}
                alt="NavLogo"
                className="dark:invert"
              />
            </picture>
          </Link>
          <div className="flex items-center gap-5">
            <Suspense fallback={<Skeleton className="size-10 md:size-8 rounded-full"/>}>
              <NavMenu />
            </Suspense>
          </div>
        </nav>
      </div>
      <div className="mx-auto w-full max-w-content px-4">
        <SearchBar />
      </div>
    </div>
  )
}
