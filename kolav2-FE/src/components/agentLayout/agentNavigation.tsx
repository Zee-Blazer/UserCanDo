import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import bag from "@/assets/images/bag.png";
import { FormInput } from "../General/form";
import { IconButton } from "@material-tailwind/react";
import { Menu } from "lucide-react";
import SidebarDrawer from "../shopperLayout/SidebarDrawer";
import ProfileDropdown from "../shopperLayout/profileDropdown";
import { agentNavItems } from "./navItemsData";

export default function AgentNavigation() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const isNavItemActive = (href: string) => {
    if (href === "/agent") {
      return pathname === "/agent";
    }

    return pathname === href || pathname.startsWith(href + "/");
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-8">
            <Image src={logo} alt="logo" width={100} height={100} />
            <div className="hidden xl:flex">
              {agentNavItems.map((item) => {
                const isActive = isNavItemActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "text-pry border-b-pry"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    } border-b-2 border-transparent`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
          <div className="flex items-center gap-14">
            <div className="hidden xl:flex items-center gap-2">
              <Image
                src={bag}
                alt="bag"
                width={48}
                height={48}
                className="w-11 h-11"
              />
              <FormInput bgColor="#F1F1F1" placeholder="Search" />
            </div>

            <IconButton
              className="bg-pry2 border-[1px] border-gray_1 xl:hidden"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu color="white" />
            </IconButton>
            <ProfileDropdown />
          </div>
        </div>
      </div>
      <SidebarDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </nav>
  );
}
