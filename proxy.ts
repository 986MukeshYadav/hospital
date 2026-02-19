import { auth } from "@/lib/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
    const { nextUrl } = req
    const isLoggedIn = !!req.auth
    const userRole = (req.auth?.user as any)?.role

    const isApiAuthRoute = nextUrl.pathname.startsWith("/api/auth")
    const isAuthRoute = ["/login"].includes(nextUrl.pathname)

    if (isApiAuthRoute) return NextResponse.next()

    if (isAuthRoute) {
        if (isLoggedIn) {
            // Redirect to respective dashboard if already logged in
            if (userRole === "Admin") return NextResponse.redirect(new URL("/admin", nextUrl))
            if (userRole === "Doctor") return NextResponse.redirect(new URL("/doctor", nextUrl))
            if (userRole === "Patient") return NextResponse.redirect(new URL("/patient", nextUrl))
            return NextResponse.redirect(new URL("/dashboard", nextUrl))
        }
        return NextResponse.next()
    }

    if (!isLoggedIn) {
        return NextResponse.redirect(new URL("/login", nextUrl))
    }

    return NextResponse.next()
})

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
