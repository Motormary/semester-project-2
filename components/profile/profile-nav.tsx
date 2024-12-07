"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"

export function ProfileNav() {
  const pathname = usePathname()
  const { slug } = useParams()

  const items = [
    {
      title: "Active Listings",
      href: `/vendors/${slug?.[0]}`,
    },
    {
      title: "Inactive Listings",
      href: `/vendors/${slug?.[0]}/inactive`,
    },
    {
      title: "Bids",
      href: `/vendors/${slug?.[0]}/bids`,
    },
    {
      title: "Wins",
      href: `/vendors/${slug?.[0]}/wins`,
    },
  ]

  return (
    <nav className={cn("flex w-fit max-sm:flex-wrap max-xs:mb-1 max-xs:gap-1")}>
      {items.map((item, index) => (
        <button
          tabIndex={-1}
          className={cn(
            /* Hides the rounded corner of the parent card when hovering/focusing the first button */
            index === 0 &&
              `relative hover:before:absolute hover:before:bottom-[-8px] hover:before:left-0 hover:before:h-2 hover:before:w-3 hover:before:border-l hover:before:border-t hover:before:bg-card focus-within:before:absolute focus-within:before:bottom-[-8px] focus-within:before:left-0 focus-within:before:h-2 focus-within:before:w-3 focus-within:before:border-l focus-within:before:border-t focus-within:before:bg-card max-xs:before:content-none`,
          )}
          key={item.href}
        >
          <Link
            scroll={false}
            key={item.href}
            href={item.href}
            className={cn(
              pathname.toLowerCase() === item.href.toLowerCase()
                ? "border-l border-r border-t bg-card hover:bg-card max-xs:border-b xs:translate-y-[1px]"
                : "text-muted-foreground hover:bg-card hover:text-secondary-foreground",
              "flex items-center justify-start rounded-md p-3 text-sm focus:bg-card focus:text-secondary-foreground focus:outline-none max-md:h-full xs:rounded-b-none md:h-8",
            )}
          >
            {item.title}
          </Link>
        </button>
      ))}
    </nav>
  )
}
