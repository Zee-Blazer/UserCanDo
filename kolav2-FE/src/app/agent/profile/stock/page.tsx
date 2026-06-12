import StockPage from "@/(shopperPages)/stockPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <StockPage />
    </PageGuard>
  );
};

export default page;
