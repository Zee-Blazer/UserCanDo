import OrderDetails from "@/(agentPages)/orderDetails";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <OrderDetails />
    </PageGuard>
  );
};

export default page;
