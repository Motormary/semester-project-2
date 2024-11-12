"use server"

import { z } from "zod"

const SignupFormSchema = z.object({
  name: z.string().min(3, { message: "Name must be minimum 3 characters" }),
  email: z.string().email(),
  password: z
    .string()
    .min(8, { message: "Password must be minimum 8 characters" }),
})

export async function signup(state: unknown, formData: FormData) {
  console.log(state)
  const validationResult = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  })

  if (!validationResult.success) {
    return {
      errors: validationResult.error.flatten().fieldErrors,
    }
  }

  console.log("🚀 ~ signup ~ validationResult:", validationResult)
}
