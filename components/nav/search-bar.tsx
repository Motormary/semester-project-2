"use client"
import { Check, ChevronsUpDown, Plus, Search } from "lucide-react"
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
import { useState } from "react"
import { cn } from "@/lib/utils"

const tags = [
  {
    value: "apple products",
    label: "Apple Products",
  },
  {
    value: "technology",
    label: "Technology",
  },
  {
    value: "sports",
    label: "Sports",
  },
  {
    value: "art",
    label: "Art",
  },
  {
    value: "antiques",
    label: "Antiques",
  },
  {
    value: "jewelry",
    label: "Jewelry",
  },
  {
    value: "collectibles",
    label: "Collectibles",
  },
  {
    value: "furniture",
    label: "Furniture",
  },
  {
    value: "vehicles",
    label: "Vehicles",
  },
  {
    value: "real estate",
    label: "Real Estate",
  },
  {
    value: "rare books",
    label: "Rare Books",
  },
  {
    value: "vintage clothing",
    label: "Vintage Clothing",
  },
  {
    value: "clothing",
    label: "Clothing",
  },
]

export default function SearchBar() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")

  return (
    <div className="flex justify-center gap-2">
      <label className="group flex h-10 w-1/3 items-center rounded-md border border-input bg-background pl-3 text-base focus-within:outline-none focus-within:ring-2 focus-within:ring-ring md:text-sm">
        <label htmlFor="search">
          <Search className="size-5 text-muted-foreground group-focus-within:text-secondary-foreground" />
        </label>
        <Input
          name="search"
          id="search"
          className="ml-3 h-full border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          placeholder="Search listings"
        />
      </label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="justify-between sm:w-[200px]"
          >
            {value
              ? tags.find((framework) => framework.value === value)?.label
              : "Select tag"}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="p-0 sm:w-[200px]">
          <Command>
            <CommandInput placeholder="Search tag" />
            <CommandList style={{ scrollbarWidth: "thin" }}>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {tags.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue)
                      setOpen(false)
                    }}
                  >
                    {framework.label}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === framework.value ? "opacity-100" : "opacity-0",
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
      <Button variant="outline" className="rounded-full" size="icon">
        <Plus />
      </Button>
    </div>
  )
}
