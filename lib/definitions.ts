import { z } from "zod"

export enum CacheOptions {
  NoStore = "no-store",
  ForceCache = "force-cache",
  NoCache = "no-cache",
  Default = "default",
}

/**
 * @description Cache tags for fetching data -
 * Add {+ username} to USER members of enum
 */
export enum CacheTags {
  ALL_LISTINGS = "listings",
  LISTING = "listing-id-", //! + listing uuid
  USER = "user-", //! + username
  USER_LISTINGS = "user-listings-", //! + username
  USER_BIDS = "user-bids-", //! + username
  USER_WINS = "user-wins-", //! + username
}

export enum ErrorSource {
  CAUGHT = "caught", // Error is unkown - Error will be a string
  API = "api", // Error from BE - typeof errorSchema
  SESSION = "session", // failed to verify auth - Error will be a string
}

export enum Method {
  POST = "POST",
  DELETE = "DELETE",
  PATCH = "PATCH",
  PUT = "PUT",
  GET = "GET",
}

export type SearchParams = Promise<{
  [key: string]: string | string[] | undefined
}>

export const mediaSchema = z.object({
  url: z.string().url({ message: "Must be a valid URL" }),
  alt: z.string(),
})

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  bio: z.string(),
  avatar: mediaSchema,
  banner: mediaSchema,
})

export const BidSchema = z.object({
  id: z.string(),
  amount: z.number(),
  bidder: z.object({
    name: z.string(),
    email: z.string().email(),
    bio: z.string(),
    avatar: mediaSchema,
    banner: mediaSchema,
  }),
  created: z.date()
})


const listingSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  media: z.array(mediaSchema),
  tags: z.array(z.string()),
  created: z.date(),
  updated: z.date(),
  endsAt: z.date(),
  _count: z.object({
    bids: z.number().int().nonnegative(),
  }),
  seller: userSchema,
  bids: z.array(BidSchema),
  })

const multipleListingSchema = z.array(listingSchema)

export const newListingSchema = z.object({
  title: z.string().min(4, { message: "Minimum 4 characters required" }),
  description: z
    .string()
    .max(280, { message: "Maximum 280 characters" })
    .optional(),
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


const BidsSchema = z.array(
  z.object({
    id: z.string(),
    amount: z.number(),
    bidder: z.object({
      name: z.string(),
      email: z.string().email(),
      bio: z.string(),
      avatar: mediaSchema,
      banner: mediaSchema,
    }),
    created: z.date(),
    listing: z.object({
      id: z.string(),
      title: z.string(),
      description: z.string(),
      media: z.array(mediaSchema),
      tags: z.array(z.string()),
      created: z.date(),
      updated: z.date(),
      endsAt: z.date(),
    }),
  }),
)

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
      })
      .regex(/^[a-zA-Z0-9_]+$/, {
        message:
          "Name can only contain letters (a-Z), numbers (0-9), and underscores (_).",
      }),
    bio: z.string().optional(),
    avatar: z.object({
      url: z.string(),
      alt: z.string().optional(),
    }),
    email: z.string().endsWith("@stud.noroff.no", {
      message: "Email must be a valid Noroff email",
    }),
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

export const EditUserSchema = z.object({
  bio: z
    .string()
    .max(160, { message: "Bio cannot be greater than 160 characters" })
    .optional(),
  avatar: z.object({
    url: z.string(),
    alt: z.string().optional(),
  }),
})

export const LoginUserSchema = z.object({
  email: z.string().endsWith("@stud.noroff.no", {
    message: "Email must be a valid Noroff email",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
})
// ----------------------------

const errorSchema = z.object({
  code: z.string().optional(),
  message: z.string(),
  path: z.array(z.string()).optional(),
})

// Generic zod schema, takes a zod schema as params and uses it as the TYPE for "data" in the response object.
const responseSchema = <T>(dataSchema: z.ZodType<T>) =>
  z.object({
    success: z.boolean(),
    source: z.enum([ErrorSource.CAUGHT, ErrorSource.API, ErrorSource.SESSION]),
    data: z.object({
      errors: z.array(errorSchema).optional(),
      status: z.string(),
      statusCode: z.number(),
      data: dataSchema,
      meta: metaSchema,
    }),
    error: z.string().or(z.array(errorSchema)),
  })

const getProfileSchema = responseSchema(ProfileSchema)
const getUserBidsSchema = responseSchema(BidsSchema)
const getListingsSchema = responseSchema(multipleListingSchema)
const getListingSchema = responseSchema(listingSchema)
const deleteListingSchema = responseSchema(null as any)

// Misc
export type TYPE_API_ERROR = z.infer<typeof errorSchema>

export type TYPE_META = z.infer<typeof metaSchema>

// Flat user types
export type TYPE_USER = z.infer<typeof ProfileSchema>

export type TYPE_USER_REGISTER = z.infer<typeof RegisterUserSchema>

export type TYPE_USER_LOGIN = z.infer<typeof LoginUserSchema>

export type TYPE_USER_EDIT = z.infer<typeof EditUserSchema>

export type TYPE_USER_BID = z.infer<typeof BidSchema>

export type TYPE_USER_BIDS = z.infer<typeof BidsSchema>

// User request types
export type TYPE_GET_USER_BIDS = z.infer<typeof getUserBidsSchema>

export type TYPE_GET_USER = z.infer<typeof getProfileSchema>

// flat listings types
export type TYPE_LISTING = z.infer<typeof listingSchema>

export type TYPE_CREATE_LISTING = z.infer<typeof newListingSchema>

// Listing requests
export type TYPE_GET_LISTING = z.infer<typeof getListingSchema>

export type TYPE_GET_LISTINGS = z.infer<typeof getListingsSchema>

export type TYPE_DELETE_LISTING = z.infer<typeof deleteListingSchema>