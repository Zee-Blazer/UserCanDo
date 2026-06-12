import { List, Switch, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import profilePic from "@/assets/images/shopperProfile.png";
import { SquarePen } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import ProfileItem from "@/components/shopperLayout/profileItem";
import Link from "next/link";
import {
  otherMenu,
  personalProfile,
  agentPersonalProfile,
} from "@/components/shopperLayout/profileItemData";
import { useAgentSelector, useDashboardSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";
import { UIGuard } from "@/components/guards/roleGuard";

interface PersonalProps {
  onLogoutClick?: () => void;
  onDeleteAccountClick?: () => void;
  onShoppingModeToggle?: () => void;
  USE_CASE?: UseCase;
}

const Personal = ({
  onLogoutClick,
  onDeleteAccountClick,
  onShoppingModeToggle,
  USE_CASE,
}: PersonalProps) => {
  const isAgent = USE_CASE === USE_CASES.AGENT;

  const { userProfile } = isAgent ? useAgentSelector() : useDashboardSelector();
  return (
    <main className="px-4 md:px-8 lg:px-20 w-full lg:max-w-2xl pt-0 lg:pt-14 m-auto mt-4 bg-white shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A] rounded-lg">
      <section className="py-8 mt-6 flex flex-col gap-4 border-[#F1F1F1] px-4 border-t">
        <div className="border-b border-[#F1F1F1] pb-6">
          <Typography
            variant="h6"
            className="uppercase text-[#6D7280] font-medium"
          >
            My Profile
          </Typography>
          <div className="flex justify-between">
            <div className="flex gap-2 items-center">
              <Image
                src={profilePic}
                alt="bag"
                width={48}
                height={48}
                className="w-11 h-11"
              />
              <div className="flex flex-col">
                <Typography className="font-bold">
                  {userProfile?.last_name || ""}
                </Typography>
                <span className="text-[#474A4E] text-sm">
                  {userProfile?.email || ""}
                </span>
              </div>
            </div>
            <Link
              href={
                isAgent ? ROUTES.agentProfileEdit : ROUTES.shopperProfileEdit
              }
            >
              <SquarePen size={18} className="cursor-pointer" />
            </Link>
          </div>
        </div>
        <div>
          <Typography className="uppercase font-semibold mb-4">
            profile
          </Typography>
          <div className="space-y-4">
            <List className="p-0 gap-4">
              {isAgent
                ? agentPersonalProfile.map((item, index) => (
                    <ProfileItem
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                      key={index}
                    />
                  ))
                : personalProfile.map((item, index) => (
                    <ProfileItem
                      href={item.href}
                      icon={item.icon}
                      label={item.label}
                      key={index}
                    />
                  ))}
            </List>
            <UIGuard allowedUseCases={[USE_CASES.BOTH]}>
              <div className="rounded-md px-5 pb-4 pt-7 shadow-md">
                <Typography className="font-semibold mb-3">
                  Shopping Mode
                </Typography>
                <div className="flex items-center gap-4 w-full">
                  <hr className="flex-grow border-t border-[#F1F1F1]" />
                  <Switch
                    crossOrigin=""
                    id="custom-switch-component"
                    ripple={false}
                    className="h-full w-full checked:bg-[#2ec946]"
                    containerProps={{
                      className: "w-11 h-6",
                    }}
                    circleProps={{
                      className: "before:hidden left-0.5 border-none",
                    }}
                    onChange={onShoppingModeToggle}
                  />
                </div>

                <Typography className="text-[#979797] font-normal text-sm">
                  Your are currently in shopping mode. Toggle the button switch
                  to your vendor profile.
                </Typography>
              </div>
            </UIGuard>

            <List className="p-0 gap-4">
              {otherMenu.map((item, index) => (
                <ProfileItem
                  href={item.href}
                  icon={item.icon}
                  label={item.label}
                  key={index}
                  onLogoutClick={onLogoutClick}
                  onDeleteAccountClick={onDeleteAccountClick}
                />
              ))}
            </List>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Personal;
