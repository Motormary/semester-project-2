"use client"
import { Check, ChevronsUpDown, Plus, RefreshCw, Search, X } from "lucide-react"
import { Input } from "../ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import { useState, useTransition } from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter, useSearchParams } from "next/navigation"
import debounce from "lodash.debounce"
import { tags } from "@/lib/data/tags"

export default function SearchBar() {
  const isMobile = useMediaQuery("(max-width: 480px)")
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [openTagSelect, setOpenTagSelect] = useState(false)
  const [tag, setTag] = useState(searchParams.get("_tag") ?? "")
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  )

  // Debounced search (500ms)
  const handleSearch = debounce((e: React.ChangeEvent<HTMLInputElement>) => {
    const newSearchParams = new URLSearchParams(searchParams.toString())
    if (!e.target.value) newSearchParams.delete("search")
    else newSearchParams.set("search", e.target.value.trim().toLowerCase())
    newSearchParams.delete("_tag") // Delete tag because it won't work with search anyways
    newSearchParams.delete("page")

    startTransition(() => {
      setTag("")
      router.push(`/?${newSearchParams.toString()}`, { scroll: false })
    })
  }, 500)

  return (
    <div
      data-search={isPending ? "" : undefined}
      className="flex justify-center gap-2"
    >
      <label className="group flex h-10 items-center rounded-md border border-input bg-background pl-3 text-base focus-within:outline-none focus-within:ring-2 focus-within:ring-ring md:w-1/3 md:text-sm">
        <label htmlFor="search">
          {isPending ? (
            <RefreshCw className="size-5 animate-spin text-muted-foreground" />
          ) : (
            <Search className="size-5 text-muted-foreground group-focus-within:text-secondary-foreground" />
          )}
        </label>
        <Input
          name="search"
          id="search"
          className="ml-3 h-full border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search all listings"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value)
            handleSearch(e)
          }}
        />
        <button
          type="reset"
          className={cn(
            searchValue ? "flex" : "hidden",
            "mr-2 size-6 items-center justify-center rounded-full text-muted-foreground transition-opacity focus-within:ring-1 focus-within:ring-border hover:bg-transparent hover:text-secondary-foreground focus:text-secondary-foreground focus:outline-none",
          )}
          onClick={() => {
            setSearchValue("")
            startTransition(() =>
              router.push("/", {
                scroll: false,
              }),
            )
          }}
        >
          <X className="size-5" />
        </button>
      </label>
      <Popover open={openTagSelect} onOpenChange={setOpenTagSelect}>
        <PopoverTrigger asChild>
          <Button
            role="combobox"
            aria-expanded={openTagSelect}
            className="xs:hidden"
            variant="outline"
            size="icon"
          >
            <Plus />
          </Button>
        </PopoverTrigger>
        {/* Statecheck prevents popover content misalignment as it tries to align to the last trigger, hidden prevents layout shift. Warn: Trigger only takes a single child, conditionally rendering them inside will create a layout shift */}
        {isMobile ? null : (
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={openTagSelect}
              className="justify-between max-xs:hidden sm:w-fit"
            >
              {tag
                ? tags.find((label) => label.label === tag)?.label
                : "Select Category"}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
        )}
        <PopoverContent className="w-screen p-0 sm:w-[200px]">
          <Command>
            <CommandInput placeholder="Search category" />
            <CommandList style={{ scrollbarWidth: "thin" }}>
              <CommandEmpty>No results</CommandEmpty>
              <CommandGroup>
                {tags.map((options) => (
                  <CommandItem
                    className="py-3 text-xl sm:py-1.5 sm:text-sm"
                    key={options.value}
                    value={options.label}
                    onSelect={(currentValue) => {
                      startTransition(() => {
                        if (currentValue === tag) {
                          setTag("")
                          router.push("/")
                        } else {
                          setTag(currentValue === tag ? "" : currentValue)
                          setSearchValue("")
                          router.push(`/?_tag=${currentValue}`)
                        }
                        setOpenTagSelect(false)
                      })
                    }}
                  >
                    {options.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        tag === options.label ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  )
}
