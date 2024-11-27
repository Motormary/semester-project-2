import "server-only"

import { cookies } from "next/headers"

export enum CacheOptions {
  NoStore = "no-store",
  ForceCache = "force-cache",
}

/**
 * A helper function for making server-side API calls with headers, token handling,
 * and cache configuration options. Throws an error for missing parameters or failed requests.
 *
 * @param method - HTTP method to use for the request (GET, POST, etc.)
 * @param path - API endpoint path to request
 * @param body - Optional request body to send with POST/PUT requests
 * @param disableCache - Flag to disable caching (default: true)
 * @param revalidate - Optional number of seconds to revalidate the cache
 * @param tags - Optional array of cache tags for targeted invalidation
 *
 */
export default async function superFetch({
  method,
  url,
  body,
  cache = CacheOptions.NoStore,
  revalidate,
  tags,
}: {
  method: string
  url: string
  body?: any
  cache?: CacheOptions
  revalidate?: number
  tags?: string[]
}) {
  if (!method || !url) throw new Error("Missing params")
  const cookie = await cookies()
  const headers = new Headers()

  // Check for token cookie
  const hasToken = cookie.has("token")
  if (hasToken) {
    // Add accessToken to headers from cookies
    const token = cookie.get("token")
    headers.append("Authorization", `Bearer ${token?.value as string}`)
    headers.append("X-Noroff-API-Key", process.env.API_KEY as string)
  }

  /* Initial a next request */
  const requestOptions: RequestInit = {
    method: method,
    headers,
    cache: !revalidate ? cache : undefined,
    next: {
      revalidate: revalidate, // Time to revalidate fetch request - SECONDS (3600 = 1 hour)
      tags: tags, // Add tags to the fetch request for targeted invalidation
    },
  }

  /* If there is a body, add it to the request */
  if (body) {
    headers.append("Content-Type", "application/json")
    requestOptions.body = JSON.stringify(body)
  }

  return fetch(url, requestOptions)
    .then((response) => ({ data: response, error: null }))
    .catch((error) => ({ data: null, error }))
}
