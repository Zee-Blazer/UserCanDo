import Customers from "@/(pages)/customers";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const Page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="VIEW_ALL_CUSTOMERS"
    >
      <Customers />
    </PageGuard>
  );
};

export default Page;
