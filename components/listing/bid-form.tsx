"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import bidOnListing from "@/app/actions/listings/bid"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleErrors } from "@/lib/handle-errors"
import { toast } from "sonner"
import { useTransition } from "react"
import { RefreshCw } from "lucide-react"

const FormSchema = z.object({
  amount: z.coerce.number({ message: "Bid value is required" }),
})

type props = {
  id: string
  minBid: number | undefined
  seller: string
  credits: number
}

export default function BidForm({ id, minBid, seller, credits }: props) {
  const [isPending, startTransition] = useTransition()
  const bidAmount = minBid ? minBid + 1 : 1
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: bidAmount,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    startTransition(async () => {
      const { success, error, source } = await bidOnListing({
        data,
        id: id,
        seller,
      })
      if (!success) handleErrors(error, source, form)
      if (success) {
        toast.success("Your bid has been added")
        form.setValue("amount", 0)
      }
    })
  }

  return (
    <Form {...form}>
      <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
                  aria-label="Input bid value"
                  min={bidAmount}
                  type="number"
                  {...field}
                  onClick={(e) => e.currentTarget.select()}
                  onInput={(event) => {
                    // Forces integer value
                    const input = event.currentTarget
                    input.value = input.value.replace(/[^0-9]/g, "")
                  }}
                />
              </FormControl>
              <FormDescription>You have {credits} credits left</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending} className="w-full disabled:bg-primary">
          {isPending ? <RefreshCw className="animate-spin" /> : "Bid Ω"}
        </Button>
      </form>
    </Form>
  )
}
