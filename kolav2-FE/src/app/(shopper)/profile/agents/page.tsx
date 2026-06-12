import AgentsPage from "@/(shopperPages)/agentsPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.BOTH]}>
      <AgentsPage />
    </PageGuard>
  );
};

export default page;
