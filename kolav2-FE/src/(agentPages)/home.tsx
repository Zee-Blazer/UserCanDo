"use client";
import React, { useState } from "react";
import km from "@/assets/images/km.png";
import Image from "next/image";
import { Button, Typography } from "@material-tailwind/react";
import SwitchDropdown from "@/components/agent/home/switchDropdown";
import Analytics from "@/components/agent/home/analytics";
import SalesGraph from "@/components/agent/home/salesGraph";
import SalesHistory from "@/components/agent/home/salesHistory";
import LeaderBoard from "@/components/agent/home/leaderBoard";
import { useAgentSelector } from "@/Redux/selectors";

const Home = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const { activeBusiness } = useAgentSelector();
  const getBusinessInitials = (businessName: string) => {
    const words = businessName?.split(" ") || [];
    const firstChar = words[0]?.charAt(0).toUpperCase() || "";
    const secondChar = words[1]?.charAt(0).toUpperCase() || "";
    return firstChar + secondChar;
  };

  return (
    <main>
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <div className="flex items-center gap-3">
          <span>Team:</span>
          <div className="flex items-center gap-2">
            {activeBusiness?.business_logo ? (
              <Image
                src={activeBusiness?.business_logo}
                alt={activeBusiness?.business_name || "business"}
                width={32}
                height={32}
                className="w-8 h-8 rounded-full object-cover"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-pry2 bg-opacity-10 font-bold flex items-center justify-center text-xs">
                {activeBusiness?.business_name
                  ? getBusinessInitials(activeBusiness?.business_name)
                  : "BZ"}
              </div>
            )}
            <span>{activeBusiness?.business_name}</span>
          </div>
        </div>

       
        <div className="bg-[#F2F4F7] flex gap-2 items-center rounded-lg p-2 w-full md:w-auto">
          <Button
            className={`w-fit normal-case shadow-md py-2 rounded-lg text-center ${
              activeTabIndex === 0 ? "bg-white" : "shadow-none bg-inherit"
            }`}
            onClick={() => setActiveTabIndex(0)}
          >
            <Typography
              className={`font-medium ${
                activeTabIndex === 0 ? "text-[#344054]" : "text-[#667085]"
              }`}
            >
              Today
            </Typography>
          </Button>
          <Button
            className={`w-fit  normal-case py-2 rounded-md text-center ${
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
              This Week
            </Typography>
          </Button>
          <Button
            className={`w-fit normal-case py-2 rounded-md text-center ${
              activeTabIndex === 3
                ? "bg-white shadow-md"
                : "shadow-none bg-inherit"
            }`}
            onClick={() => setActiveTabIndex(3)}
          >
            <Typography
              className={`font-medium ${
                activeTabIndex === 3 ? "text-[#344054]" : "text-[#667085]"
              }`}
            >
              Past Month
            </Typography>
          </Button>
        </div>
      </header>
      <Analytics />
      <div className="grid mt-10 grid-cols-1 md:grid-cols-2">
        <SalesGraph />
        <SalesHistory />
      </div>
      <LeaderBoard />
    </main>
  );
};

export default Home;
