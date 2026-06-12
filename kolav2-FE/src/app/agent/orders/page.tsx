import AgentOrdersPage from "@/(agentPages)/orders";
import React from "react";
import AuthProvider from "@/context/authContext";
import { USE_CASES } from "@/types";
import { PageGuard } from "@/components/guards/roleGuard";

const Page = () => {
  return (
    <AuthProvider>
      <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
        <AgentOrdersPage />
      </PageGuard>
    </AuthProvider>
  );
};

export default Page;
