import Link from "next/link"
import { Dot } from "lucide-react"
import image from "assets/images/pokemon.png"

export default async function OtherListings({ id }: { id: string }) {
  console.log(id)
  return (
    <div className="w-full space-y-4">
      <h3 className="text-center text-sm font-semibold">Other listings from this user</h3>
      <div className="mx-auto flex w-fit flex-col justify-center xl:border-t pt-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <div
            key={index}
            className="relative flex w-full items-center gap-4 overflow-hidden border-none p-4"
          >
            <Link className="absolute inset-0" href={`/${id}`}></Link>
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
        ))}
      </div>
    </div>
  )
}
