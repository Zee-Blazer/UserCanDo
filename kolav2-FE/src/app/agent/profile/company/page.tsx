import CompanyProfile from "@/(agentPages)/companyProfile";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <CompanyProfile />
    </PageGuard>
  );
};

export default page;
