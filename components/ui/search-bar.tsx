"use client"

import { RefreshCw, Search, X } from "lucide-react"
import { Input } from "./input"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import Form from "next/form"
import { useTransition } from "react"
import { cn } from "@/lib/utils"
import debounce from "lodash.debounce"

export default function ProfileListingSearch() {
  const [isPending, startTransition] = useTransition()
  const searchParams = useSearchParams()
  const searchQuery = searchParams.get("user_listings")
  const page = searchParams.get("page")
  const path = usePathname()
  const param =
    path.split("/").filter((value) => value).length <= 2
      ? "my listings"
      : path.split("/")[path.split("/").length - 1] // Gets placeholder for search field based on url path, "Search -" "inactive", "wins" etc.
  const router = useRouter()

  // Debounced search (500ms)
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    newSearchParams.set("user_listings", e.target.value.trim().toLowerCase())

    startTransition(() =>
      router.push(`?${newSearchParams.toString()}`, { scroll: false }),
    )
  }, 500)

  return (
    <Form
      data-pending={isPending ? "" : undefined}
      key={page}
      scroll={false}
      action={path}
    >
      <label className="group mx-auto flex h-10 items-center rounded-md border border-input bg-background px-3 text-base focus-within:outline-none md:text-sm lg:w-1/3">
        <label htmlFor="user_listings">
          {isPending ? (
            <RefreshCw className="size-5 animate-spin text-muted-foreground" />
          ) : (
            <Search className="size-5 text-muted-foreground group-focus-within:text-secondary-foreground" />
          )}
        </label>
        <Input
          name="user_listings"
          className="ml-3 h-full border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          defaultValue={searchQuery ?? ""}
          onChange={handleSearch}
          placeholder={`Search ${param}`}
        />
        <button
          type="reset"
          className={cn(
            searchQuery ? "flex" : "hidden",
            "size-6 items-center justify-center rounded-full text-muted-foreground transition-opacity focus-within:ring-1 focus-within:ring-border hover:bg-transparent hover:text-secondary-foreground focus:text-secondary-foreground focus:outline-none",
          )}
          onClick={() => {
            startTransition(() =>
              router.push(path, {
                scroll: false,
              }),
            )
          }}
        >
          <X className="size-5" />
        </button>
      </label>
    </Form>
  )
}
