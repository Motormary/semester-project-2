import { TYPE_LISTING } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import { Dot } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"
import { Countdown } from "./countdown"

type props = {
  id?: string
  classname?: string
  data: TYPE_LISTING
}

export default async function Listing({ data, classname }: props) {
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
        <p className="text-2xl">{"10"} Ω</p>
        <div className="flex items-center text-pretty text-sm text-muted-foreground">
          {data._count.bids} bids{" "}
          {new Date(data.endsAt) > new Date() ? (
            <>
              <Dot
                stroke="rgb(34 197 94)"
                fill="rgb(34 197 94)"
                strokeWidth="3"
              />
              <Countdown endsAt={data.endsAt} />
            </>
          ) : (
            <>
              <Dot className="text-destructive" strokeWidth="3" />
              <span className="text-sm">Ended</span>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
