import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!token || token.role !== "admin") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (pathname.startsWith("/employee")) {
    if (!token || token.role !== "employee") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  } else if (pathname.startsWith("/cleint")) {
    if (!token || token.role !== "customer") {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/employee/:path*", "/client/:path*"],
};
