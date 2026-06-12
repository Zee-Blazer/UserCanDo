import CustomersPage from "@/(shopperPages)/customersPage";
import { PageGuard } from "@/components/guards/roleGuard";
import AgentProvider from "@/context/agentContext";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <AgentProvider>
      <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <CustomersPage />
      </PageGuard>
    </AgentProvider>
  );
};

export default page;
