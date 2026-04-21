import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const { nextUrl } = req
  const session = req.auth
  const role = (session?.user as any)?.role as string | undefined
  const pathname = nextUrl.pathname

  const isApiAuthRoute = pathname.startsWith("/api/auth")
  const isAuthRoute = ["/login"].includes(pathname)

  if (isApiAuthRoute) return NextResponse.next()

  // Not logged in
  if (!session) {
    if (isAuthRoute) return NextResponse.next()
    return NextResponse.redirect(new URL("/login", req.url))
  }

  // Already logged in - redirect away from login page to respective dashboards
  if (isAuthRoute) {
    if (role === "Admin") return NextResponse.redirect(new URL("/admin", req.url))
    if (role === "Doctor") return NextResponse.redirect(new URL("/doctor", req.url))
    if (role === "Patient") return NextResponse.redirect(new URL("/patient", req.url))
    return NextResponse.redirect(new URL("/", req.url))
  }

  // Role-based access protection for dashboard routes
  if (pathname.startsWith("/admin") && role !== "Admin") {
    if (role === "Doctor") return NextResponse.redirect(new URL("/doctor", req.url))
    if (role === "Patient") return NextResponse.redirect(new URL("/patient", req.url))
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (pathname.startsWith("/doctor") && role !== "Doctor") {
    if (role === "Admin") return NextResponse.redirect(new URL("/admin", req.url))
    if (role === "Patient") return NextResponse.redirect(new URL("/patient", req.url))
    return NextResponse.redirect(new URL("/login", req.url))
  }

  if (pathname.startsWith("/patient") && role !== "Patient") {
    if (role === "Admin") return NextResponse.redirect(new URL("/admin", req.url))
    if (role === "Doctor") return NextResponse.redirect(new URL("/doctor", req.url))
    return NextResponse.redirect(new URL("/login", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
