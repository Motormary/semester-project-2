import "server-only"

import { CacheOptions, ErrorSource, Method } from "@/lib/definitions"

/**
 * A helper function for making server-side API calls with headers, token handling,
 * and cache configuration options. Throws an error for missing parameters or failed requests.
 *
 * @param method - HTTP method to use for the request (GET, POST, etc.)
 * @param path - API endpoint path to request
 * @param body - Optional request body to send with POST/PUT requests
 * @param cache - Flag to enable caching (default: no-store)
 * @param revalidate - Optional number of seconds to revalidate the cache
 * @param tags - Optional array of cache tags for targeted invalidation
 *
 */
export default async function superFetch<T>({
  method,
  url,
  body,
  token,
  cache = CacheOptions.NoStore,
  revalidate,
  tags,
}: {
  method: Method
  url: string
  token?: string
  body?: any
  cache?: CacheOptions
  revalidate?: number
  tags?: string[]
}): Promise<T> {
  if (!method || !url) throw new Error("Missing params")
  const headers = new Headers()

  // Check for token cookie
  if (token) {
    // Add accessToken to headers from cookies
    headers.append("Authorization", `Bearer ${token}`)
    headers.append("X-Noroff-API-Key", process.env.API_KEY as string)
  }

  /* Initial a next request */
  const requestOptions: RequestInit = {
    method: method,
    headers,
    cache: !revalidate ? cache : undefined, // cache can't be set with revalidate
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

  // Here we avoid the try/catch pit of despair
  const response = await fetch(url, requestOptions)
    .then((res) => ({ data: res, success: true }))
    .catch((error) => ({ data: error, success: false }))

  /**
   * Pass a source we can check
   * if ErrorSource.CAUGHT return a string to the error field. Console.error this and show the user a generic error message instead
   */
  if (!response.success) {
    return {
      success: false,
      source: ErrorSource.CAUGHT,
      data: null as null,
      error: response.data.message,
    } as T
  }

  const data = response.data.status !== 204 ? await response.data.json() : null // 204 = no content

  //* If ErrorSource.API set error as errors[] from backend
  if (response.success && !response.data.ok) {
    return {
      success: false,
      source: ErrorSource.API,
      data,
      error: data.errors,
    } as T
  }

  return {
    success: true,
    source: null,
    data,
    error: null,
  } as T
}
