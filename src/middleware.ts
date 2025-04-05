import { NextRequest, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/user/login") ||
      url.pathname.startsWith("/user/signup"))
  ) {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  if (!token && url.pathname.startsWith("/user")) {
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  return NextResponse.redirect(new URL("/user/login", req.url));
}

export const config = {
  matcher: ["/user/:path*", "/user/login", "/user/signup", "/user/dashboard", "/order"],
};