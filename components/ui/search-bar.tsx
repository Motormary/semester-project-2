// interface props extends React.InputHTMLAttributes<HTMLInputElement>

"use client"

import { Search, X } from "lucide-react"
import { Input } from "./input"
import { useParams, usePathname } from "next/navigation"
import Form from "next/form"

export default function ProfileListingSearch() {
  const path = usePathname()
  console.log("🚀 ~ ProfileListingSearch ~ path:", path.split("/")[path.split("/").length - 1])
  const params = useParams()
  console.log("🚀 ~ ProfileListingSearch ~ params:", params)
  return (
    <Form scroll={false} action={path}>
      <label className="group flex h-10 items-center rounded-md border border-input bg-background px-3 text-base focus-within:outline-none md:text-sm lg:w-1/3 mx-auto">
        <label htmlFor="user_listings">
          <Search className="size-5 text-muted-foreground group-focus-within:text-secondary-foreground" />
        </label>
        <Input
          name="user_listings"
          className="ml-3 h-full border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search listings"
        />
        <div>
          <X className="size-5 text-muted-foreground group-focus-within:text-secondary-foreground" />
        </div>
      </label>
    </Form>
  )
}
