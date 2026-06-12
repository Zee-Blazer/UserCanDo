import CreditInvoice from "@/(pages)/creditInvoice";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}>
      <CreditInvoice />
    </PageGuard>
  );
};

export default page;
