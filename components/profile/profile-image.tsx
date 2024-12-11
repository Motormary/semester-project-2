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
      <PopoverTrigger asChild>
        <button
          aria-controls="dialog"
          disabled={!isDesktop}
          className="m-auto flex aspect-square h-full w-full grow"
        >
          <Avatar
            src={url}
            alt="profile picture"
            size={500}
            className="h-full w-full"
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        aria-label="Profile image dialog"
        alignOffset={-21}
        sideOffset={16}
        align="start"
        side="right"
        className="size-[55vw] h-fit max-w-[600px]"
      >
        <div className="flex aspect-square w-full overflow-hidden rounded-lg bg-muted">
          <Image
            src={url}
            alt="Profile pic expanded"
            height={500}
            width={500}
            className="h-full w-full object-contain"
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
