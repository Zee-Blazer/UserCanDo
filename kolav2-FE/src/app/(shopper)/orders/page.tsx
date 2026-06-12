import OrdersPage from "@/(shopperPages)/ordersPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

export default function Orders() {
  return (
    <PageGuard allowedUseCases={[USE_CASES.BUYER, USE_CASES.BOTH]}>
      <OrdersPage />
    </PageGuard>
  );
}
