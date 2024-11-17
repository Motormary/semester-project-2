import { Edit } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"
import { ListingCarousel } from "./listing-carousel"

export default async function InteractiveListing() {
  return (
    <>
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <Avatar className="max-h-7 max-w-7">
            <AvatarImage src="https://github.com/shadcn.png" alt="Avatar" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          Username
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Edit strokeWidth={1.5} className="size-5" />
            </TooltipTrigger>
            <TooltipContent>Edit listing</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <ListingCarousel />
    </>
  )
}
