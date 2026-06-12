import { List, Switch, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React, { useState } from "react";
import bag from "@/assets/images/bag2.png";
import change from "@/assets/images/switch.svg";
import profilePic from "@/assets/images/shopperProfile.png";
import ProfileItem from "@/components/shopperLayout/profileItem";
import {
  agentCompanyProfile,
  getCompanyProfile,
  otherAgentMenu,
  otherMenu,
} from "@/components/shopperLayout/profileItemData";
import { ActiveIcon } from "@/assets/svg";
import SwitchAccountComp from "@/components/shopperLayout/switchAccountComp";
import { useAgentSelector, useDashboardSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";
import { UIGuard } from "@/components/guards/roleGuard";

interface PersonalProps {
  onLogoutClick?: () => void;
  onDeleteAccountClick?: () => void;
  onShoppingModeToggle?: () => void;
  USE_CASE?: UseCase;
}

const Company = ({
  onLogoutClick,
  onDeleteAccountClick,
  onShoppingModeToggle,
  USE_CASE,
}: PersonalProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(!open);
  const isAgent = USE_CASE === USE_CASES.AGENT;

  const { userProfile, activeBusiness, businesses } = isAgent
    ? useAgentSelector()
    : useDashboardSelector();

  const hasBusiness = businesses && businesses.length > 0;

  return (
    <main className="px-4 md:px-8 lg:px-20 w-full lg:max-w-2xl pt-8 lg:pt-14 m-auto mt-4 bg-white shadow-[0px_6px_14px_0px_#00000014,0px_0px_4px_0px_#0000000A] rounded-lg">
      <section className="flex flex-col gap-3">
        <Typography
          variant="h6"
          className="uppercase text-[#6D7280] font-medium"
        >
          active account
        </Typography>
        <div className="bg-[#F9FAFB] rounded-lg flex justify-between items-center p-2 border-[2px] border-[#F1F1F1]">
          <div className="flex gap-3 items-center">
            <Image
              src={bag}
              alt="bag"
              width={48}
              height={48}
              className="w-11 h-11"
            />
            <div className="flex flex-col">
              <Typography className="font-bold">
                {activeBusiness?.business_name || userProfile.mobile_number}
              </Typography>
              <span className="text-[#474A4E] text-sm">Signed in</span>
            </div>
          </div>
          <div className="rounded-full border-[3px] px-3 py-1 flex items-center border-[#FFECCC] bg-[#FEFAF4]">
            <span className="font-medium text-[#474A4E]">Active</span>
            <ActiveIcon />
          </div>
        </div>
        <UIGuard allowedUseCases={[USE_CASES.BOTH]}>
          <button onClick={handleOpen} className="flex gap-2 items-center">
            <Image src={change} alt="change" className="w-5 h-5" />
            <Typography className="font-semibold text-[#007AF5]">
              Switch Account
            </Typography>
          </button>
        </UIGuard>
      </section>
      <section className="py-8 mt-6 flex flex-col gap-4 border-[#F1F1F1] px-4 border-t">
        <div className="border-b border-[#F1F1F1] pb-6">
          <Typography
            variant="h6"
            className="uppercase text-[#6D7280] font-medium"
          >
            My Profile
          </Typography>
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
                 { userProfile?.first_name || ""} { userProfile?.last_name || ""}
              </Typography>
              <span className="text-[#474A4E] text-sm">
                {userProfile?.email || ""}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Typography className="uppercase font-semibold mb-4">
            profile
          </Typography>
          <div className="space-y-4">
            <List className="p-0 gap-4">
              {isAgent
                ? agentCompanyProfile?.map((item, index) => (
                    <ProfileItem
                      href={item?.href}
                      icon={item?.icon}
                      label={item?.label}
                      key={index}
                    />
                  ))
                : getCompanyProfile(hasBusiness)?.map((item, index) => (
                    <ProfileItem
                      href={item?.href}
                      icon={item?.icon}
                      label={item?.label}
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
                  You are currently in shopping mode. Toggle the button switch
                  to your vendor profile.
                </Typography>
              </div>
            </UIGuard>

            <List className="p-0 gap-4">
              {isAgent
                ? otherAgentMenu?.map((item, index) => (
                    <ProfileItem
                      href={item?.href}
                      icon={item?.icon}
                      label={item?.label}
                      key={index}
                      onLogoutClick={onLogoutClick}
                      onDeleteAccountClick={onDeleteAccountClick}
                    />
                  ))
                : otherMenu?.map((item, index) => (
                    <ProfileItem
                      href={item?.href}
                      icon={item?.icon}
                      label={item?.label}
                      key={index}
                      onLogoutClick={onLogoutClick}
                      onDeleteAccountClick={onDeleteAccountClick}
                    />
                  ))}
            </List>
          </div>
        </div>
      </section>
      <SwitchAccountComp handleOpen={() => setOpen(false)} open={open} />
    </main>
  );
};

export default Company;
