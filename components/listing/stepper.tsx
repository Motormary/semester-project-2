import { useEffect, useState } from "react"
import { Calendar, Check, ImagePlus, List } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogTrigger } from "@/components/ui/dialog"
import { DrawerFooter, DrawerTrigger } from "@/components/ui/drawer"

const steps = [
  { id: 1, title: "Step 1", description: "Enter details" },
  { id: 2, title: "Step 2", description: "Add media" },
  { id: 3, title: "Step 3", description: "Set date" },
]

type props = {
  children: React.ReactNode
  isDesktop: boolean
  form: any
}

export default function Stepper({ children, isDesktop, form }: props) {
  const [currentStep, setCurrentStep] = useState(1)

  const nextStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  useEffect(() => {
    const errors = Object.entries(form.formState.errors)
    if (errors?.length) {
      const errorKey = errors[0][0]
      if (errorKey === "title") setCurrentStep(1)
    }
  }, [form.formState.errors])

  return (
    <div
      className={`group mx-auto w-full max-w-3xl py-8 sm:px-4`}
      data-state={currentStep}
    >
      <div className="mb-8">
        <div className="flex justify-between">
          {steps.map((step) => (
            <div key={step.id} className="flex w-1/3 flex-col items-center">
              <div
                className={cn(
                  "flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold transition-all duration-300 ease-in-out",
                  currentStep >= step.id
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground",
                  currentStep === step.id && "scale-110",
                )}
              >
                {currentStep > step.id ? (
                  <Check className="h-5 w-5" />
                ) : step.id === 1 ? (
                  <List />
                ) : step.id === 2 ? (
                  <ImagePlus />
                ) : step.id === 3 ? (
                  <Calendar />
                ) : (
                  step.id
                )}
              </div>
              <div
                className={cn(
                  "mt-2 text-center transition-all duration-300 ease-in-out",
                  currentStep >= step.id ? "opacity-100" : "opacity-50",
                  currentStep === step.id && "-translate-y-1",
                )}
              >
                <div className="text-sm font-medium">{step.title}</div>
                <div className="text-xs text-muted-foreground">
                  {step.description}
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-4 h-2 overflow-hidden rounded-full bg-muted">
          <div
            className="h-full rounded-full bg-primary transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStep - 1) / (steps.length - 1)) * 100}%`,
            }}
          />
        </div>
      </div>
      <div className="space-y-6 pb-6">{children}</div>
      {isDesktop ? (
        <DialogFooter>
          <DialogTrigger asChild>
            <Button variant="outline">Close</Button>
          </DialogTrigger>
          <div className="flex w-full gap-4 md:justify-end">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="ghost"
            >
              Previous
            </Button>
            {currentStep !== steps.length ? (
              <Button
                variant="outline"
                onClick={nextStep}
                disabled={currentStep === steps.length}
              >
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </DialogFooter>
      ) : (
        <DrawerFooter className="px-0">
          <DrawerTrigger asChild>
            <Button className="mb-4" variant="outline">
              Close
            </Button>
          </DrawerTrigger>
          <div className="flex w-full flex-col gap-2">
            <Button
              onClick={prevStep}
              disabled={currentStep === 1}
              variant="outline"
            >
              Previous
            </Button>
            {currentStep !== steps.length ? (
              <Button
                variant="outline"
                onClick={nextStep}
                disabled={currentStep === steps.length}
              >
                Next
              </Button>
            ) : (
              <Button type="submit">Submit</Button>
            )}
          </div>
        </DrawerFooter>
      )}
    </div>
  )
}
