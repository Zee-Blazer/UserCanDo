"use client";

import EmptyState from "@/components/shoppers/agents/emptyState";
import { useAuth } from "@/context/authContext";
import { Button, Typography } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import History from "../history";
import { useAgentSelector } from "@/Redux/selectors";
import { useAgent } from "@/context/agentContext";

const Request = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { nextAgentRequestSlide } = useAuth();
  const { loadAgentRequestHistoryByRange } = useAgent();

  const {
    requestOrderHistory,
    todayRequestOrderHistory,
    weekRequestOrderHistory,
  } = useAgentSelector();

  useEffect(() => {
    loadAgentRequestHistoryByRange();
  }, [loadAgentRequestHistoryByRange]);

  const tabs = ["Today", "This Week", "Past Month"];

  const handleTabChange = (index: number) => {
    setLoading(true);
    setActiveTabIndex(index);
    setTimeout(() => setLoading(false), 1000);
  };

  const requests =
    activeTabIndex === 0
      ? todayRequestOrderHistory
      : activeTabIndex === 1
      ? weekRequestOrderHistory
      : requestOrderHistory;

  return (
    <main className="relative w-full">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0">
        <Typography className="text-lg font-medium">Request History</Typography>

        <div className="bg-[#F2F4F7] flex gap-1 md:gap-2 items-center rounded-lg p-1 md:p-2 w-full md:w-auto">
          {tabs.map((label, idx) => (
            <Button
              key={idx}
              className={`flex-1 md:flex-initial md:w-fit normal-case py-2 px-3 md:px-4 rounded-md text-center text-xs md:text-sm ${
                activeTabIndex === idx
                  ? "bg-white shadow-md"
                  : "shadow-none bg-inherit"
              }`}
              onClick={() => handleTabChange(idx)}
            >
              <Typography
                className={`font-medium text-xs md:text-sm ${
                  activeTabIndex === idx ? "text-[#344054]" : "text-[#667085]"
                }`}
              >
                {label}
              </Typography>
            </Button>
          ))}
        </div>
      </header>

      <div className="flex items-center justify-center px-2 md:px-0 min-h-[200px]">
        {loading || (requests && requests.length > 0) ? (
          <History requests={requests} loading={loading} />
        ) : (
          <EmptyState />
        )}
      </div>

      <button
        onClick={nextAgentRequestSlide}
        className="fixed bottom-4 right-4 w-12 h-12 md:w-14 md:h-14 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      >
        <Plus className="w-5 h-5 md:w-6 md:h-6" color="white" />
      </button>
    </main>
  );
};

export default Request;
