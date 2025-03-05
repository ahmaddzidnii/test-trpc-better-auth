import { NextResponse } from "next/server";

import { authMiddleware } from "@/modules/auth/middleware";
import { createRouteMatcher } from "@/modules/auth/helpers/createRouteMatcher";

export default authMiddleware(async ({ isAuthenticated }, req) => {
  const isAuthRoutes = createRouteMatcher(["/auth(.*)"]);
  const isPublicRoutes = createRouteMatcher(["/auth(.*)", "/api/auth(.*)"]);

  if (!isAuthenticated && !isPublicRoutes(req)) {
    return NextResponse.redirect(new URL("/auth/login", req.nextUrl));
  }

  if (isAuthenticated && isAuthRoutes(req)) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
