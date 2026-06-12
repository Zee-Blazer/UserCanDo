import React from "react";
import AuthProvider from "@/context/authContext";
import Request from "@/(agentPages)/requestPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";

const Page = () => {
  return (
    <AuthProvider>
      <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
        <Request />
      </PageGuard>
    </AuthProvider>
  );
};

export default Page;
