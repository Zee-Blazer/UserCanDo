import { UIGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";

interface ProfilePageHeaderProps {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
}

const ProfilePageHeader = ({
  activeTabIndex,
  setActiveTabIndex,
}: ProfilePageHeaderProps) => {

  return (
    <main>
      <header className="flex flex-col md:flex-row justify-between px-4 md:px-8 lg:px-0 gap-4">
        <Typography className="font-semibold text-black text-xl">
          My Profile
        </Typography>
        <UIGuard allowedUseCases={[USE_CASES.VENDOR, USE_CASES.AGENT, USE_CASES.BOTH]}>
          <div className="bg-[#F2F4F7] flex gap-2 items-center rounded-lg p-2 w-full md:w-auto">
            <Button
              className={`w-full md:w-44 normal-case shadow-md py-2 rounded-lg text-center ${
                activeTabIndex === 0 ? "bg-white" : "shadow-none bg-inherit"
              }`}
              onClick={() => setActiveTabIndex(0)}
            >
              <Typography
                className={`font-medium ${
                  activeTabIndex === 0 ? "text-[#344054]" : "text-[#667085]"
                }`}
              >
                Company
              </Typography>
            </Button>

            <Button
              className={`w-full md:w-44 normal-case py-2 rounded-md text-center ${
                activeTabIndex === 1
                  ? "bg-white shadow-md"
                  : "shadow-none bg-inherit"
              }`}
              onClick={() => setActiveTabIndex(1)}
            >
              <Typography
                className={`font-medium ${
                  activeTabIndex === 1 ? "text-[#344054]" : "text-[#667085]"
                }`}
              >
                Personal
              </Typography>
            </Button>
          </div>
        </UIGuard>
      </header>
    </main>
  );
};

export default ProfilePageHeader;
