import { NextFetchEvent, NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";

export const middleware = (request: NextRequest, event: NextFetchEvent) => {
  return clerkMiddleware(async (auth, request, event) => {
    if (
      (request.method === "GET" || request.method === "HEAD") &&
      request.nextUrl.pathname.startsWith("/docs")
    ) {
      const [, , ...slug] = request.nextUrl.pathname.split("/");

      const dynamic = Math.random() > 0.5 ? "cats" : "dogs";

      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = `/docs/${dynamic}/${slug.join("/")}`;

      const response = NextResponse.rewrite(new URL(rewriteUrl, request.url));

      response.cookies.set("my-cookie", "my-cookie-value");

      return response;
    }
  })(request, event);
};

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
