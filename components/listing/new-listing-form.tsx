"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import { newListingSchema } from "@/lib/definitions"
import Stepper from "./stepper"
import { Textarea } from "@/components/ui/textarea"

type props = {
  isDesktop: boolean
}

export default function ListingForm({ isDesktop }: props) {
  const form = useForm<z.infer<typeof newListingSchema>>({
    resolver: zodResolver(newListingSchema),
    defaultValues: {
      title: "",
    },
  })

  function onSubmit(data: z.infer<typeof newListingSchema>) {
    toast.success("success+!", {
      description: (
        <pre className="mt-2 w-full rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper isDesktop={isDesktop}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="hidden group-data-[state=1]:block">
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Depleted Uranium" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem className="hidden group-data-[state=1]:block">
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="hidden group-data-[state=1]:block">
                <FormLabel>Tags</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="hidden group-data-[state=2]:block">
                <FormLabel>Media</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="hidden group-data-[state=3]:block">
                <FormLabel>Ends at</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </Stepper>
      </form>
    </Form>
  )
}
