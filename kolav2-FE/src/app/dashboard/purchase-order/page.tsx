import PurchaseOrder from "@/(pages)/purchaseOrder";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="VIEW_ALL_PURCHASE_ORDERS"
    >
      <PurchaseOrder />
    </PageGuard>
  );
};

export default page;
