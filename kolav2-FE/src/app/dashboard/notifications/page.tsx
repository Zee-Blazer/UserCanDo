import Notification from "@/(pages)/notification";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const Page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}>
      <Notification />
    </PageGuard>
  );
};

export default Page;
