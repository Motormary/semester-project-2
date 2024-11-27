"use client"

import image from "assets/images/pokemon.png"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"

export function ListingCarousel() {
  return (
    <div className="space-y-4">
      <picture className="aspect-square max-w-[32rem] object-cover md:w-[calc(32rem_+_10%)]">
        <img className="rounded-md" src={image.src} alt="Listing img" />
      </picture>
        <ScrollArea className="max-sm:max-w-[81vw] sm:max-w-[500px] pb-3">
          <div className="flex w-full gap-4">
            {Array.from({ length: 8 }).map((_, index) => (
              <picture key={index} className="">
                <img
                  className="flex aspect-square max-w-20 rounded-md border border-muted-foreground/60 object-cover"
                  src={image.src}
                  alt="Listing img"
                />
              </picture>
            ))}
          </div>
          <ScrollBar orientation="horizontal"/>
        </ScrollArea>
    </div>
  )
}
