"use client"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { useEffect, useState } from "react"
import Avatar from "../next-avatar"
import Image from "next/image"

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
        <div className="flex aspect-square w-full">
          <Avatar src={url} alt="profile picture" size={240} className="h-full w-full" />
        </div>
      </PopoverTrigger>
      <PopoverContent
        alignOffset={-21}
        sideOffset={16}
        align="start"
        side="right"
        className="size-[55vw] h-fit max-w-[600px]"
      >
        <div className="flex aspect-square w-full rounded-lg bg-muted overflow-hidden">
          <Image src={url} alt="Profile pic expanded" height={500} width={500} className="h-full w-full object-contain" />
        </div>
      </PopoverContent>
    </Popover>
  )
}
