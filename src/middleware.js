import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;

  const publicRoutes = [
    "/",
    "/user/login",
    "/user/signup",
    "/user/forgot-password",
    "/user/forgot-password/enter-code",
    "/user/reset-password",
    "/user/reset-password/success",

    "/organizer/login",
    "/organizer/signup/category",
    "/organizer/signup/details",
    "/organizer/signup/account",
    "/organizer/signup/verify",
    "/organizer/forgot-password",
    "/organizer/forgot-password/enter-code",
    "/organizer/reset-password",
    "/organizer/reset-password/success",
  ];

  // Allow access if route is public
  if (publicRoutes.includes(path)) {
    return NextResponse.next();
  }


  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/organizer/:path*",
    "/dashboard/:path*",
  ],
};
