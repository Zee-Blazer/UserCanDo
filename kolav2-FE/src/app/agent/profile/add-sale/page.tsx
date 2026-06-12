import AddSalePage from "@/(shopperPages)/AddSalePage";
import SalesPage from "@/(agentPages)/salesPage";
import AuthProvider from "@/context/authContext";
import React from "react";
import { USE_CASES } from "@/types";
import { PageGuard } from "@/components/guards/roleGuard";

const page = () => {
  return (
    <AuthProvider>
      <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
        <SalesPage screen="add" />
      </PageGuard>
    </AuthProvider>
  );
};

export default page;
