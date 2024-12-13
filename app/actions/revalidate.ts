"use server"

import { revalidatePath, revalidateTag } from "next/cache"

// Client callable revalidation
export async function RevalidateCache(tag: string) {
  if (!tag) throw new Error("Error revalidating tag: Cache tag missing")
  revalidateTag(tag)
}

export async function RevalidateCachedPath(path: string) {
  if (!path) throw new Error("Error revalidating path: Cached path missing")
  revalidatePath(path)
}
