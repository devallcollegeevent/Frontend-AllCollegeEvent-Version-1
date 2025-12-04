import { NextResponse } from "next/server";

export function middleware(req) {
  const path = req.nextUrl.pathname;

  console.log("🔥 Middleware running for:", path);

  const token = req.cookies.get("token")?.value;
  const role = req.cookies.get("role")?.value;


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

  // =====================================
  // BLOCK IF NOT LOGGED IN
  // =====================================
  if (!token) {
    console.log("No token → redirect to /user/login");
    return NextResponse.redirect(new URL("/user/login", req.url));
  }

  // =====================================
  // USER PROTECTION
  // =====================================
  // if (role === "user") {
  //   if (!path.startsWith("/user")) {
  //     console.log("USER blocked from:", path);
  //     return NextResponse.redirect(new URL("/unauthorized", req.url));
  //   }
  // }

  // =====================================
  // ORGANIZER PROTECTION
  // =====================================
  // if (role === "organizer") {
  //   if (!path.startsWith("/organizer")) {
  //     console.log("ORGANIZER blocked from:", path);
  //     return NextResponse.redirect(new URL("/unauthorized", req.url));
  //   }
  // }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/user/:path*",
    "/organizer/:path*",
    "/dashboard/:path*",
  ],
};
