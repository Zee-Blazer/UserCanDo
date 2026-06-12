import SalesBulkUpload from "@/components/dashboard/sales/salesBulkUpload";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="CREATE_SALE"
    >
      <SalesBulkUpload />
    </PageGuard>
  );
};

export default page;
