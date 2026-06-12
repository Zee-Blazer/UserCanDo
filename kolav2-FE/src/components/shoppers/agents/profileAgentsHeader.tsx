import FilterDialog from "@/components/General/TanTable/filterDialog";
import SearchComp from "@/components/General/TanTable/searchComp";
import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";

interface ProfileAgentsHeaderProps {
  activeTabIndex: number;
  setActiveTabIndex: (index: number) => void;
  onSearchChange: (query: string) => void;
  setIsFilterModalOpen: (open: boolean) => void;
}

const ProfileAgentsHeader = ({
  activeTabIndex,
  setActiveTabIndex,
  onSearchChange,
  setIsFilterModalOpen,
}: ProfileAgentsHeaderProps) => {
  const [allAgentsSearchQuery, setAllAgentsSearchQuery] = useState("");
  const [agentsLeaderboardSearchQuery, setAgentsLeaderboardSearchQuery] =
    useState("");

  return (
    <div className="flex flex-col md:flex-row justify-between px-4 md:px-8 lg:px-0 gap-4 mb-16">
      <div className="flex items-center gap-4">
        <Typography className="font-semibold text-black text-xl">
          Agents
        </Typography>
        {activeTabIndex === 0 ? (
          <SearchComp
            setSearchTerm={setAllAgentsSearchQuery}
            searchTerm={allAgentsSearchQuery}
          />
        ) : activeTabIndex === 2 ? (
          <SearchComp
            setSearchTerm={setAgentsLeaderboardSearchQuery}
            searchTerm={agentsLeaderboardSearchQuery}
          />
        ) : (
          <FilterDialog onClick={() => setIsFilterModalOpen(true)} />
        )}
      </div>
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
            All Agents
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
            Requests
          </Typography>
        </Button>
        <Button
          className={`w-full md:w-44 normal-case py-2 rounded-md text-center ${
            activeTabIndex === 2
              ? "bg-white shadow-md"
              : "shadow-none bg-inherit"
          }`}
          onClick={() => setActiveTabIndex(2)}
        >
          <Typography
            className={`font-medium ${
              activeTabIndex === 2 ? "text-[#344054]" : "text-[#667085]"
            }`}
          >
            Leaderboard
          </Typography>
        </Button>
      </div>
    </div>
  );
};

export default ProfileAgentsHeader;
