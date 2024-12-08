"use client"
import { loginUser } from "@/app/actions/user/login"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
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
import { LoginUserSchema, TYPE_USER_LOGIN } from "@/lib/definitions"
import { handleErrors } from "@/lib/handle-errors"
import { cn } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import logo from "assets/images/logo_filled.png"
import { RefreshCw } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"

type props = {
  className?: string
  closeModal?: (state: boolean) => void
}

export default function LoginCard({ className, closeModal }: props) {
  const [isPending, setIsPending] = useState(false)
  const router = useRouter()
  const form = useForm<TYPE_USER_LOGIN>({
    resolver: zodResolver(LoginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  async function onSubmit(formData: TYPE_USER_LOGIN) {
    setIsPending(true)
    const { success, source, error } = await loginUser(formData)
    setIsPending(false)

    if (!success) {
      handleErrors<TYPE_USER_LOGIN>(error, source, form)
    }
    if (success) {
      if (closeModal) {
        closeModal(false)
      } else router.push("/")
    }
  }

  // TODO: UPDATE CARD TO TAKE CLASSNAME
  return (
    <Card
      className={cn(
        className ??
          "mx-auto flex flex-col justify-center bg-card/70 backdrop-blur-sm sm:w-1/2 lg:w-1/3",
      )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-4">
          <h1>Log in</h1>{" "}
          <Image src={logo} alt="Logo" height="50" className="dark:invert" />
        </CardTitle>
      </CardHeader>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <CardContent className="space-y-4">
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
          </CardContent>
          <CardFooter className="flex flex-col gap-4">
            <Button className="flex w-full" type="submit">
              {isPending ? (
                <RefreshCw className="size-5 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
            <CardDescription>
              Not registered yet?{" "}
              <Link
                className="font-semibold hover:text-primary"
                href="/register"
              >
                Sign up!
              </Link>
            </CardDescription>
          </CardFooter>
        </form>
      </Form>
    </Card>
  )
}
