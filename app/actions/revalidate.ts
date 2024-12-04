"use server"

import { revalidatePath, revalidateTag } from "next/cache"

export async function RevalidateCache(tag: string) {
  if (!tag) throw new Error("Error revalidating tag: Cache tag missing")
  console.log("🔥 ~ Revalidating cache tag:", tag)
  revalidateTag(tag)
}

export async function RevalidateCachedPath(path: string) {
  if (!path) throw new Error("Error revalidating path: Cached path missing")
  revalidatePath(path)
}
