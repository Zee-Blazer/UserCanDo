import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/images/logo.png";
import Image from "next/image";
import { authNavItems, navItems } from "./navItems";
import bag from "@/assets/images/bag.png";
import { FormInput } from "../General/form";
import { Badge, Button, IconButton } from "@material-tailwind/react";
import { Cart2Icon, FavoriteIcon } from "@/assets/svg";
import ProfileDropdown from "./profileDropdown";
import { Menu } from "lucide-react";
import SidebarDrawer from "./SidebarDrawer";
import { ROUTES } from "@/constants/routes";
import { useAuthSelector, useShopperSelector } from "@/Redux/selectors";
import NotificationDropdown from "../shoppers/notification/notificationDropdown";
import LoginDialog from "../auth/LoginDialog";

export default function ShopperNavigation() {
  const pathname = usePathname();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const { isLoggedIn } = useAuthSelector();
  const navlinks = isLoggedIn ? authNavItems : navItems;
  const { cartItems } = useShopperSelector();
  const { favouriteItems } = useShopperSelector();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex gap-8">
            <Image src={logo} alt="logo" width={100} height={100} />
            <div className="hidden xl:flex">
              {navlinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium transition-colors ${
                    item.href === "/"
                      ? pathname === "/"
                        ? "text-pry border-b-pry"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                      : pathname.startsWith(item.href)
                      ? "text-pry border-b-pry"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  } border-b-2 border-transparent`}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-2">
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

            <IconButton className="bg-transparent border-[1px] border-gray_1">
              <NotificationDropdown />
            </IconButton>

            <Link href={ROUTES.shopperFavorites}>
              <IconButton className="bg-transparent border-[1px] border-gray_1">
                <Badge
                  content={favouriteItems?.length || 0}
                  color="red"
                  className="absolute top-0 right-0"
                >
                  <FavoriteIcon />
                </Badge>
              </IconButton>
            </Link>

            <Link
              href={ROUTES.shopperCart}
              className="bg-transparent border-[1px] border-gray_1 rounded-none"
            >
              <IconButton>
                <Badge
                  content={cartItems?.length || 0}
                  color="red"
                  className="absolute top-0 right-0"
                >
                  <Cart2Icon />
                </Badge>
              </IconButton>
            </Link>

            {isLoggedIn ? (
              <ProfileDropdown />
            ) : (
              <Button
                onClick={() => setIsLoginDialogOpen(true)}
                className="bg-pry2 text-white p-3 px-8 rounded-lg hidden md:block normal-case"
              >
                Login
              </Button>
            )}

            <IconButton
              className="bg-pry2 border-[1px] border-gray_1 xl:hidden"
              onClick={() => setIsDrawerOpen(true)}
            >
              <Menu color="white" />
            </IconButton>
          </div>
        </div>
      </div>

      <SidebarDrawer
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
      <LoginDialog
        open={isLoginDialogOpen}
        onClose={() => setIsLoginDialogOpen(false)}
        callback={() => setIsDrawerOpen(false)}
      />
    </nav>
  );
}
