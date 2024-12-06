"use client"

import { TYPE_USER } from "@/lib/definitions"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog"
import {
    Drawer,
    DrawerContent,
    DrawerDescription,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "../ui/drawer"
import { Button } from "../ui/button"
import { useMediaQuery } from "@/hooks/use-media-query"
import { useState } from "react"
import EditForm from "./edit-form"

type props = {
  user: TYPE_USER
}

export default function EditProfileDialog({ user }: props) {
  const [open, setOpen] = useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")

  if (isDesktop)
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button className="w-full" variant="outline">
            Edit profile
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>Press submit to save changes</DialogDescription>
          </DialogHeader>
          <EditForm userData={user} closeModal={setOpen} />
        </DialogContent>
      </Dialog>
    )

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button className="w-full" variant="outline">
          Edit profile
        </Button>
      </DrawerTrigger>
      <DrawerContent className="py-4">
        <DrawerHeader className="text-left">
          <DrawerTitle>Edit profile</DrawerTitle>
          <DrawerDescription>Press submit to save changes</DrawerDescription>
        </DrawerHeader>
        <div className="px-4">
          <EditForm userData={user} closeModal={setOpen} />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
