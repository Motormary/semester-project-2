"use client"

import { useState } from "react"
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
import { UserProfile } from "@/lib/definitions"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"

type props = {
  children: React.ReactNode
  postId: string
}

function List(bids: any) {
  console.log(bids)
  return (
    <ScrollArea className="h-[30rem] sm:h-96 relative mt-8 pr-2">
    <Table>
      <TableHeader className="relative">
        <TableRow className="fixed w-full bg-background hover:bg-background z-[999] left-0 px-5 h-8 flex justify-between -translate-y-8">
          <TableHead className="w-1/3">User</TableHead>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {Array.from({ length: 10 }).map((_, index) => (
          <TableRow key={index}>
            <TableCell>
              <Link href={`/profile/username`}>
                {" "}
                <div className="flex items-center gap-2">
                  <Avatar className="max-h-5 max-w-5">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="Avatar"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                  </Avatar>
                  <span className="max-w-20 sm:max-w-32 sm:overflow-hidden sm:truncate text-sm max-sm:break-all">
                    Username asasdasa asd
                  </span>
                </div>
              </Link>
            </TableCell>
            <TableCell className="text-center">
              {new Date().toDateString()}
            </TableCell>
            <TableCell className="text-right">250</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
    </ScrollArea>
  )
}

export default function BidListDialog({ postId, children }: props) {
  const [open, setOpen] = useState(false)
  console.log(postId)
  // get bids
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
          <List _user={{}} />
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
              <List />
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
