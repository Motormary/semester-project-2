import Link from "next/link"
import { Dot } from "lucide-react"
import image from "assets/images/pokemon.png"
import Listing from "./listing"
import { Fragment } from "react"

const containerStyles = { 
  default: "flex gap-4 w-full shrink-1 max-w-[1400px] pt-4 overflow-x-auto",
  xl: " mx-auto xl:w-fit xl:flex-col xl:justify-center xl:border-t"
}

export default async function OtherListings({ id }: { id: string }) {
  console.log(id)
  return (
    <div className="w-full space-y-4 max-md:grid">
      <h3 className="text-sm font-semibold xl:text-center">
        Other listings from this user
      </h3>
      <div className={`${containerStyles.default} xl:${containerStyles.xl}`}>
        {Array.from({ length: 5 }).map((_, index) => (
          <Fragment key={index}>
            <div
              className="relative hidden w-full items-center gap-4 overflow-hidden border-b hover:bg-muted rounded-md p-4 xl:flex"
            >
              <Link className="absolute inset-0" href={`/listing/${id}`}></Link>
              <picture className="flex aspect-square size-20 overflow-hidden rounded-md border bg-muted">
                <img
                  src={image.src}
                  alt="Listing"
                  className="h-full w-full object-cover"
                />
              </picture>
              <div className="space-y-3 [&>p]:leading-none">
                <p className="max-w-[14.5rem] overflow-hidden truncate text-pretty text-sm">
                  Official pokemon cards
                </p>
                <div>
                  <p>10 Ω</p>
                  <p className="flex items-center text-pretty text-xs text-muted-foreground">
                    11 bids{" "}
                    <Dot
                      stroke="rgb(34 197 94)"
                      fill="rgb(34 197 94)"
                      strokeWidth="3"
                    />
                    2d 7h
                  </p>
                </div>
              </div>
            </div>
            <div
              className="flex shrink-0 basis-72 xl:hidden"
            >
              <Listing id={index.toString()} />
            </div>
          </Fragment>
        ))}
      </div>
    </div>
  )
}