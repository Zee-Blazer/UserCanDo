import React from "react";
import BulkUpload from "../../../../(pages)/bulkUpload";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="CREATE_PRODUCT"
    >
      <BulkUpload />
    </PageGuard>
  );
};

export default page;
