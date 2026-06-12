import CreditPage from "@/(shopperPages)/creditPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

export default function Credit() {
  return (
    <PageGuard allowedUseCases={[USE_CASES.BUYER, USE_CASES.BOTH]}>
      <CreditPage />
    </PageGuard>
  );
}
