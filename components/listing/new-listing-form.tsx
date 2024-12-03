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
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import image from "assets/images/pokemon.png"
import { DateTimePicker24hForm } from "../ui/date-time-picker"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { tags } from "@/lib/data/tags"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"


export default function ListingForm() {
  const form = useForm<z.infer<typeof newListingSchema>>({
    resolver: zodResolver(newListingSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      media: [],
      endsAt: new Date()
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
        <Stepper form={form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem className="hidden group-data-[state=1]:block">
                <FormLabel>
                  Title <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input {...field} />
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
            name={"tags"}
            render={({ field }) => (
              <FormItem className="hidden flex-col group-data-[state=1]:flex">
                <FormLabel>Category</FormLabel>
                <Popover modal>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "justify-between",
                          !field.value?.length && "text-muted-foreground",
                        )}
                      >
                        {field.value?.length
                          ? tags.find((tag) => tag.value === field.value?.[0])
                              ?.label
                          : "Select Category"}
                        <ChevronsUpDown className="opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="p-0">
                    <Command>
                      <CommandInput placeholder="Search..." className="h-9" />
                      <ScrollArea className="h-52">
                        <CommandList className="h-full max-h-full overflow-hidden">
                          <CommandEmpty>No results.</CommandEmpty>
                          <CommandGroup>
                            {tags.map((tag, index) => (
                              <CommandItem
                                value={tag.label}
                                key={index}
                                onSelect={() => {
                                  if (field.value?.[0] === tag.value) {
                                    form.resetField("tags")
                                  } else {
                                    form.setValue("tags", [tag.value])
                                  }
                                }}
                              >
                                {tag.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    tag.value === field.value?.[0]
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                        <ScrollBar orientation="vertical" />
                      </ScrollArea>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="hidden space-y-6 group-data-[state=2]:block">
            <FormField
              control={form.control}
              name="media"
              render={({ field }) => (
                <FormItem className="w-full">
                  <FormLabel>Media</FormLabel>
                  <div className="flex gap-1">
                    <FormControl></FormControl>
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
          <DateTimePicker24hForm form={form} />
        </Stepper>
      </form>
    </Form>
  )
}
