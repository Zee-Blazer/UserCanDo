import AddCustomerPage from "@/(shopperPages)/AddCustomerPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.BOTH]}>
      <AddCustomerPage />
    </PageGuard>
  );
};

export default page;
