import SalesInvoice from "@/(pages)/salesInvoice";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="VIEW_SALE_INFO"
    >
      <SalesInvoice />
    </PageGuard>
  );
};

export default page;
