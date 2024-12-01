import image from "assets/images/pokemon.png"
import { Dot } from "lucide-react"
import Link from "next/link"
import { Badge } from "../ui/badge"

type props = {
  id?: string
  classname?: string
}

export default async function Listing({ id, classname }: props) {
  return (
    <div
      id={id}
      className={`${classname} relative flex w-full flex-col gap-4 overflow-hidden rounded-lg bg-card p-4 shadow-sm`}
    >
      <Link className="absolute inset-0" href={`/listing/${id}`}></Link>
      <picture className="flex aspect-[16/9] max-h-52 overflow-hidden rounded-md border bg-muted">
        <img
          src={image.src}
          alt="Listing"
          className="h-full w-full object-cover"
        />
      </picture>
      <div className="space-y-3 [&>p]:leading-none">
        <Badge>Trading Cards</Badge>
        <p className="text-pretty">Official pokemon cards</p>
        <p className="text-2xl">10 Ω</p>
        <p className="flex items-center text-pretty text-sm text-muted-foreground">
          11 bids{" "}
          <Dot stroke="rgb(34 197 94)" fill="rgb(34 197 94)" strokeWidth="3" />
          2d 7h
        </p>
      </div>
    </div>
  )
}
