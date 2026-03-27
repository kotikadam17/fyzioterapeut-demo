import { type NextRequest, NextResponse } from "next/server";
import { createAdminToken } from "@/lib/adminToken";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const cookie = request.cookies.get("admin_auth")?.value;
    const correct = process.env.ADMIN_PASSWORD;

    if (!correct || !cookie) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }

    const expectedToken = await createAdminToken(correct);
    if (cookie !== expectedToken) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
