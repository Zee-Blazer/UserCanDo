"use client";
import React, { useState } from "react";
import ProfileAgentsHeader from "@/components/shoppers/agents/profileAgentsHeader";
import AgentRequests from "@/components/shoppers/agents/agentRequests";
import AgentLeaderboard from "@/components/shoppers/agents/agentLeaderboard";
import AllAgents from "@/components/shoppers/agents/allAgents";

const AgentsPage = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
  };

  return (
    <div className="w-full">
      <ProfileAgentsHeader
        activeTabIndex={activeTabIndex}
        setActiveTabIndex={setActiveTabIndex}
        onSearchChange={handleSearchChange}
        setIsFilterModalOpen={setIsFilterModalOpen}
      />
      {activeTabIndex === 0 && <AllAgents searchQuery={searchQuery} />}
      {activeTabIndex === 1 && (
        <AgentRequests
          isFilterModalOpen={isFilterModalOpen}
          setIsFilterModalOpen={setIsFilterModalOpen}
        />
      )}
      {activeTabIndex === 2 && <AgentLeaderboard searchQuery={searchQuery} />}
    </div>
  );
};

export default AgentsPage;
