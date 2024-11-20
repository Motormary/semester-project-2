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
import { Button } from "../ui/button"
import { Plus, X } from "lucide-react"
import image from "assets/images/pokemon.png"
import { DateTimePicker24hForm } from "../ui/date-time-picker"

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
        <Stepper form={form} isDesktop={isDesktop}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="hidden group-data-[state=1]:block">
                <FormLabel>Title <span className="text-destructive">*</span></FormLabel>
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
          <div className="hidden space-y-6 group-data-[state=2]:block">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Media</FormLabel>
                  <div className="flex gap-1">
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <Button title="Delete" variant="outline">
                      <Plus />
                    </Button>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-wrap gap-1">
              {Array.from({ length: 8 }).map((_, index) => (
                <div className="relative" key={index}>
                  <Button
                    variant="destructive"
                    className="absolute right-0 top-0 size-5 p-0"
                  >
                    <X />
                  </Button>
                  <picture>
                    <img className="max-w-20" src={image.src} alt="thumbnail" />
                  </picture>
                </div>
              ))}
            </div>
          </div>
          <DateTimePicker24hForm form={form}/>
        </Stepper>
      </form>
    </Form>
  )
}
