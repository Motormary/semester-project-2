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
    <nav className={cn("flex w-fit max-sm:flex-wrap max-xs:mb-1 max-xs:gap-1")}>
      {items.map((item, index) => (
        <button
          tabIndex={-1}
          className={cn(
            index === 0 &&
              "relative hover:before:absolute hover:before:bottom-[-7px] hover:before:left-0 hover:before:-z-10 hover:before:h-2 hover:before:w-3 hover:before:bg-card max-xs:before:content-none",
          )}
          key={item.href}
        >
          <Link
            scroll={false}
            key={item.href}
            href={item.href}
            className={cn(
              pathname === item.href
                ? "border-l border-r border-t bg-card hover:bg-card max-xs:border-b xs:translate-y-[1px]"
                : "text-muted-foreground hover:bg-card hover:text-secondary-foreground",
              "flex items-center justify-start rounded-md p-3 text-sm xs:rounded-b-none max-md:h-full md:h-8 focus:outline-none focus:text-secondary-foreground focus:bg-card",
            )}
          >
            {item.title}
          </Link>
        </button>
      ))}
    </nav>
  )
}
