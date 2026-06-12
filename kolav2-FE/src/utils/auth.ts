import {
  PUBLIC_ROUTES,
  ROLE_HOME_PAGES,
  ROUTE_PERMISSIONS,
} from "@/constants/roles";
import { UseCase, UserRole } from "@/types";

export const getHomeRoute = (
  user: Partial<UserProfile> & { use_case?: string }
) => {
  if (!user) return "/login";

  // Priority: use_case > role > default
  const redirectKey = (user.use_case || user.role)?.toLowerCase() as
    | UseCase
    | UserRole;
  return ROLE_HOME_PAGES[redirectKey] || ROLE_HOME_PAGES.user;
};

export const isPublicRoute = (pathname: string): boolean => {
  return PUBLIC_ROUTES.some((route) => {
    if (route === pathname) return true;
    if (route.endsWith("/*")) {
      return pathname.startsWith(route.slice(0, -2));
    }
    return false;
  });
};

export const canAccessRoute = (
  pathname: string,
  role?: UserRole,
  useCase?: UseCase,
  isAuthenticated = false
): boolean => {
  if (isPublicRoute(pathname)) return true;

  // Match exact or wildcard route
  const permission =
    ROUTE_PERMISSIONS[pathname] ??
    Object.entries(ROUTE_PERMISSIONS).find(
      ([route]) =>
        route.endsWith("/*") && pathname.startsWith(route.slice(0, -2))
    )?.[1];

  // If no match, fallback to authentication check
  if (!permission) return isAuthenticated;

  if (permission.authenticated && !isAuthenticated) return false;

  if (
    permission.roles &&
    role &&
    !permission.roles.includes(role?.toLowerCase())
  )
    return false;

  if (
    permission.useCases &&
    useCase &&
    !permission.useCases.includes(useCase?.toLowerCase())
  )
    return false;

  return true;
};

// Decode JWT payload (your JWT structure)
export const decodeJWTPayload = (
  token: string
): {
  token_type?: string;
  exp?: number;
  iat?: number;
  jti?: string;
  user_id?: string;
} | null => {
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

export const isTokenExpired = (token: string): boolean => {
  try {
    const payload = decodeJWTPayload(token);
    if (!payload || !payload.exp) return true;

    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp <= currentTime;
  } catch (error) {
    return true;
  }
};

export const setAuthToken = (token: string) => {
  if (typeof window === "undefined") return;

  localStorage.setItem("access_token", token);

  const payload = decodeJWTPayload(token);
  const maxAge = payload?.exp
    ? `; max-age=${payload.exp - Math.floor(Date.now() / 1000)}`
    : "; max-age=86400";

  document.cookie = `access_token=${token}; path=/; secure; samesite=strict${maxAge}`;
};

export const clearAuthToken = () => {
  if (typeof window === "undefined") return;

  localStorage.removeItem("access_token");
  document.cookie =
    "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
};

export const getAuthToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
};
