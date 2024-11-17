import { Dot } from "lucide-react"
import { Badge } from "../ui/badge"
import { Card } from "../ui/card"
import image from "assets/images/pokemon.png"

export default async function MobileListing() {
  return (
    <Card className="flex w-full flex-col gap-4 overflow-hidden border-none p-4">
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
        <p className="flex items-center text-pretty text-sm">
          11 bids{" "}
          <Dot stroke="rgb(34 197 94)" fill="rgb(34 197 94)" strokeWidth="3" />
          2d 7h
        </p>
      </div>
    </Card>
  )
}
