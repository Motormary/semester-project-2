import { z } from "zod"

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
  endsAt: z.date({required_error: "A date and time is required."
  })
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

const profileSchema = z.object({
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
})

const errorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
  path: z.array(z.string()).optional(),
})

// Dynamic zod schema, takes a zod schema as params and uses it as the type for data.
const responseSchema = <T>(dataSchema: z.ZodType<T, any, any>) =>
  z.object({
    errors: z.array(errorSchema).optional(),
    status: z.string(),
    statusCode: z.number(),
    data: dataSchema,
    meta: metaSchema.optional(),
  })

const getProfileSchema = responseSchema(profileSchema)


/**
 *
 *
 * Undefined data type / takes a zod schema as <T> 
 * 
 * 
 * */
export type ResponseType<T> = z.infer<ReturnType<typeof responseSchema<T>>>
/**
 *
 * 
 *  Pre-defined types
 * 
 * 
 *  Profile
 * 
 * 
 * */
export type GETProfile = z.infer<typeof getProfileSchema>

export type UserProfile = z.infer<typeof profileSchema>
