import { auth } from "@/lib/auth"

export default auth((req) => {
  const isLoggedIn = !!req.auth

  const protectedRoutes = ["/settings"]

  if (!isLoggedIn && protectedRoutes.includes(req.nextUrl.pathname)) {
    const redirectUrl = new URL(
      `/auth/login?callbackUrl=${encodeURIComponent(req.nextUrl.pathname)}`,
      req.nextUrl,
    )
    return Response.redirect(redirectUrl)
  }
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
