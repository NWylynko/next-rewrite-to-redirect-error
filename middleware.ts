import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname === "/page-1") {
    return NextResponse.rewrite(new URL("/page-2", request.url));
  }
};

export const config = {
  matcher: "/:path*",
};
