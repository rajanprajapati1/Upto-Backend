import { NextResponse } from "next/server";
import { JWT_SECRET } from "./app/(auth)/api/signIn/route";
import { jwtVerify } from "jose";

export async function middleware(req) {
  try {
    const token = req.cookies.get(process.env.COOKIE_NAME)?.value;
    const isSignInPage = req.nextUrl.pathname === "/signIn";
    const Homepage = req.nextUrl.pathname === "/";

    if (!token) {
      if (isSignInPage) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/signIn", req.url));
    }
    const decoded = await jwtVerify(
      token,
      new TextEncoder().encode(JWT_SECRET)
    );
    if (!decoded) {
      return NextResponse.redirect(new URL("/signIn", req.url));
    }
    if (Homepage) {
      return NextResponse.redirect(new URL("/instagram", req.url));
    }
    return NextResponse.next();
  } catch (error) {
    console.error("Token verification error:", error);
    return NextResponse.json(
      { error: "Invalid or expired token" },
      { status: 401 }
    );
  }
}

export const config = {
  matcher: ["/", "/api/:path*"],
};