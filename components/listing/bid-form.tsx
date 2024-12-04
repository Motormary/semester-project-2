"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import bidOnListing from "@/app/actions/listings/bid"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { handleErrors } from "@/lib/handle-errors"
import { toast } from "sonner"

const FormSchema = z.object({
  amount: z.coerce.number({ message: "Bid value is required" }),
})

type props = {
  id: string
  minBid: number | undefined
}

export default function CreateBid({ id, minBid }: props) {
  const bidAmount = minBid ? minBid + 1 : 1
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: bidAmount,
    },
  })

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    const { success, error, source } = await bidOnListing({ data, id: id })
    if (!success) handleErrors(error, source, form)
    if (success) {
      toast.success("Your bid has been added")
      form.setValue("amount", 0)
    }
  }

  return (
    <Form {...form}>
      <form
        className="space-y-4 sm:max-w-96"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input
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
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full">Bid Ω</Button>
      </form>
    </Form>
  )
}
