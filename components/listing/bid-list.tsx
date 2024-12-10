"use client"

import { useMediaQuery } from "@/hooks/use-media-query"
import { TYPE_LISTING } from "@/lib/definitions"
import * as datefn from "date-fns"
import { nb } from "date-fns/locale"
import { User } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"

type props = {
  children: React.ReactNode
  listing: TYPE_LISTING
}

type bidsProps = {
  bids: TYPE_LISTING["bids"]
}

function List({ bids }: bidsProps) {
  const sortedBids = useMemo(
    () =>
      bids?.sort((a, b) => {
        return a.amount - b.amount
      }),
    [bids],
  )
  return (
    <Table className="grid w-full">
      <TableHeader className="w-full">
        <TableRow className="flex h-8 justify-between bg-background hover:bg-background">
          <TableHead className="w-1/3">User</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody
        className="max-h-[30rem] overflow-y-auto"
        style={{ scrollbarWidth: "thin" }}
      >
        {sortedBids.map((bid, index) => (
          <TableRow
            key={bid.bidder.name + index}
            className="flex w-full justify-between"
          >
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
  )
}

export default function BidListDialog({ listing, children }: props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  if (!listing.bids?.length) return null
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
          <DrawerHeader>
            <DrawerTitle>Bids</DrawerTitle>
            <DrawerDescription>All recent bids on this item</DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <List bids={listing.bids} />
          </div>
          <DrawerFooter>
            <DrawerTrigger asChild>
              <Button variant="outline">Close</Button>
            </DrawerTrigger>
          </DrawerFooter>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
