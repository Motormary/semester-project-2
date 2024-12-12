"use client"

import { Check, ChevronsUpDown, Plus, RefreshCw, Search, X } from "lucide-react"
import { Input } from "../ui/input"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "../ui/button"
import {
  useState,
  useTransition,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from "react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useRouter, useSearchParams } from "next/navigation"
import debounce from "lodash.debounce"
import { tags } from "@/lib/data/tags"

export default function SearchBar() {
  const searchRef = useRef<HTMLInputElement>(null)
  const isMobile = useMediaQuery("(max-width: 480px)")
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()
  const [openTagSelect, setOpenTagSelect] = useState(false)
  const [tag, setTag] = useState(searchParams.get("_tag") ?? "")
  const [searchValue, setSearchValue] = useState(
    searchParams.get("search") ?? "",
  )

  // Wrapped debounce to avoid multiple searches/rerendering
  const debouncedSearch = useCallback(
    (value: string) => {
      const newSearchParams = new URLSearchParams(searchParams.toString())
      if (!value) newSearchParams.delete("search")
      else newSearchParams.set("search", value.trim().toLowerCase())
      newSearchParams.delete("_tag") // Delete tag because it won't work with search anyways
      setTag("")
      newSearchParams.delete("page")

      startTransition(() => {
        router.push(`/?${newSearchParams.toString()}`, { scroll: false })
        if (searchRef.current) searchRef.current.focus()
      })
    },
    [searchParams, router, setTag],
  )

  const debouncedSearchHandler = useMemo(
    () => debounce(debouncedSearch, 500),
    [debouncedSearch],
  )

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value
    setSearchValue(newValue)
    debouncedSearchHandler(newValue)
  }

  // Throw any pending debounces when unmounting
  useEffect(() => {
    return () => {
      debouncedSearchHandler.cancel()
    }
  }, [debouncedSearchHandler])

  return (
    <div
      data-search={isPending ? "" : undefined}
      className="flex justify-center gap-2"
    >
      <label className="group flex h-10 items-center rounded-md border border-input bg-background pl-3 text-base focus-within:outline-none focus-within:ring-2 focus-within:ring-ring md:w-1/3 md:text-sm">
        <label htmlFor="search">
          <span className="sr-only">Search All Listings</span>
          {isPending ? (
            <RefreshCw className="size-5 animate-spin text-muted-foreground" />
          ) : (
            <Search className="size-5 text-muted-foreground group-focus-within:text-secondary-foreground" />
          )}
        </label>
        <Input
          ref={searchRef}
          name="search"
          id="search"
          className="ml-3 h-full border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search all listings"
          value={searchValue}
          onChange={handleInputChange}
        />
        <button
          type="reset"
          className={cn(
            searchValue ? "flex" : "hidden",
            "mr-2 size-6 items-center justify-center rounded-full text-muted-foreground transition-opacity focus-within:ring-1 focus-within:ring-border hover:bg-transparent hover:text-secondary-foreground focus:text-secondary-foreground focus:outline-none",
          )}
          onClick={() => {
            setSearchValue("")
            debouncedSearchHandler("")
          }}
        >
          <X className="size-5" />
        </button>
      </label>
      <Popover open={openTagSelect} onOpenChange={setOpenTagSelect}>
        <PopoverTrigger asChild>
          <Button
            aria-label="filter menu"
            role="combobox"
            aria-expanded={openTagSelect}
            className="xs:hidden"
            variant="outline"
            size="icon"
            aria-controls="dropdown-menu"
          >
            <span className="sr-only">Select category</span>
            {tag ? <Check /> : <Plus />}
          </Button>
        </PopoverTrigger>
        {isMobile ? null : (
          <PopoverTrigger asChild>
            <Button
              aria-label="filter menu"
              aria-controls="dropdown-menu"
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
