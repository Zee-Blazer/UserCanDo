import OrderType from "@/(pages)/orderType";
import { PageGuard } from "@/components/guards/roleGuard";
import AuthProvider from "@/context/authContext";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <AuthProvider>
      <PageGuard allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}>
        <OrderType />
      </PageGuard>
    </AuthProvider>
  );
};

export default page;
