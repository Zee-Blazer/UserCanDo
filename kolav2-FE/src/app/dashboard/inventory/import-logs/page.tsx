import ImportLogs from "@/(pages)/importLogs";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const Page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="CREATE_PRODUCT"
    >
      <ImportLogs />
    </PageGuard>
  );
};

export default Page;
