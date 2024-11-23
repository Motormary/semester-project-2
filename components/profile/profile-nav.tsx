"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { Button, buttonVariants } from "../ui/button"

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
      {items.map((item) => (
        <button key={item.href}>
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              pathname === item.href
                ? "border-l border-r border-t bg-card hover:bg-card max-xs:border-b xs:translate-y-[1px]"
                : "hover:bg-card",
              "justify-start rounded-md xs:rounded-b-none sm:border-l sm:border-r sm:border-t flex items-center h-8 p-3 text-sm",
            )}
          >
            {item.title}
          </Link>
        </button>
      ))}
    </nav>
  )
}
