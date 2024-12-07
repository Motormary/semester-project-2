"use client"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useEffect, useState } from "react"

type props = {
  url: string
}

export default function ProfileImage({ url }: props) {
  const isDesktop = useMediaQuery("(min-width: 640px)")
  const [open, setOpen] = useState(() => !isDesktop)
  useEffect(() => {
    if (!isDesktop) setOpen(false)
  }, [isDesktop])
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger disabled={!isDesktop} asChild>
        <picture className="flex aspect-square w-full">
          <img src={url} alt="" className="h-full w-full rounded-full object-cover" />
        </picture>
      </PopoverTrigger>
      <PopoverContent
        alignOffset={-21}
        sideOffset={16}
        align="start"
        side="right"
        className="size-[55vw] h-fit max-w-[500px]"
      >
        <picture className="flex aspect-square w-full rounded-lg bg-muted overflow-hidden">
          <img src={url} alt="" className="h-full w-full object-contain" />
        </picture>
      </PopoverContent>
    </Popover>
  )
}
