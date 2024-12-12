"use client"
import createUser from "@/app/actions/user/create"
import { RegisterUserSchema, TYPE_USER_REGISTER } from "@/lib/definitions"
import { zodResolver } from "@hookform/resolvers/zod"
import logo from "public/logo_filled_white.png"
import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { Button } from "../../ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../ui/card"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../ui/form"
import { Input } from "../../ui/input"
import { useRouter } from "next/navigation"
import { handleErrors } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { useState } from "react"
import { RefreshCw } from "lucide-react"

type props = {
  className?: string
  closeModal?: (state: boolean) => void
}

export default function RegisterCard({ className, closeModal }: props) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const form = useForm<TYPE_USER_REGISTER>({
    resolver: zodResolver(RegisterUserSchema),
    defaultValues: {
      name: "",
      avatar: {
        url: "",
        alt: "",
      },
      email: "",
      password: "",
      confirm: "",
    },
  })

  async function onSubmit(formData: z.infer<typeof RegisterUserSchema>) {
    setIsPending(true)
    const { error, source, success } = await createUser(formData)
    setIsPending(false)

    if (!success) handleErrors<TYPE_USER_REGISTER>(error, source, form)
    if (success) {
      if (closeModal) {
        closeModal(false)
      } else router.push("/")
    }
  }

  return (
    <Card
      className={cn(
        className ??
          "mx-auto flex flex-col justify-center bg-card/70 backdrop-blur-sm sm:w-1/2 lg:w-1/3",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-4">
          <h1>Register</h1>
          <Image
            loading="eager"
            src={logo}
            alt="Logo"
            height="50"
            className="invert dark:invert-0"
          />
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form className="w-full" onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Kari Traa" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="avatar.url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Avatar URL</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="karitraa@stud.noroff.no" {...field} />
                  </FormControl>
                  <FormDescription className="text-xs">
                    Email is case sensitive
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button disabled={isPending} className="flex w-full" type="submit">
              {isPending ? (
                <RefreshCw className="size-5 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
            <CardDescription>
              Not registered yet?{" "}
              <Link className="font-semibold hover:text-primary" href="/login">
                Sign in!
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
