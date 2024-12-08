"use client"

/* Time picker functionality created by https://rdsx.dev/ - modified by me */

import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { UseFormReturn } from "react-hook-form"

type props = {
  form: UseFormReturn<any>
  initialData?: boolean
}

export function DateTimePicker24hForm({ form, initialData }: props) {
  function handleDateSelect(date: Date | undefined) {
    if (date) {
      form.setValue("endsAt", date)
    }
  }

  function handleTimeChange(type: "hour" | "minute", value: string) {
    const currentDate = form.getValues("endsAt") || new Date()
    const newDate = new Date(currentDate)

    if (type === "hour") {
      const hour = parseInt(value, 10)
      newDate.setHours(hour)
    } else if (type === "minute") {
      newDate.setMinutes(parseInt(value, 10))
    }

    form.setValue("endsAt", newDate)
  }

  return (
    <FormField
      control={form.control}
      name="endsAt"
      render={({ field }) => (
        <FormItem className="hidden flex-col group-data-[state=3]:flex sm:p-4">
          <FormLabel className="text-center font-semibold">
            {initialData
              ? "Closing date cannot be altered"
              : "Specify Auction Closing Time"}
            <span className="text-destructive"> *</span>
          </FormLabel>
          <FormControl>
            <div className="mx-auto justify-center sm:flex">
              <Calendar
                disabled={initialData}
                mode="single"
                selected={field.value}
                onSelect={handleDateSelect}
                initialFocus
              />
              <div className="flex flex-col divide-y sm:h-[300px] sm:flex-row sm:divide-x sm:divide-y-0">
                <ScrollArea className="w-64 sm:w-auto">
                  <div className="flex p-2 sm:flex-col">
                    {Array.from({ length: 24 }, (_, i) => i)
                      .reverse()
                      .map((hour) => (
                        <Button
                          disabled={initialData}
                          key={hour}
                          size="icon"
                          variant={
                            field.value && field.value.getHours() === hour
                              ? "default"
                              : "ghost"
                          }
                          className="aspect-square shrink-0 sm:w-full"
                          onClick={(e) => {
                            e.preventDefault()
                            handleTimeChange("hour", hour.toString())
                          }}
                        >
                          {hour}
                        </Button>
                      ))}
                  </div>
                  <ScrollBar orientation="horizontal" className="sm:hidden" />
                </ScrollArea>
                <ScrollArea className="w-64 sm:w-auto">
                  <div className="flex p-2 sm:flex-col">
                    {Array.from({ length: 12 }, (_, i) => i * 5).map(
                      (minute) => (
                        <Button
                          disabled={initialData}
                          key={minute}
                          size="icon"
                          variant={
                            field.value && field.value.getMinutes() === minute
                              ? "default"
                              : "ghost"
                          }
                          className="aspect-square shrink-0 sm:w-full"
                          onClick={(e) => {
                            e.preventDefault()
                            handleTimeChange("minute", minute.toString())
                          }}
                        >
                          {minute.toString().padStart(2, "0")}
                        </Button>
                      ),
                    )}
                  </div>
                  <ScrollBar orientation="horizontal" className="sm:hidden" />
                </ScrollArea>
              </div>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
