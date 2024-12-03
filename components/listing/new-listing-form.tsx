import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

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
import { Textarea } from "@/components/ui/textarea"
import { tags } from "@/lib/data/tags"
import { mediaSchema, newListingSchema } from "@/lib/definitions"
import { cn } from "@/lib/utils"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "../ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command"
import { DateTimePicker24hForm } from "../ui/date-time-picker"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { ScrollArea, ScrollBar } from "../ui/scroll-area"
import Stepper from "./stepper"
import { useAutoAnimate } from '@formkit/auto-animate/react'

export default function ListingForm() {
  const [mediaRef] = useAutoAnimate()
  const [gallery, setGallery] = useState<
    z.infer<typeof mediaSchema>[] | undefined
  >([])
  const form = useForm<z.infer<typeof newListingSchema>>({
    resolver: zodResolver(newListingSchema),
    defaultValues: {
      title: "",
      description: "",
      tags: [],
      media: [],
      endsAt: new Date(),
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

  function handleAddMedia(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault()
    const input = document.querySelector(
      "input.media-input",
    ) as HTMLInputElement
    if (input && input.tagName === "INPUT") {
      try {
        const newMedia = { url: input.value, alt: "thumbnail" }
        const newGallery = gallery?.length ? [...gallery, newMedia] : [newMedia]
        mediaSchema.parse(newMedia)
        
        setGallery(newGallery)
        form.setValue("media", newGallery)
        input.value = ""
        form.clearErrors("media")
      } catch (e: any) {
        form.setError("media", { message: JSON.parse(e)[0].message })
      }
    }
  }

  function handleDeleteMedia(mediaIndex: number) {
    const newGallery = gallery?.filter((_, i) => i !== mediaIndex)
    setGallery(newGallery)
    form.setValue("media", newGallery)
  }

  function handleSetMainImage(
    mediaObject: z.infer<typeof mediaSchema>,
    mediaIndex: number,
  ) {
    const newGallery = gallery?.filter((_, i) => i !== mediaIndex)
    const reorderedGallery = newGallery
      ? [{ ...mediaObject }, ...newGallery]
      : [mediaObject]
    setGallery(reorderedGallery)
    form.setValue("media", reorderedGallery)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Stepper form={form}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem autoFocus className="hidden group-data-[state=1]:block">
                <FormLabel>
                  Title <span className="text-destructive">*</span>
                </FormLabel>
                <FormControl>
                  <Input autoComplete="off" {...field} />
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
                  <Textarea className="textarea" {...field} />
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
                  <div className="flex gap-2">
                    <Input className="media-input" />
                    <Button onClick={handleAddMedia} variant="outline">
                      <Plus />
                    </Button>
                  </div>
                  <FormMessage />
                  <FormDescription>
                    {gallery?.length ? "Click on image to select as main" : ""}
                  </FormDescription>
                </FormItem>
              )}
            />
            <div ref={mediaRef} className="flex flex-wrap gap-1 items-start">
              {gallery
                ? gallery.map((image, index) => (
                    <div
                      onClick={() => handleSetMainImage(image, index)}
                      className="relative"
                      key={image.url+index}
                    >
                      <Button
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          handleDeleteMedia(index)
                        }}
                        variant="destructive"
                        className="absolute -right-1 -top-1 size-4 p-0"
                      >
                        <X />
                      </Button>
                      <picture
                        className={cn(
                          index === 0 ? "outline outline-primary" : "",
                          "flex aspect-video max-w-20 rounded-md bg-muted",
                        )}
                      >
                        <img
                          className="h-full w-full rounded-md object-cover"
                          src={image.url}
                          alt="thumbnail"
                        />
                      </picture>
                    </div>
                  ))
                : null}
            </div>
          </div>
          <DateTimePicker24hForm form={form} />
        </Stepper>
      </form>
    </Form>
  )
}
