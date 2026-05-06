import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const auth = request.headers.get("authorization");

  if (auth?.startsWith("Basic ")) {
    const credentials = atob(auth.slice(6));
    const colonIndex = credentials.indexOf(":");
    const user = credentials.slice(0, colonIndex);
    const password = credentials.slice(colonIndex + 1);

    if (
      user === process.env.ADMIN_USER &&
      password === process.env.ADMIN_PASSWORD
    ) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Acesso restrito.", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="San Remo Admin"',
    },
  });
}

export const config = {
  matcher: ["/admin/:path*", "/studio/:path*", "/studio"],
};
