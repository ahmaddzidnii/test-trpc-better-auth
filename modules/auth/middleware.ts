import { betterFetch } from "@better-fetch/fetch";
import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";

import { auth } from "@/auth";

// type User = (typeof auth.$Infer.Session)["user"];
// type Session = typeof auth.$Infer.Session;
type Auth = {
  isAuthenticated: boolean;
  // user?: User;
};

type MiddlewareCallback = (auth: Auth, req: NextRequest) => Promise<NextResponse<unknown>>;

export function authMiddleware(callback: MiddlewareCallback) {
  return async (req: NextRequest) => {
    const sessionCookie = getSessionCookie(req, {
      cookiePrefix: "myapp",
    });

    // const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    //   baseURL: req.nextUrl.origin,
    //   headers: {
    //     cookie: req.headers.get("cookie") || "", // Forward the cookies from the request
    //   },
    // });

    return callback(
      {
        isAuthenticated: !!sessionCookie,
        // user: session?.user,
      },
      req
    );
  };
}
