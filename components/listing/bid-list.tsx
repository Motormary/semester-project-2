"use client"

import { useMemo, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import { useMediaQuery } from "@/hooks/use-media-query"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { Button } from "../ui/button"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { TYPE_LISTING } from "@/lib/definitions"
import { User } from "lucide-react"
import * as datefn from "date-fns"
import { nb } from "date-fns/locale"
import { compareValues } from "@/lib/utils"

type props = {
  children: React.ReactNode
  listing: TYPE_LISTING
}

type bidsProps = {
  bids: TYPE_LISTING["bids"]
}


function List({ bids }: bidsProps) {
  const sortedBids = useMemo(() => bids.toSorted((a, b) => compareValues(a.amount, b.amount)), [bids])
  return (
    <ScrollArea className="relative mt-8 h-[30rem] pr-2 sm:h-96">
      <Table>
        <TableHeader className="relative">
          <TableRow className="fixed left-0 z-[999] flex h-8 w-full -translate-y-8 justify-between bg-background px-5 hover:bg-background">
            <TableHead className="w-1/3">User</TableHead>
            <TableHead className="text-center">Date</TableHead>
            <TableHead className="text-right">Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedBids.map((bid, index) => (
            <TableRow key={bid.bidder.name + index}>
              <TableCell>
                <Link href={`/vendors/${bid.bidder.name}`}>
                  <div className="flex items-center gap-2">
                    <Avatar className="max-h-5 max-w-5">
                      <AvatarImage src={bid.bidder.avatar.url} alt="Avatar" />
                      <AvatarFallback>
                        <User className="size-5" />
                      </AvatarFallback>
                    </Avatar>
                    <span className="max-w-20 text-sm max-sm:break-all sm:max-w-32 sm:overflow-hidden sm:truncate">
                      {bid.bidder.name}
                    </span>
                  </div>
                </Link>
              </TableCell>
              <TableCell className="text-center">
                {datefn.format(bid.created, "PPp", { locale: nb })}
              </TableCell>
              <TableCell className="text-right">{bid.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  )
}

export default function BidListDialog({ listing, children }: props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bids</DialogTitle>
            <DialogDescription>All recent bids on this item</DialogDescription>
          </DialogHeader>
          <List bids={listing.bids} />
          <DialogFooter>
            <DialogTrigger asChild>
              <Button variant="outline">Close</Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="flex h-[90svh] items-end justify-end">
          <div className="flex h-[90svh] flex-col justify-end">
            <DrawerHeader>
              <DrawerTitle>Bids</DrawerTitle>
              <DrawerDescription>
                All recent bids on this item
              </DrawerDescription>
            </DrawerHeader>
            <div className="px-4">
              <List bids={listing.bids} />
            </div>
            <DrawerFooter>
              <DrawerTrigger asChild>
                <Button variant="outline">Close</Button>
              </DrawerTrigger>
            </DrawerFooter>
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
