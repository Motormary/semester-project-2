import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import createListing from "@/app/actions/listings/create"
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
import {
  mediaSchema,
  newListingSchema,
  TYPE_CREATE_LISTING,
  TYPE_LISTING,
} from "@/lib/definitions"
import { handleErrors } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { useAutoAnimate } from "@formkit/auto-animate/react"
import { Check, ChevronsUpDown, Plus, X } from "lucide-react"
import { useRouter } from "next/navigation"
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
import updateListing from "@/app/actions/listings/update"

type props = {
  closeModal: (state: boolean) => void
  initialData?: TYPE_LISTING
}

export default function ListingForm({ closeModal, initialData }: props) {
  const router = useRouter()
  const [isPending, setIspending] = useState(false)
  const [mediaRef] = useAutoAnimate()
  const [gallery, setGallery] = useState<
    z.infer<typeof mediaSchema>[] | undefined
  >(initialData ? initialData.media : [])
  const form = useForm<z.infer<typeof newListingSchema>>({
    resolver: zodResolver(newListingSchema),
    defaultValues: initialData
      ? { ...initialData, endsAt: new Date(initialData.endsAt) }
      : {
          title: "",
          description: "",
          tags: [],
          media: [],
          endsAt: new Date(),
        },
  })

  async function onSubmit(formData: z.infer<typeof newListingSchema>) {
    setIspending(true)
    // Selects server action based on if initialData is provided
    const { data, success, error, source } = await (!initialData
      ? createListing(formData)
      : updateListing(formData, initialData.id))
    if (!success) {
      handleErrors<TYPE_CREATE_LISTING>(error, source, form)
    }
    if (success) {
      closeModal(false)
      toast.success(
        initialData ? "Listing updated successfully" : "New listing posted 🎉",
        {
          action: {
            label: "Go to",
            onClick: () => router.push(`/listing/${data.data.id}`),
          },
        },
      )
    }
    setIspending(false)
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
        <Stepper isPending={isPending} form={form}>
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
                {field.value?.length ? (
                  <FormDescription>
                    {field.value?.length ?? 0} / 280 characters
                  </FormDescription>
                ) : null}
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
                          ? tags.find(
                              (tag) =>
                                tag.value === field.value?.[0]?.toLowerCase(),
                            )?.label
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
                                  if (
                                    field.value?.[0]?.toLowerCase() ===
                                    tag.value
                                  ) {
                                    form.resetField("tags")
                                  } else {
                                    form.setValue("tags", [tag.label])
                                  }
                                }}
                              >
                                {tag.label}
                                <Check
                                  className={cn(
                                    "ml-auto",
                                    tag.value ===
                                      field.value?.[0]?.toLowerCase()
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
            <div ref={mediaRef} className="flex flex-wrap items-start gap-1">
              {gallery
                ? gallery.map((image, index) => (
                    <div
                      onClick={() => handleSetMainImage(image, index)}
                      className="relative"
                      key={image.url + index}
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
