import { TYPE_LISTING } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import altImg from "assets/svg/alt.svg"
import Link from "next/link"
import { Suspense } from "react"
import { Badge } from "../ui/badge"
import { Skeleton } from "../ui/skeleton"
import ListingClock from "./listing-clock"
import PriceTag from "./price"

type props = {
  id?: string
  classname?: string
  data: TYPE_LISTING
  revalidate: boolean
  useMyBid?: number
  priority?: boolean
}

/**
 *
 * @description - Displays provided listing data
 * - Passes listing id to PriceTag component which fetches and caches the listing details/price.
 * - Contains a dynamic clock which automatically revalidates the cached listings depending on revalidate prop and if auction has ended.
 */
export default function Listing({
  data,
  classname,
  revalidate,
  useMyBid,
  priority,
}: props) {
  return (
    <li
      id={data.id}
      className={cn(
        classname ?? "shadow-sm",
        "relative flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-card/70 p-4 backdrop-blur-sm",
      )}
    >
      <Link className="absolute inset-0" href={`/listing/${data.id}`}></Link>
      <picture
        className={`flex aspect-[16/9] max-h-52 overflow-hidden rounded-md border bg-muted`}
      >
        <img
          src={data?.media?.[0]?.url ?? altImg.src}
          alt="alt image"
          width={304}
          height={170}
          loading="eager"
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
          <PriceTag myBid={useMyBid} id={data.id} />
        </Suspense>
        <div className="flex items-center text-pretty text-sm text-muted-foreground">
          {data._count.bids} bids{" "}
          <ListingClock
            user={data?.seller?.name}
            revalidate={revalidate}
            id={data.id}
          />
        </div>
      </div>
    </li>
  )
}
