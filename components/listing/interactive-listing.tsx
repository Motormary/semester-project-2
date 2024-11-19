"use client"
import { Dot, Edit } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { ListingCarousel } from "./listing-carousel"
import { Badge } from "../ui/badge"
import { Input } from "../ui/input"
import { Button } from "../ui/button"
import { CardTitle } from "../ui/card"

export default function InteractiveListing({ id }: { id: string }) {
  console.log(id)
  return (
    <div className="space-y-4">
      {/* Username */}
      <div className="flex w-full items-center justify-between lg:max-w-[790px]">
        <div className="flex items-center gap-2">
          <Avatar className="max-h-7 max-w-7">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <span className="text-sm">Username</span>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Edit strokeWidth={1.5} className="size-5 hover:cursor-pointer" />
            </TooltipTrigger>
            <TooltipContent>Edit listing</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className="space-y-4 md:flex gap-6">
        <ListingCarousel />
        <div className="w-full lg:min-w-[300px] space-y-4">
          <CardTitle className="max-h-32 overflow-hidden text-wrap break-words">
            Pokémon TCG: Scarlet & Violet - Surging Sparks Elite Trainer Box
          </CardTitle>
          <Badge>Trading Cards</Badge>
          <div>
            <p className="text-2xl">10 Ω</p>
            <p className="flex items-center text-sm text-muted-foreground">
              11 bids{" "}
              <Dot
                stroke="rgb(34 197 94)"
                fill="rgb(34 197 94)"
                strokeWidth="3"
              />
              2d 7h
            </p>
          </div>
          <div className="space-y-4">
            <label htmlFor="bid">
              Bid
              <Input
                id="bid"
                min={0}
                placeholder="Ω"
                onInput={(event) => {
                  // Forces integer value
                  const input = event.currentTarget
                  input.value = input.value.replace(/[^0-9]/g, "")
                }}
              />
            </label>
            <Button className="w-full">Bid</Button>
            <Button variant="outline" className="w-full">
              Quick bid +1 Ω
            </Button>
          </div>
        </div>
      </div>
      {/* 3 */}
      <div className="max-w-[790px]">
        <p className="font-semibold">Description</p>
        <p className="text-pretty text-sm">
          The most anticipated set of 2023 is finally here, Scarlet & Violet
          151! This expansion includes all 151 Pokémon originally discovered in
          Kanto. The set is packed with absolute classics including the infamous
          Charizard, Blastoise & Venusaur! Complete your collection today!
        </p>
        <p className="text-pretty text-sm">
          The Pokémon TCG: Scarlet & Violet—Surging Sparks Elite Trainer Box
          includes 9 Pokémon TCG: Scarlet & Violet—Surging Sparks booster packs,
          1 full-art foil promo card featuring Magneton, and 65 card sleeves.
          The Pokémon TCG: Scarlet & Violet—Surging Sparks Elite Trainer Box
          also comes with 45 Pokémon TCG Energy cards, a player’s guide to the
          Scarlet & Violet—Surging Sparks expansion, and 6 damage-counter dice.
          You will also receive 1 competition-legal coin-flip die, 2 plastic
          condition markers, and a collector’s box to hold everything, with 4
          dividers to keep it organized. You will also get a code card for
          Pokémon Trading Card Game Live.
        </p>
      </div>
    </div>
  )
}
