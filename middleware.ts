import { NextRequest, NextResponse } from "next/server"
import { cookies } from "next/headers"
import { decrypt } from "./lib/session"

// Nextjs docs

const publicRoutes = ["/login", "/register", "/"]

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isPublicRoute = publicRoutes.includes(path)
  const hasSession = (await cookies()).has("_ebox_session")

  if (!isPublicRoute) {
    if (!hasSession) {
      return NextResponse.redirect(new URL("/login", req.nextUrl))
    }
    const cookie = (await cookies()).get("_ebox_session")?.value
    const session = await decrypt(cookie)
    if (!session?.accessToken)
      return NextResponse.redirect(new URL("/login", req.nextUrl))
  }

  return NextResponse.next()
}

// Routes Middleware should not run on
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
