import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function proxy(request: NextRequest) {
  const protectedRoutes = [
    "/cart",
    "/profile",
    "/profile/my-addresses",
    "/profile/settings",
    "/checkout",
    "/allorders",
  ];
  const authRoutes = ["/login", "/register"];

  const myPath = request.nextUrl.pathname;
  const MyToken = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
    secureCookie: process.env.NODE_ENV === "production",
  });
  const token = MyToken?.usetoken;

  if (!token && protectedRoutes.some((path) => myPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (token && authRoutes.some((path) => myPath.startsWith(path))) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/cart",
    "/login",
    "/register",
    "/profile",
    "/profile/my-addresses",
    "/profile/settings",
    "/checkout",
    "/allorders",
  ],
};
