"use client"

import getListing from "@/app/actions/listings/get"
import { useEffect } from "react"

/**
 * 
 * @param {id}
 * @description Set metaData on client side since we need auth to GET listings
 */
export default function ClientMetadata({ id }: { id: string }) {
  useEffect(() => {
    if (!id) return
    async function fetchDataAndUpdateMetadata() {
      const { data, success } = await getListing(id)

      if (!success) return

      if (data) {
        document.title = `${data.data.title} | Listing`
        const metaDescription = document.querySelector(
          'meta[name="description"]',
        )
        if (metaDescription) {
          metaDescription.setAttribute("content", data.data.description)
        }
      }
    }

    fetchDataAndUpdateMetadata()
  }, [id])

  return null
}
