"use client"
import * as React from "react"

import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import image from "assets/images/pokemon.png"

export function ListingCarousel() {
  return (
    <div>
      <picture className="max-w-[32rem]">
        <img
          className="object-cover"
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
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)
  const [count, setCount] = React.useState(0)

  React.useEffect(() => {
    if (!api) {
      return
    }

    setCount(api.scrollSnapList().length)
    setCurrent(api.selectedScrollSnap() + 1)

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1)
    })
  }, [api])
  return (
    <div className="space-y-4">
      <picture className="max-md:hidden">
        <img
          className="max-w-[250px] object-cover"
          src={image.src}
          alt="Listing img"
        />
      </picture>
      <div className="mx-auto max-w-[80vw]">
        <Carousel setApi={setApi} className="w-full">
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index}>
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-4xl font-semibold">{index + 1}</span>
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2" />
          <CarouselNext className="right-2" />
        </Carousel>
        <div className="py-2 text-center text-sm text-muted-foreground">
          {current} of {count}
        </div>
      </div>
    </div>
  )
}
