// middleware.ts
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access")?.value
  const url = req.nextUrl.clone()

  // Define protected and admin-only routes
  const protectedRoutes = ["/dashboard", "/profile"]
  const adminRoutes = ["/admin"]

  // If accessing a protected route without a token → redirect
  if (protectedRoutes.some((path) => url.pathname.startsWith(path))) {
    if (!token) {
      url.pathname = "/auth/login"
      return NextResponse.redirect(url)
    }
  }

  // If accessing admin routes but not admin → redirect
  if (adminRoutes.some((path) => url.pathname.startsWith(path))) {
    const role = req.cookies.get("role")?.value
    if (role !== "admin") {
      url.pathname = "/"
      return NextResponse.redirect(url)
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
}
