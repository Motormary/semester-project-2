"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function ProfileNav() {
  const pathname = usePathname()
  const { name } = useParams()

  const items = [
    {
      title: "Active Listings",
      href: `/vendors/${name}`,
    },
    {
      title: "Inactive Listings",
      href: `/vendors/${name}/inactive`,
    },
    {
      title: "Bids",
      href: `/vendors/${name}/bids`,
    },
    {
      title: "Wins",
      href: `/vendors/${name}/wins`,
    },
  ]

  return (
    <nav className={cn("flex w-fit max-sm:flex-wrap max-xs:mb-1")}>
      {items.map((item, index) => (
        <button
          className={cn(
            index === 0 &&
              "relative max-xs:before:content-none hover:before:absolute hover:before:bottom-[-7px] hover:before:left-0 hover:before:-z-10 hover:before:h-2 hover:before:w-3 hover:before:bg-card",
          )}
          key={item.href}
        >
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              pathname === item.href
                ? "border-l border-r border-t bg-card hover:bg-card max-xs:border-b xs:translate-y-[1px]"
                : "text-muted-foreground hover:bg-card hover:text-secondary-foreground",
              "flex sm:h-8 items-center justify-start rounded-md p-3 text-sm xs:rounded-b-none",
            )}
          >
            {item.title}
          </Link>
        </button>
      ))}
    </nav>
  )
}
