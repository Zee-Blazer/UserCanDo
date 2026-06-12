import { ReactNode } from "react";

export interface TopBarProps {
  onToggleSidebar?: () => void;
  userName?: string;
  userInitials?: string;
  userAvatar?: string;
}

export interface NavItemChild {
  title: string;
  path: string;
}

export interface NavItem {
  title: string;
  icon: ReactNode;
  path: string;
  sub?: SubNavItem[];
  badge?: string | number;
  isActive?: boolean;
  clickFunc?: () => void;
}

export interface NavItemProps {
  title: string;
  icon: React.ReactElement;
  path?: string;
  index?: number;
  isLabelShown?: boolean;
  sub?: SubNavItem[];
  disabled?: boolean;
  clickFunc?: () => void;
  children?: NavItemChild[];
  onCloseSidebar?: () => void;
  isActive?: boolean;
}

export interface SubNavItem {
  title: string;
  path: string;
  icon?: ReactNode;
  badge?: string | number;
  isActive?: boolean;
}

export interface SidebarProps {
  isSidebarOpen: boolean;
  isSidebarTextShown: boolean;
  setIsSidebarTextShown: (value: boolean) => void;
  closeSidebar: () => void;
  onLogout?: () => void;
}
