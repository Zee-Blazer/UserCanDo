import { NextRequest, NextResponse } from "next/server";
import { PUBLIC_ROUTES } from "@/constants/roles";

interface JWTPayload {
  token_type?: string;
  exp?: number;
  iat?: number;
  jti?: string;
  user_id?: string;
}

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => {
    if (route === pathname) return true;
    if (route.endsWith("/*")) {
      return pathname.startsWith(route.slice(0, -2));
    }
    return false;
  });
};

function decodeJWTPayload(token: string): JWTPayload | null {
  try {
    if (!token || typeof token !== "string") return null;

    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = atob(base64);

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("JWT decode error:", error);
    return null;
  }
};

function isTokenExpired(payload: JWTPayload): boolean {
  if (!payload.exp) return true;
  return Math.floor(Date.now() / 1000) >= payload.exp - 30;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files and API routes
  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.match(/\.(ico|png|jpg|jpeg|svg|gif|css|js|woff|woff2|ttf)$/)
  ) {
    return NextResponse.next();
  }

  // Allow public routes without any token checks
  if (isPublicRoute(pathname)) {
    return NextResponse.next();
  }

  // Get token from cookies
  const accessToken = request.cookies.get("access_token")?.value;

  // No token - redirect to login (ONLY if not already on login page)
  if (!accessToken) {
    if (pathname === "/login") {
      return NextResponse.next();
    }
    const loginUrl = new URL("/login", request.url);
    if (pathname !== "/") {
      loginUrl.searchParams.set("redirect", pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  // Decode and validate token structure
  const payload = decodeJWTPayload(accessToken);
  if (!payload || !payload.user_id || isTokenExpired(payload)) {
    // Clear cookies and redirect to login
    const response = NextResponse.redirect(new URL("/login", request.url));
    response.cookies.delete("access_token");
    response.cookies.delete("refresh_token");
    return response;
  }

  // Add user info to headers for pages to use
  const response = NextResponse.next();
  response.headers.set("x-user-id", payload.user_id || "");
  response.headers.set("x-token-valid", "true");

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
