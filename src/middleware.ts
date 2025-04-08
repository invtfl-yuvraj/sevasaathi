import { NextRequest, NextResponse } from "next/server";
export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  const url = req.nextUrl;

  // Public paths that don't require authentication
  const publicPaths = ['/user/login', '/user/signup'];
  const isPublicPath = publicPaths.some(path => url.pathname === path);


  // If path is public and user has token, redirect to dashboard
  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/user/dashboard", req.url));
  }

  // If path is not public and user doesn't have token, redirect to login
  if (!isPublicPath && url.pathname.startsWith('/user') && !token) {
    return NextResponse.redirect(new URL("/user/login", req.url));
  }
  
  // Allow the request to proceed
  return NextResponse.next();
}

// // Matching Paths
// export const config = {
//   matcher: [
//     '/user/:path*',
//   ]
// }

export const config = {
  matcher: ["/user/:path*", "/user/login", "/user/signup", "/user/dashboard", "/order"],
};