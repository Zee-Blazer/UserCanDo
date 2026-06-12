import {
  StockBag,
  CustomerIcon,
  SettingsIcon,
  BusinessBag,
  SellerBag,
  AgentIcon,
  AddSaleIcon,
  SwitchIcon,
  HelpSupportIcon,
  LogoutShopperIcon,
  ProfileIcon,
  DeleteIcon,
  ResetPinIcon,
  BellIcon,
  FavIcon,
  UserIcon,
} from "@/assets/svg";
import { ROUTES } from "@/constants/routes";

const baseCompanyProfile = [
  { label: "Add Business", href: ROUTES.shopperAddBusiness, icon: BusinessBag },
  { label: "Become a Seller", href: ROUTES.shopperSettings, icon: SellerBag },
];

const businessRequiredItems = [
  {
    label: "Company Profile",
    href: ROUTES.shopperCompanyProfile,
    icon: ProfileIcon,
  },
  { label: "Customers", href: ROUTES.shopperCustomers, icon: CustomerIcon },
  { label: "Stock", href: ROUTES.shopperStock, icon: StockBag },
  { label: "Agents", href: ROUTES.shopperAgents, icon: AgentIcon },
  { label: "Add Sale", href: ROUTES.shopperAddSale, icon: AddSaleIcon },
  // { label: "Switch Business", href: ROUTES.test, icon: SwitchIcon },
];

export const getCompanyProfile = (hasBusiness = false) => {
  if (!hasBusiness) {
    return baseCompanyProfile;
  }

  return [...businessRequiredItems, ...baseCompanyProfile];
};

export const agentCompanyProfile = [
  { label: "Customers", href: ROUTES.agentCustomers, icon: CustomerIcon },
  { label: "Stock", href: ROUTES.agentStock, icon: StockBag },
  { label: "Add Sale", href: ROUTES.agentAddSale, icon: AddSaleIcon },
];

export const personalProfile = [
  // {
  //   label: "Address",
  //   href: ROUTES.profileAddress,
  //   icon: ProfileIcon,
  // },
  // { label: "Reset Pin", href: ROUTES.resetShopperPin, icon: ResetPinIcon },
  { label: "Notifications", href: ROUTES.shopperNotification, icon: BellIcon },
  {
    label: "Account Activity",
    href: ROUTES.shopperAccountActivity,
    icon: UserIcon,
  },
  { label: "Your Favourites", href: ROUTES.shopperFavorites, icon: FavIcon },
];

export const agentPersonalProfile = [
  { label: "Notifications", href: ROUTES.agentNotification, icon: BellIcon },
  {
    label: "Account Activity",
    href: ROUTES.agentAccountActivity,
    icon: UserIcon,
  },
];

export const otherMenu = [
  { label: "Help & Support", href: ROUTES.test, icon: HelpSupportIcon },
  { label: "Settings", href: ROUTES.agentSettings, icon: SettingsIcon },
  {
    label: " Logout",
    href: ROUTES.notifications,
    icon: LogoutShopperIcon,
  },
  { label: "Delete Account", href: ROUTES.test, icon: DeleteIcon },
];

export const otherAgentMenu = [
  { label: "Help & Support", href: ROUTES.help, icon: HelpSupportIcon },
  { label: "Settings", href: ROUTES.agentSettings, icon: SettingsIcon },
  {
    label: " Logout",
    href: ROUTES.notifications,
    icon: LogoutShopperIcon,
  },
  { label: "Delete Account", href: ROUTES.test, icon: DeleteIcon },
];
