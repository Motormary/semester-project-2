"use client"

import image from "assets/images/pokemon.png"

export function ListingCarousel() {
  return (
    <div className="space-y-4">
      <picture className="max-w-[32rem] object-cover aspect-square md:w-[calc(32rem_+_10%)]">
        <img
        className="rounded-md"
          src={image.src}
          alt="Listing img"
        />
      </picture>
      <div className="max-sm:max-w-[81vw] sm:max-w-[500px] overflow-x-auto pb-2">
        <div className="flex w-full gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <picture key={index} className="">
              <img
                className="max-w-20 object-cover flex aspect-square border border-muted-foreground/60 rounded-md"
                src={image.src}
                alt="Listing img"
              />
            </picture>
          ))}
        </div>
      </div>
    </div>
  )
}
