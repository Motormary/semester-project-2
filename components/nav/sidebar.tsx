import { Button } from "@/components/ui/button"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { Menu, RotateCw } from "lucide-react"
import { Suspense } from "react"
import SidebarContent from "./sidebar-content"

export default function NavMenu() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="rounded-full md:hidden"
        >
          <Menu
            className="text-secondary-foreground"
            strokeWidth={1.5}
            style={{ width: "24px", height: "24px" }}
          />
        </Button>
      </SheetTrigger>
      <SheetContent className="top-[65px] max-h-[calc(100%-64px)] w-full pt-0">
        <SheetHeader className="sr-only">
          <SheetTitle>Mobile Menu</SheetTitle>
        </SheetHeader>
        <Suspense fallback={<RotateCw className="size-5 mx-auto mt-10 animate-spin text-muted-foreground"/>}>
          <SidebarContent />
        </Suspense>
      </SheetContent>
    </Sheet>
  )
}
