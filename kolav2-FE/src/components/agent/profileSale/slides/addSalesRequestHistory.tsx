"use client";

import EmptyState from "@/components/shoppers/agents/emptyState";
import { FormInput } from "@/components/General/form";
import { Plus, Search } from "lucide-react";
import { useAuth } from "@/context/authContext";
import { Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useAgentSelector } from "@/Redux/selectors";
import { useAgent } from "@/context/agentContext";
import SalesHistory from "../../sales/history";

const AddSalesRequestHistory = () => {
  const { nextAgentRequestSlide } = useAuth();
  const { sales } = useAgentSelector();
  const { loadAgentSalesData, handleDeleteAgentSales, isAgentSaleDeleting } =
    useAgent();

  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadAgentSalesData();
  }, [loadAgentSalesData]);

  return (
    <main className="relative w-full">
      <header className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-0 mb-4">
        <Typography className="text-xl font-medium">Add Sale</Typography>

        <FormInput
          placeholder="Search..."
          icon={<Search color="#A6ADB6" />}
          iconPosition="left"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          paddingY="3"
          className="w-96 rounded-xl bg-white"
        />
      </header>

      <div className="flex items-center justify-center">
        {sales && sales.length > 0 ? (
          <SalesHistory
            sales={sales}
            handleDeleteAgentSales={handleDeleteAgentSales}
            isAgentSaleDeleting={isAgentSaleDeleting}
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

export default AddSalesRequestHistory;
