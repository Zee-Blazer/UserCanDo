"use client";
import LeaderboardPage from "@/(agentPages)/leaderBoardPage";
import { PageGuard } from "@/components/guards/roleGuard";
import { USE_CASES } from "@/types";
import React from "react";

const page = () => {
  return (
    <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
      <LeaderboardPage />
    </PageGuard>
  );
};

export default page;
