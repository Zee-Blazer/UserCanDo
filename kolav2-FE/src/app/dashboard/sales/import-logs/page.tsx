import SalesLogs from "@/components/dashboard/sales/salesLogs";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const Page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="VIEW_SALES"
    >
      <SalesLogs />
    </PageGuard>
  );
};

export default Page;
