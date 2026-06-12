import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const Page = () => {
  return <PageGuard allowedUseCases={[USE_CASES.VENDOR, USE_CASES.BOTH]}>Page</PageGuard>;
};

export default Page;
