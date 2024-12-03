import { TYPE_LISTING } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Countdown } from "./countdown"
import PriceTag from "./price"

type props = {
  id?: string
  classname?: string
  data: TYPE_LISTING
}

export default async function Listing({ data, classname }: props) {
  if (data.id === "f8b797fd-4936-4af3-ae44-8d3f94afeed1") console.log(data.endsAt)
  return (
    <div
      id={data.id}
      className={`${classname} relative flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-card p-4 shadow-sm`}
    >
      <Link className="absolute inset-0" href={`/listing/${data.id}`}></Link>
      <picture
        className={`flex aspect-[16/9] max-h-52 overflow-hidden rounded-md border bg-muted`}
      >
        <img
          src={data.media?.[0]?.url}
          alt="alt image"
          className={cn(
            !data.media?.[0]?.url
              ? `bg-[url('/assets/svg/alt.svg')] bg-contain bg-center bg-no-repeat` /* Compensate for missing image, will not work for the people adding non-direct links */
              : "",
            `h-full w-full object-cover text-transparent`,
          )}
        />
      </picture>
      <div className="space-y-3 [&>p]:leading-none">
        {data.tags?.[0] ? <Badge>{data.tags?.[0]}</Badge> : null}
        <p className="text-pretty">{data.title}</p>
        <PriceTag id={data.id} />
        <div className="flex items-center text-pretty text-sm text-muted-foreground">
          {data._count.bids} bids{" "}
          <Countdown id={data.id} endsAt={data.endsAt} />
        </div>
      </div>
    </div>
  )
}
