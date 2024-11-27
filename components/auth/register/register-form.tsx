"use client"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
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
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import Image from "next/image"
import logo from "assets/images/logo_filled.png"
import Link from "next/link"

const FormSchema = z
  .object({
    name: z
      .string()
      .min(2, {
        message: "Name must be at least 2 characters.",
      })
      .max(20, {
        message: "Name cannot contain more than 20 characters.",
      }),
    avatar: z.object({
      url: z.string(),
      alt: z.string().optional(),
    }),
    email: z
      .string()
      .refine(
        (val) => val.includes("@stud.noroff.no") || val.includes("@noroff.no"),
        {
          message: "Email must be a valid Noroff email.",
        },
      ),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
    confirm: z.string().min(8, {
      message: "Password must be at least 8 characters.",
    }),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords must match.",
    path: ["confirm"],
  })

export default function RegisterCard() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
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

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    if (data) {
      form.reset()
      toast.success("Welcome! 🎉", {
        description: (
          <span>
            You&apos;ve been successfully registered as{" "}
            <strong>{data.name}</strong>!
          </span>
        ),
      })
    } else {
      //   handleApiErrors(response.data, form)
    }
  }

  return (
    <Card className="mx-auto flex flex-col justify-center sm:w-1/2 lg:w-1/3">
      <CardHeader>
        <CardTitle className="flex items-center gap-4 justify-center">
          <h1>Register</h1>
          <Image
            src={logo}
            alt="Logo"
            height="50"
            className="place-self-center dark:invert"
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
            <Button className="flex w-full" type="submit">
              Submit
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
