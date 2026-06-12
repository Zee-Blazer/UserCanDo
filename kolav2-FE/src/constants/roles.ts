import { UseCase, UserRole } from "@/types";

export const ROLE_HOME_PAGES: Record<UserRole | UseCase, string> = {
  super_admin: "/dashboard/businesses",
  admin: "/dashboard/businesses",
  vendor: "/dashboard/businesses",
  both: "/dashboard/businesses",
  buyer: "/",
  agent: "/agent",
  user: "/",
  owner: "/dashboard/businesses",
  sales_manager: "/dashboard/businesses",
  vendor_sales_agent: "/dashboard/businesses",
  kola_sales_agent: "/dashboard/businesses",
  customer: "/dashboard/businesses",
  sales_staff: "/dashboard/businesses",
  supply_chain_manager: "/dashboard/businesses",
  supply_chain_supervisor: "/dashboard/businesses",
  warehouse_staff: "/dashboard/businesses",
  finance_associate: "/dashboard/businesses",
  finance_admin: "/dashboard/businesses",
  business_analyst: "/dashboard/businesses",
  content_editor: "/dashboard/businesses",
  operations_coordinator: "/dashboard/businesses",
};

export const PUBLIC_ROUTES = [
  "/",
  "/cart",
  "/favorites",
  "/login",
  "/create-account",
  "/create-account/*",
  "/forgot-password",
  "/reset-passcode",
  "/all-categories",
  "/all-vendors",
  "/all-deals",
];

export interface RoutePermission {
  roles?: string[];
  useCases?: string[];
  authenticated?: boolean;
}

export const ROUTE_PERMISSIONS: Record<string, RoutePermission> = {
  // Vendor, Admin and Super Admin routes
  "/dashboard": { useCases: ["vendor"], roles: ["super_admin", "admin"] },
  "/dashboard/*": { useCases: ["vendor"], roles: ["super_admin", "admin"] },

  // Buyer routes
  "/cart": { useCases: ["buyer"] },
  "/credit": { useCases: ["buyer"] },
  "/orders": { useCases: ["buyer"] },
  "/favorites": { useCases: ["buyer"] },
  "/home": { useCases: ["buyer"] },

  // Agent routes
  "/agent": { useCases: ["agent"] },
  "/agent/*": { useCases: ["agent"] },

  // Shared routes (multiple user types)
  "/profile": {
    useCases: ["vendor", "buyer", "agent"],
    authenticated: true,
  },
  "/profile/*": {
    useCases: ["vendor", "buyer", "agent"],
    authenticated: true,
  },
  "/settings": {
    useCases: ["vendor", "buyer", "agent"],
    authenticated: true,
  },
};
