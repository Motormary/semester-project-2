import { z } from "zod"

export enum CacheOptions {
  NoStore = "no-store",
  ForceCache = "force-cache",
}

export enum ErrorType {
  CAUGHT = "caught",
  API = "api",
}

export enum Method {
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
  PUT = "PUT",
  GET = "GET",
}

const mediaSchema = z.object({
  url: z.string().url(),
  alt: z.string(),
})

const listingSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  media: z.array(mediaSchema),
  tags: z.array(z.string()),
  created: z.string().datetime(),
  updated: z.string().datetime(),
  endsAt: z.string().datetime(),
  _count: z.object({
    bids: z.number().int().nonnegative(),
  }),
})

export const newListingSchema = z.object({
  title: z.string().min(4, { message: "Minimum 4 characters required" }),
  description: z.string().optional(),
  media: z.array(mediaSchema).optional(),
  tags: z.array(z.string()).optional(),
  endsAt: z.date({ required_error: "A date and time is required." }),
})

const metaSchema = z.object({
  isFirstPage: z.boolean(),
  isLastPage: z.boolean(),
  currentPage: z.number().int().nonnegative(),
  previousPage: z.number().int().nullable(),
  nextPage: z.number().int().nullable(),
  pageCount: z.number().int().nonnegative(),
  totalCount: z.number().int().nonnegative(),
})

/**
 * User schemas
 */
const ProfileSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  bio: z.string(),
  avatar: mediaSchema,
  banner: mediaSchema,
  credits: z.number(),
  listings: z.array(listingSchema),
  wins: z.array(listingSchema),
  _count: z.object({
    listings: z.number(),
    wins: z.number(),
  }),
  accessToken: z.string().optional(),
})

// Export it for the zodresolver in the register-form
export const RegisterUserSchema = z
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

export const LoginUserSchema = z.object({
  email: z
    .string()
    .refine(
      (val) => val.includes("@stud.noroff.no") || val.includes("@noroff.no"),
      {
        message: "Email must be a valid Noroff email",
      },
    ),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})
// ----------------------------

/**
 *
 */

const errorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
  path: z.array(z.string()).optional(),
})

// Dynamic zod schema, takes a zod schema as params and uses it as the type for data in the response object.
const responseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    source: z.enum([ErrorType.API, ErrorType.CAUGHT]).nullish(),
    data: z.object({
      errors: z.array(errorSchema).optional(),
      status: z.string(),
      statusCode: z.number(),
      data: dataSchema,
      meta: metaSchema.optional(),
    }),
  })

const getProfileSchema = responseSchema(ProfileSchema)

// Flat user types
export type TYPE_USER = z.infer<typeof ProfileSchema>

export type TYPE_USER_REGISTER = z.infer<typeof RegisterUserSchema>

export type TYPE_USER_LOGIN = z.infer<typeof LoginUserSchema>

// User request types
export type TYPE_GET_USER = z.infer<typeof getProfileSchema>
