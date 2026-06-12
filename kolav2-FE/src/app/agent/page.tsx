"use client";
import Home from "@/(agentPages)/home";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <Home />
    </PageGuard>
  );
};

export default page;
