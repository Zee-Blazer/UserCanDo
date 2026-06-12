import ProfilePage from "@/(shopperPages)/profilePage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const Page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <ProfilePage />
    </PageGuard>
  );
};

export default Page;
