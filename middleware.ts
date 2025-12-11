import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const middleware = (request: NextRequest) => {
  if (request.nextUrl.pathname.startsWith("/docs")) {
    const [, , ...slug] = request.nextUrl.pathname.split("/");

    const dynamic = Math.random() > 0.5 ? "cats" : "dogs";

    return NextResponse.rewrite(
      new URL(`/docs/${dynamic}/${slug.join("/")}`, request.url)
    );
  }
};

export const config = {
  matcher: "/:path*",
};
