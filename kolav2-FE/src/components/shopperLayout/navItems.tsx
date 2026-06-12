import { ROUTES } from "@/constants/routes";
import { LogOut, Settings, SwitchCamera } from "lucide-react";

export const navItems = [
  { href: ROUTES.shopperHome, label: "Home" },
  { href: ROUTES.shopperCart, label: "Cart" },
];
export const authNavItems = [
  ...navItems,
  { href: ROUTES.shopperOrders, label: "Orders" },
  { href: ROUTES.shopperCredit, label: "Credit" },
  { href: ROUTES.shopperProfile, label: "Profile" },
];

export const bottomNavItems = [
  { href: "/switch-account", label: "Switch Account", icon: SwitchCamera },
  { href: "/shopper/settings", label: "Settings", icon: Settings },
  {
    href: "/logout",
    label: "Logout",
    icon: LogOut,
    className: "text-red-500 hover:bg-red-50",
  },
];
