"use client"

import React, { useState } from "react"
import {
  Dialog,
  DialogContent, DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import {
  Drawer, DrawerContent,
  DrawerDescription, DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from "@/components/ui/drawer"
import ListingForm from "./new-listing-form"
import { useMediaQuery } from "@/hooks/use-media-query"

type props = {
  children: React.ReactNode
}

export default function NewListing({ children }: props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>New listing</DialogTitle>
          </DialogHeader>
          <ListingForm isDesktop={isDesktop} />
        </DialogContent>
      </Dialog>
    )
  }
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>New listing</DrawerTitle>
          <DrawerDescription>
            Enter the listing details and submit
          </DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
        <ListingForm isDesktop={isDesktop} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
