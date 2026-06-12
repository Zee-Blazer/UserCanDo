"use client";

import EmptyState from "@/components/shoppers/agents/emptyState";
import { useAuth } from "@/context/authContext";
import { useAgentSelector } from "@/Redux/selectors";
import { useAgent } from "@/context/agentContext";
import { Button, Typography } from "@material-tailwind/react";
import { Plus } from "lucide-react";
import React, { useEffect, useState } from "react";
import SalesHistory from "../history";
import { usePageData } from "@/api/hooks/usePageData";

const SalesRequestHistory = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const { nextAgentRequestSlide } = useAuth();

  const { sales, todaySales, weekSales } = useAgentSelector();
  const {
    loadAgentSalesData,
    loadAgentSalesByDateRange,
    handleDeleteAgentSales,
    isAgentSaleDeleting,
  } = useAgent();

  usePageData([loadAgentSalesData, loadAgentSalesByDateRange]);

  const getActiveSales = () => {
    if (activeTabIndex === 0) return todaySales || [];
    if (activeTabIndex === 1) return weekSales || [];
    return sales || [];
  };

  const activeSales = getActiveSales();

  const handleTabChange = (index: number) => {
    setLoading(true);
    setActiveTabIndex(index);
    setTimeout(() => setLoading(false), 1000);
  };

  return (
    <main className="relative w-full">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-8">
        <Typography className="text-xl font-medium">Sales History</Typography>

        <div className="bg-[#F2F4F7] flex gap-1 md:gap-2 items-center rounded-lg p-1 md:p-2 w-full md:w-auto">
          {["Today", "This Week", "Past Month"].map((label, index) => (
            <Button
              key={label}
              className={`flex-1 md:flex-none md:w-fit normal-case px-2 md:px-4 py-2 rounded-md text-center ${
                activeTabIndex === index
                  ? "bg-white shadow-md"
                  : "bg-inherit shadow-none"
              }`}
              onClick={() => handleTabChange(index)}
            >
              <Typography
                className={`font-medium text-xs md:text-sm ${
                  activeTabIndex === index ? "text-[#344054]" : "text-[#667085]"
                } whitespace-nowrap`}
              >
                {label}
              </Typography>
            </Button>
          ))}
        </div>
      </header>

      <div className="flex items-center justify-center min-h-[200px]">
        {activeSales.length > 0 ? (
          <SalesHistory
            sales={activeSales}
            handleDeleteAgentSales={handleDeleteAgentSales}
            isAgentSaleDeleting={isAgentSaleDeleting}
            loading={loading}
          />
        ) : (
          <EmptyState />
        )}
      </div>

      <button
        onClick={nextAgentRequestSlide}
        className="fixed bottom-4 right-4 w-12 h-12 bg-blue-500 hover:bg-blue-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-200 flex items-center justify-center z-50"
      >
        <Plus color="white" />
      </button>
    </main>
  );
};

export default SalesRequestHistory;
