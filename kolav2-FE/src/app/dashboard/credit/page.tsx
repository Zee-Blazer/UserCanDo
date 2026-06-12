import Credit from "@/(pages)/credit";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}>
      <Credit />
    </PageGuard>
  );
};

export default page;
