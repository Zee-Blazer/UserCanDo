import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { Drawer, IconButton } from "@material-tailwind/react";
import { authNavItems, navItems } from "./navItems";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import MoreInfoComp from "./moreInfoComp";
import { useAuthSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";
import { agentNavItems } from "../agentLayout/navItemsData";

interface SidebarDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function SidebarDrawer({ open, onClose }: SidebarDrawerProps) {
  const pathname = usePathname();
  const { isLoggedIn, loginData } = useAuthSelector();
    const useCase = loginData?.use_case?.toLowerCase() as UseCase;
    const isAgent = useCase === USE_CASES.AGENT;
  const navlinks = isAgent ? agentNavItems : isLoggedIn ? authNavItems : navItems;

  return (
    <Drawer open={open} onClose={onClose} className="p-4">
      <div className="mb-6 flex items-center justify-between">
        <Image src={logo} alt="logo" width={100} height={100} />
        <IconButton variant="text" onClick={onClose}>
          <X />
        </IconButton>
      </div>

      <div className="flex flex-col h-[calc(100vh-100px)]">
        <div className="flex flex-col space-y-1 flex-1">
          {navlinks.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex items-center py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? "text-pry2 border-b-pry2"
                    : "text-gray-500 hover:text-gray-700"
                } hover:bg-gray-50 border-b-[1px] border-transparent`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <div>
          <MoreInfoComp />
        </div>
      </div>
    </Drawer>
  );
}
