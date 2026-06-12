import { UseGlobalSearch } from "@/api/hooks/useGlobalSearch";
import { useAppContext } from "@/app/appContext";
import {
  LogoutIcon,
  NotificationIcon,
  SettingsIcon,
  SwitchAccountIcon,
  UserProfileIcon,
} from "@/assets/svg";
import { FormInput } from "@/components/General/form";
import { SearchResultsDropdown } from "@/components/General/searchResult";
import { UIGuard } from "@/components/guards/roleGuard";
import { colors } from "@/constants/colors";
import { ROUTES } from "@/constants/routes";
import { useDash } from "@/context/dashboardContext";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { USE_CASES, USER_ROLES } from "@/types";
import {
  Avatar,
  Badge,
  Button,
  Popover,
  PopoverContent,
  PopoverHandler,
  Typography,
} from "@material-tailwind/react";
import { ChevronDown, Menu, Search } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";

const DashboardHeader = ({ toggleSidebar }: { toggleSidebar: () => void }) => {
  const { loadNotificationsData } = useDash();
  const { userProfile, notifications } = useDashboardSelector();
  const { loginData } = useAuthSelector();
  const [openPopover, setOpenPopover] = useState(false);
  const { logout } = useAppContext();

  const { searchTerm, setSearchTerm, performSearch } = UseGlobalSearch();
  const [searchResults, setSearchResults] = useState({ results: {}, total: 0 });
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  const unreadNotifications = notifications?.filter((n) => !n.is_read) || [];

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm.trim()) {
        const results = performSearch(searchTerm);
        setSearchResults(results);
        setShowResults(true);
      } else {
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchTerm, performSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const closePopover = () => setOpenPopover(false);

  useEffect(() => {
    loadNotificationsData();
  }, [loadNotificationsData]);

  return (
    <div className="bg-[#F8FAFB] px-3 py-2 flex items-center justify-between gap-4">
      <Menu
        className="w-6 h-6 text-gray-700 cursor-pointer md:hidden"
        onClick={toggleSidebar}
      />
      <div className="flex items-center justify-end gap-4 ml-auto w-full">
        <div
          ref={searchRef}
          className="hidden md:block w-full max-w-[424px] relative"
        >
          <FormInput
            placeholder="Search for business, wholesalers and sale agents..."
            bgColor="white"
            icon={<Search color={colors.gray_3} />}
            iconPosition="left"
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
          />
          <SearchResultsDropdown
            results={searchResults.results}
            total={searchResults.total}
            isVisible={showResults}
            onClose={() => setShowResults(false)}
          />
        </div>

        <Link href={ROUTES.notifications}>
          <Badge content={unreadNotifications?.length || "0"} withBorder>
            <NotificationIcon color={colors.gray_3} />
          </Badge>
        </Link>

        <Link
          href={ROUTES.settings}
          className="block border-r-2 border-l-2 px-3 py-6"
        >
          <SettingsIcon color={colors.gray_3} />
        </Link>

        <div className="flex items-center gap-2 w-full justify-between max-w-[200px]">
          <div className="flex gap-2 items-center">
            <Avatar
              src={
                userProfile?.profile_image ||
                "https://docs.material-tailwind.com/img/face-2.jpg"
              }
              alt="avatar"
              size="sm"
            />
            <div className="">
              <Typography className="font-bold text-sm">
                {userProfile?.first_name} {userProfile?.last_name}
              </Typography>
              <Typography className="text-sm text-gray_4 capitalize">
                {userProfile?.role?.toLocaleLowerCase() === USER_ROLES.USER
                  ? loginData?.use_case?.toLowerCase()
                  : userProfile?.role?.toLowerCase()}
              </Typography>
            </div>
          </div>
          <Popover
            open={openPopover}
            handler={() => setOpenPopover(!openPopover)}
            placement="bottom-end"
          >
            <PopoverHandler>
              <ChevronDown className="cursor-pointer" color={colors.gray_3} />
            </PopoverHandler>
            <PopoverContent className="flex flex-col gap-4">
              <UIGuard allowedUseCases={[USE_CASES.BOTH]}>
                <Link
                  href={ROUTES.home}
                  className="normal-case p-0 flex items-center gap-2 w-48 font-normal cursor-pointer"
                  onClick={closePopover}
                >
                  <SwitchAccountIcon />
                  <Typography>Switch to Shopper</Typography>
                </Link>
              </UIGuard>
              <Link
                href={ROUTES.settings}
                className="normal-case p-0 flex items-center gap-2 w-48 font-normal cursor-pointer"
                onClick={closePopover}
              >
                <UserProfileIcon />
                Profile
              </Link>
              <div
                className="normal-case p-0 flex items-center gap-2 w-48 font-normal cursor-pointer"
                onClick={() => {
                  logout();
                  closePopover();
                }}
              >
                <LogoutIcon />
                Log out
              </div>
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
