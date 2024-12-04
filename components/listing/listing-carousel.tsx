"use client"

import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { TYPE_LISTING } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import { useEffect, useMemo, useRef, useState } from "react"
import Link from "next/link"

type props = {
  listing: TYPE_LISTING
}

export default function ListingCarousel({ listing }: props) {
  const scrollRef = useRef<HTMLDivElement | null>(null)
  const overflowRef = useRef<HTMLDivElement | null>(null)
  const lastImageRef = useRef<HTMLElement | null>(null)
  const firstImageRef = useRef<HTMLElement | null>(null)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const [isLastImageInView, setIsLastImageInView] = useState(false)
  const [isFirstImageInView, setIsFirstImageInView] = useState(false)
  const [image, setImage] = useState<string | undefined>(
    listing && listing?.media?.length ? listing.media[0].url : "",
  )
  const gallery = useMemo(
    () => (listing && listing?.media?.length ? listing.media : []),
    [listing],
  )

  useEffect(() => {
    const checkOverflow = () => {
      if (scrollRef.current && overflowRef.current) {
        setIsOverflowing(
          scrollRef.current.clientWidth < overflowRef.current.clientWidth,
        )
      }
    }

    checkOverflow()
  }, [])

  useEffect(() => {
    if (!gallery.length) return

    const lastObserver = new IntersectionObserver(
      ([entry]) => {
        setIsLastImageInView(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )
    const firstObserver = new IntersectionObserver(
      ([entry]) => {
        setIsFirstImageInView(entry.isIntersecting)
      },
      { threshold: 0.5 },
    )

    const lastImage = lastImageRef.current
    const firstImage = firstImageRef.current
    if (lastImage) {
      lastObserver.observe(lastImage)
    }
    if (firstImage) {
      firstObserver.observe(firstImage)
    }

    return () => {
      if (lastImage) {
        lastObserver.unobserve(lastImage)
      }
      if (firstImage) {
        firstObserver.unobserve(firstImage)
      }
    }
  }, [gallery])

  return (
    <div className="space-y-4">
      <Link href={image ?? "#"} target="_blank">
        <picture className="aspect-square max-w-[32rem] md:max-w-[calc(32rem_+_10%)]">
          <img className="rounded-md object-cover" src={image} alt="Listing img" />
        </picture>
      </Link>
      <ScrollArea
        ref={scrollRef}
        className="pb-3 max-sm:max-w-[81vw] sm:max-w-[600px]"
      >
        <div ref={overflowRef} className="flex w-full gap-4 px-2 py-1">
          {gallery?.length && gallery.length > 1
            ? gallery?.map((media, index) => (
                <picture
                  ref={
                    index === gallery?.length - 1
                      ? lastImageRef
                      : index === 0
                        ? firstImageRef
                        : null
                  }
                  key={index}
                  onClick={() => setImage(media.url)}
                  className={cn(
                    image === media.url ? "outline outline-green-500" : "",
                    "flex aspect-square w-28 rounded-md bg-muted",
                  )}
                >
                  <img
                    className="h-full w-full object-cover"
                    src={media.url}
                    alt="Listing img"
                  />
                </picture>
              ))
            : null}
        </div>
        <ScrollBar orientation="horizontal" />
        {isOverflowing ? (
          <>
            <div
              className={cn(
                isLastImageInView
                  ? "opacity-0 animate-out fade-out"
                  : "animate-in fade-in",
                "pointer-events-none absolute bottom-0 right-0 h-full w-14 bg-gradient-to-r from-transparent to-background text-muted-foreground duration-500 dark:to-muted",
              )}
            />
            <div
              className={cn(
                isFirstImageInView
                  ? "opacity-0 animate-out fade-out"
                  : "animate-in fade-in",
                "pointer-events-none absolute bottom-0 left-0 h-full w-14 bg-gradient-to-l from-transparent to-background text-muted-foreground duration-500 dark:to-muted",
              )}
            />
          </>
        ) : null}
      </ScrollArea>
    </div>
  )
}
