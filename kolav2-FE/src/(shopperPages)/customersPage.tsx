"use client";

import { useEffect } from "react";
import CustomerList from "@/components/shoppers/customers/customerList";
import EmptyState from "@/components/shoppers/customers/emptyState";
import { useRouter } from "next/navigation";
import {
  useAgentSelector,
  useAuthSelector,
  useDashboardSelector,
} from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { useAgent } from "@/context/agentContext";
import { USE_CASES, UseCase } from "@/types";

const CustomersPage = () => {
  const { loginData } = useAuthSelector();
  const router = useRouter();

  const USE_CASE = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = USE_CASE === USE_CASES.AGENT;

  const { customers } = isAgent ? useAgentSelector() : useDashboardSelector();

  const loadData = isAgent
    ? useAgent().loadAgentCustomersData
    : useDash().loadCustomersData;

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleBack = () => {
    if (window.history.length > 1) {
      router.back();
    } else {
      router.push("/shopper");
    }
  };

  return (
    <div>
      <p className="text-xl font-medium mb-6">Customers</p>
      {customers.length === 0 ? (
        <EmptyState />
      ) : (
        <CustomerList customers={customers} onBack={handleBack} />
      )}
    </div>
  );
};

export default CustomersPage;
