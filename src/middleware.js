// import { NextResponse } from "next/server";
// import { jwtVerify } from "jose";

// const JWT_SECRET = '123456789';

// export async function middleware(req) {
//   try {
//     const token = req.cookies.get("UPTO_AUTH_TOKEN").value;
//     const isSignInPage = req.nextUrl.pathname === "/signIn";
//     const Homepage = req.nextUrl.pathname === "/";

//     if (!token) {
//       if (isSignInPage) {
//         return NextResponse.next();
//       }
//       return NextResponse.redirect(new URL("/signIn", req.url));
//     }
//     const decoded = await jwtVerify(
//       token,
//       new TextEncoder().encode(JWT_SECRET)
//     );
//     if (!decoded) {
//       return NextResponse.redirect(new URL("/signIn", req.url));
//     }
//     if (Homepage) {
//       return NextResponse.redirect(new URL("/instagram", req.url));
//     }
//     return NextResponse.next();
//   } catch (error) {
//     console.error("Token verification error:", error);
//     return NextResponse.json(
//       { error: "Invalid or expired token" },
//       { status: 401 }
//     );
//   }
// }

// export const config = {
//   matcher: ["/", "/api/:path*"],
// };

import { NextResponse } from "next/server";

export function middleware(req) {
  const origin = req.headers.get("origin");
  const allowedOrigin = process.env.NODE_ENV === 'development'
    ? "http://localhost:5173" // your Vite dev frontend
    : "https://uptoco.netlify.app"; // set to your real frontend domain

  const res = NextResponse.next();

  // Allow only your frontend
  if (origin === allowedOrigin) {
    res.headers.set("Access-Control-Allow-Origin", origin);
  }

  res.headers.set("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS,PATCH");
  res.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.headers.set("Access-Control-Allow-Credentials", "true"); // allow cookies

  // Handle preflight (OPTIONS)
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": origin === allowedOrigin ? origin : "",
        "Access-Control-Allow-Methods": "GET,POST,PUT,DELETE,OPTIONS,PATCH",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
        "Access-Control-Allow-Credentials": "true",
      },
    });
  }

  return res;
}

export const config = {
  matcher: ["/api/:path*"],
};
