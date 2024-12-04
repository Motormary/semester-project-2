"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"
import ListingForm from "./new-listing-form"
import { useMediaQuery } from "@/hooks/use-media-query"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import { TYPE_LISTING } from "@/lib/definitions"

type props = {
  children: React.ReactNode
  initialData?: TYPE_LISTING
}

export default function NewListing({ children, initialData }: props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New listing</DialogTitle>
            <DialogDescription className="sr-only">Form</DialogDescription>
          </DialogHeader>
          <ListingForm initialData={initialData} closeModal={setOpen} />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <ScrollArea className="h-[90svh]">
          <DrawerHeader className="text-left">
            <DrawerTitle>New listing</DrawerTitle>
            <DrawerDescription>
              Enter the listing details and submit
            </DrawerDescription>
          </DrawerHeader>
          <div className="px-4">
            <ListingForm initialData={initialData} closeModal={setOpen} />
          </div>
          <ScrollBar orientation="vertical" />
        </ScrollArea>
      </DrawerContent>
    </Drawer>
  )
}
