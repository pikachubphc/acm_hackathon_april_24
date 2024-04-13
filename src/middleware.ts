import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (request.nextUrl.pathname.startsWith("/api/auth")) {
    return NextResponse.next();
  }

  if (
    url.pathname === "/" ||
    (url.pathname === "/site" && url.host === process.env.NEXT_PUBLIC_DOMAIN)
  ) {
    return NextResponse.rewrite(new URL("/site", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
