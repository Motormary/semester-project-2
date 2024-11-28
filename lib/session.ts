import "server-only"
import { SignJWT, jwtVerify } from "jose"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { cache } from "react"

// NEXTJS DOCS

const secretKey = process.env.API_KEY
const encodedKey = new TextEncoder().encode(secretKey)
const cookie = {
  name: "_ebox_session",
  duration: 24 * 60 * 60 * 1000,
}

export async function encrypt(payload: { accessToken: string; expires: Date }) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey)
}

export async function decrypt(session: string | undefined = "") {
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    })
    return payload
  } catch (error) {
    console.log("Failed to verify session")
  }
}

export async function createSession(data: {
  accessToken: string
  username: string
}) {
  const expires = new Date(Date.now() + cookie.duration)
  const session = await encrypt({ ...data, expires })
  const cookieStore = await cookies()

  cookieStore.set(cookie.name, session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires,
  })
  redirect(`/vendors/${data.username}`)
}

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value
  const session = await decrypt(cookie)

  if (!session?.accessToken) {
    redirect("/login")
  }

  return {
    isAuth: true,
    accessToken: session.accessToken as string,
    user: session.username as string,
  }
})

export async function updateSession() {
  const session = (await cookies()).get("session")?.value
  const payload = await decrypt(session)
  const cookieStore = await cookies()

  if (!session || !payload) {
    return null
  }

  const expires = new Date(Date.now() + cookie.duration)
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: true,
    expires: expires,
    sameSite: "lax",
    path: "/",
  })
}

export async function deleteSession() {
  ;(await cookies()).delete("session")
  redirect("/")
}
