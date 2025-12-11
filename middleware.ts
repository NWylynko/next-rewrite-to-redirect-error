import { NextFetchEvent, NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { clerkMiddleware } from "@clerk/nextjs/server";
import { precompute } from "flags/next";
import { myRandomFlag } from "./flags";

function getCookieDomain(request: NextRequest) {
  let domain = request.nextUrl.hostname.split(".").slice(-2).join(".");
  return domain === "localhost" ? "localhost" : `.${domain}`;
}

const ONE_YEAR = 60 * 60 * 24 * 365;

export const middleware = (request: NextRequest, event: NextFetchEvent) => {
  return clerkMiddleware(async (auth, request, event) => {
    if (
      (request.method === "GET" || request.method === "HEAD") &&
      request.nextUrl.pathname.startsWith("/docs")
    ) {
      const [, , ...slug] = request.nextUrl.pathname.split("/");

      const code = await precompute([myRandomFlag]);

      const rewriteUrl = request.nextUrl.clone();
      rewriteUrl.pathname = `/docs/${code}/${slug.join("/")}`;

      const response = NextResponse.rewrite(new URL(rewriteUrl, request.url));

      response.cookies.set("my-cookie", "my-cookie-value", {
        maxAge: ONE_YEAR,
        domain: getCookieDomain(request),
        path: "/",
        sameSite: "lax",
      });
      response.headers.set("my-header", "my-header-value");

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
