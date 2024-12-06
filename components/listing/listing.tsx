import { TYPE_LISTING } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Badge } from "../ui/badge"
import PriceTag from "./price"
import altImg from "assets/svg/alt.svg"
import { Suspense } from "react"
import { Skeleton } from "../ui/skeleton"
import ListingClock from "./listing-clock"

type props = {
  id?: string
  classname?: string
  data: TYPE_LISTING
  revalidate: boolean
}

export default function Listing({ data, classname, revalidate }: props) {
  return (
    <li
      id={data.id}
      className={`${classname} relative flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-card/70 p-4 shadow-sm backdrop-blur-sm`}
    >
      <Link className="absolute inset-0" href={`/listing/${data.id}`}></Link>
      <picture
        className={`flex aspect-[16/9] max-h-52 overflow-hidden rounded-md border bg-muted`}
      >
        <img
          src={data?.media?.[0]?.url ?? altImg.src} // Alt only runs on missing links, not bad ones.
          alt="alt image"
          className={cn(
            !data.media?.[0]?.url
              ? `mx-auto object-center`
              : "h-full w-full object-cover",
            `text-transparent`,
          )}
        />
      </picture>
      <div className="space-y-3 [&>p]:leading-none">
        {data.tags?.[0] ? <Badge>{data.tags?.[0]}</Badge> : null}
        <p className="text-pretty">{data.title}</p>
        <Suspense fallback={<Skeleton className="h-5 w-20" />}>
          <PriceTag id={data.id} />
        </Suspense>
        <div className="flex items-center text-pretty text-sm text-muted-foreground">
          {data._count.bids} bids{" "}
          <ListingClock revalidate={revalidate} id={data.id} />
        </div>
      </div>
    </li>
  )
}
