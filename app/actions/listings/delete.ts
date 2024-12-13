"use server"

import { API_AH_LISTINGS } from "@/lib/constants"
import { CacheTags, Method, TYPE_DELETE_LISTING, TYPE_USER_BID } from "@/lib/definitions"
import { verifySession } from "@/lib/session"
import { failedToVerify } from "@/lib/utils"
import { revalidateTag } from "next/cache"
import superFetch from "../fetch"
import { redirect } from "next/navigation"

type props = {
  id: string
  seller: string
  bids: TYPE_USER_BID[]
}

export default async function deleteListing({ id, seller, bids }: props) {
  const session = await verifySession()
  if (!session.accessToken) return failedToVerify()
  if (seller !== session.user) {
    throw new Error(
      `Unauthorized request: ${session.user} tried to delete the listing '${id}' of ${seller}`,
    )
  }

  const res = await superFetch<TYPE_DELETE_LISTING>({
    method: Method.DELETE,
    url: API_AH_LISTINGS + `/${id}`,
    token: session.accessToken,
  })

  if (!res.success) {
    console.error("⚡ deleteListing ~ Error deleting listing:", res)
    return res
  }

  revalidateTag(CacheTags.ALL_LISTINGS)
  revalidateTag(CacheTags.USER_LISTINGS + session.user)
  revalidateTag(CacheTags.LISTING + id)
  bids.forEach((bid) => revalidateTag(CacheTags.USER_BIDS + bid.bidder.name))
  redirect("/")
}
