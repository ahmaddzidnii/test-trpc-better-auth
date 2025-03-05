import { NextRequest, NextResponse } from "next/server";

import { getSessionCookie } from "better-auth/cookies";

type Auth = {
  isAuthenticated: boolean;
};

type MiddlewareCallback = (auth: Auth, req: NextRequest) => Promise<NextResponse<unknown>>;

export function authMiddleware(callback: MiddlewareCallback) {
  return async (req: NextRequest) => {
    const sessionCookie = getSessionCookie(req, {
      cookiePrefix: "myapp",
    });
    return callback(
      {
        isAuthenticated: !!sessionCookie,
      },
      req
    );
  };
}
