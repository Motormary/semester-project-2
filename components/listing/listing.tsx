import { TYPE_LISTING } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Badge } from "../ui/badge"
import PriceTag from "./price"
import altImg from "assets/svg/alt.svg"
import { Suspense } from "react"
import ListingClock from "./listing-clock"
import Image from "next/image"
import { LoadingListingBottom } from "./listing-skeleton"

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
    <div
      id={data.id}
      className={cn(
        classname ?? "shadow-sm",
        "relative flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-card/70 p-4 backdrop-blur-sm",
      )}
    >
      <Link className="absolute inset-0" href={`/listing/${data.id}`}>
        <span className="sr-only">View {data.title}</span>
      </Link>
      <div
        className={`flex aspect-[16/9] max-h-52 overflow-hidden rounded-md border bg-muted`}
      >
        <Image
          priority={priority}
          quality={60}
          src={data?.media?.[0]?.url ?? altImg.src}
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="
          placeholder="blur"
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
      </div>
      <div className="space-y-3 [&>p]:leading-none">
        {data.tags?.[0] ? <Badge>{data.tags?.[0]}</Badge> : null}
        <p className="text-pretty break-all line-clamp-3 max-w-[329px]">{data.title}</p>
        <Suspense fallback={<LoadingListingBottom />}>
          <PriceTag myBid={useMyBid} id={data.id} />

          <div className="flex items-center text-pretty text-sm text-muted-foreground">
            {data._count.bids} bids{" "}
            <ListingClock
              user={data?.seller?.name}
              revalidate={revalidate}
              id={data.id}
            />
          </div>
        </Suspense>
      </div>
    </div>
  )
}
