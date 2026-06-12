import AddSalePage from "@/(shopperPages)/AddSalePage";
import { PageGuard } from "@/components/guards/roleGuard";
import AuthProvider from "@/context/authContext";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <AuthProvider>
      <PageGuard allowedUseCases={[USE_CASES.BOTH]}>
        <AddSalePage />
      </PageGuard>
    </AuthProvider>
  );
};

export default page;
