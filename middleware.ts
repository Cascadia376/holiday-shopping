import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const MOBILE_RE = /Android|iPhone|iPad|iPod|Opera Mini|IEMobile|Mobile/i;

export function middleware(req: NextRequest) {
  const ua = req.headers.get("user-agent") || "";
  const url = req.nextUrl.clone();

  if (url.pathname.startsWith("/mobile")) return NextResponse.next();

  if (MOBILE_RE.test(ua)) {
    url.pathname = "/mobile";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}
