"use client"

import deleteListing from "@/app/actions/listings/delete"
import { TYPE_USER_BID } from "@/lib/definitions"
import { handleErrors } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { RefreshCw } from "lucide-react"
import { ReactNode, useTransition } from "react"
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

type props = {
  id: string
  seller: string
  bids: TYPE_USER_BID[]
  children: ReactNode
}

export default function DeleteListingDialog({ id, seller, bids, children }: props) {
  const [isPending, startTransition] = useTransition()

  function handleDelete() {
    startTransition(async () => {
      const { success, error, source } = await deleteListing({
        id,
        seller,
        bids,
      })
      if (!success) {
        handleErrors(error, source)
      }
    })
  }
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete listing</DialogTitle>
          <DialogDescription>
            Are you sure you want to permanently delete this listing?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline">Cancel</Button>
          </DialogTrigger>
          <form action={handleDelete}>
            <Button
              disabled={isPending}
              variant="destructive"
              className="grid place-items-center [grid-template-areas:'stack']"
            >
              <span
                className={cn(
                  isPending && "text-transparent",
                  "[grid-area:stack]",
                )}
              >
                Delete
              </span>
              <RefreshCw
                className={cn(
                  !isPending && "text-transparent",
                  "size-5 animate-spin [grid-area:stack]",
                )}
              />
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
