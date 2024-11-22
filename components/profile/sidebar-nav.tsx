"use client"

import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "../ui/button"


export function SidebarNav() {
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
    <nav className={cn("flex gap-2 rounded-t-md w-fit bg-muted")}>
      {items.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            pathname === item.href
              ? "bg-card hover:bg-card"
              : "",
            "justify-start rounded-b-none hover:underline",
          )}
        >
          {item.title}
        </Link>
      ))}
    </nav>
  )
}
