import logo from "assets/images/logo_filled.png"
import Link from "next/link"
import SearchBar from "./search-bar"
import NavMenu from "./nav-menu"
import { Suspense } from "react"
import { Skeleton } from "../ui/skeleton"
import Image from "next/image"

export default async function TopNav() {
  return (
    <div className="peer mb-4 flex w-full flex-col gap-4">
      <div className="flex h-[64px] justify-center bg-background/70 shadow-sm backdrop-blur-sm dark:border-b">
        <nav className="flex w-full max-w-content items-center justify-between px-4">
          <Link href="/">
            <Image
              loading="eager"
              quality={100}
              width={40}
              height={40}
              src={logo.src}
              alt="NavLogo"
              className="dark:invert"
            />
          </Link>
          <div className="flex items-center gap-5">
            <Suspense
              fallback={<Skeleton className="size-10 rounded-full md:size-8" />}
            >
              <NavMenu />
            </Suspense>
          </div>
        </nav>
      </div>
      <div className="mx-auto w-full max-w-content px-4">
        <Suspense fallback={null}>
          <SearchBar />
        </Suspense>
      </div>
    </div>
  )
}
