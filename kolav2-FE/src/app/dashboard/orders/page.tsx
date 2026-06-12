import Orders from "@/(pages)/orders";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const Page = () => {
  return (
    <PageGuard
      allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}
      permission="VIEW_SALES"
    >
      {/* <Orders /> */}
      <Orders />
    </PageGuard>
  );
};

export default Page;
