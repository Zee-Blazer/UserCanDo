import {
  AgentIcon,
  BagIcon,
  Credit,
  CreditIcon,
  DashboardIcon,
  HelpIcon,
  InventoryIcon,
  NotificationIcon,
  OrderIcons,
  SalesIcon,
  SettingsIcon,
  TagIcon,
  TermsIcon,
  UserIcon,
  UsersIcon,
} from "@/assets/svg";
import { ROUTES } from "@/constants/routes";

export const mainMenu = [
  {
    label: "Your Businesses",
    href: ROUTES.businesses,
    icon: BagIcon,
  },
];

export const marketPlace = [
  {
    label: "Overview",
    href: ROUTES.overview,
    icon: DashboardIcon,
  },
  {
    label: "Sales",
    href: ROUTES.sales,
    icon: SalesIcon,
    permission: "VIEW_SALES" as const,
  },
  {
    label: "Orders",
    href: ROUTES.orders,
    icon: OrderIcons,
    permission: "VIEW_SALES" as const,
  },
  {
    label: "Credit Request",
    href: ROUTES.creditRequests,
    icon: TermsIcon,
  },
  {
    label: "Suppliers",
    href: ROUTES.suppliers,
    icon: BagIcon,
    permission: "VIEW_ALL_SUPPLIERS" as const,
  },
  {
    label: "Purchase Order",
    href: ROUTES.purchaseOrder,
    icon: TagIcon,
    permission: "VIEW_ALL_PURCHASE_ORDERS" as const,
  },
  {
    label: "Sale agents",
    href: ROUTES.saleAgent,
    icon: UsersIcon,
    permission: "VIEW_ALL_SALES_AGENTS" as const,
  },
  {
    label: "Customers",
    href: ROUTES.customers,
    icon: UsersIcon,
    permission: "VIEW_ALL_CUSTOMERS" as const,
  },
  {
    label: "Credit report",
    href: ROUTES.creditReport,
    icon: CreditIcon,
  },
  {
    label: "Inventory",
    href: ROUTES.inventory,
    icon: InventoryIcon,
    permission: "VIEW_ALL_PRODUCTS" as const,
  },
  {
    label: "Agent Requests",
    href: ROUTES.agentRequest,
    icon: AgentIcon,
    permission: "VIEW_ALL_AGENTS" as const,
  },
  {
    label: "Credit",
    href: ROUTES.credit,
    icon: Credit,
  },
];

export const otherMenu = [
  {
    label: "Sales POS",
    href: ROUTES.salesPos,
    icon: SalesIcon,
    permission: "VIEW_ALL_CARTS" as const,
  },
  {
    label: "Team",
    href: ROUTES.staff,
    icon: UsersIcon,
    permission: "VIEW_ALL_STAFF" as const,
  },
  {
    label: "Notifications",
    href: ROUTES.notifications,
    icon: NotificationIcon,
  },
  {
    label: "Settings",
    href: ROUTES.settings,
    icon: SettingsIcon,
    permission: "VIEW_PROFILE" as const,
  },
  {
    label: "Help/Support",
    href: ROUTES.help,
    icon: HelpIcon,
  },
];
