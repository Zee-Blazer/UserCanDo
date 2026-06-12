"use client";
import React, { useState } from "react";
import { Button, Typography } from "@material-tailwind/react";
import Rank from "@/components/agent/home/rank";

const LeaderboardPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const tabs = ["Today", "This Week", "Past Month"];

  return (
    <main className="relative">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <Typography className="text-xl font-medium">Leaderboard</Typography>

        <div className="flex flex-wrap justify-between items-center gap-2 bg-[#F2F4F7] rounded-lg p-2 w-full md:w-auto">
          {tabs.map((label, index) => {
            const isActive = activeTabIndex === index;

            return (
              <Button
                key={label}
                onClick={() => setActiveTabIndex(index)}
                className={`flex-1 sm:flex-none px-2 sm:px-3 md:px-4 py-2 rounded-md normal-case transition-all duration-200 ease-in-out flex items-center justify-center ${
                  isActive
                    ? "bg-white shadow-md text-[#344054]"
                    : "bg-inherit shadow-none text-[#667085]"
                }`}
              >
                <Typography className="font-medium text-sm sm:text-sm md:text-base lg:text-base whitespace-nowrap text-center">
                  {label}
                </Typography>
              </Button>
            );
          })}
        </div>
      </header>

      <div className="pt-4">
        <Rank />
      </div>
    </main>
  );
};

export default LeaderboardPage;
