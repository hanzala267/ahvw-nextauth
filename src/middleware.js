import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function middleware(req) {
  const token = await getToken({ req, secret });
  const { pathname } = req.nextUrl;

  if (!token) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  const role = token.role;

  if (pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith("/employee") && role !== "employee") {
    return NextResponse.redirect(new URL('/', req.url));
  }

  if (pathname.startsWith("/client") && role !== "customer") {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/employee/:path*',
    '/client/:path*',
  ],
};
