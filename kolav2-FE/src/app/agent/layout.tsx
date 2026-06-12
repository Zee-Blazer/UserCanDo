"use client";
import AgentNavigation from "@/components/agentLayout/agentNavigation";
import { PageGuard } from "@/components/guards/roleGuard";
import AgentProvider from "@/context/agentContext";
import AuthProvider from "@/context/authContext";
import DashboardProvider from "@/context/dashboardContext";
import { USE_CASES } from "@/types";
import React from "react";

const AgentLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthProvider>
      <AgentProvider>
        <PageGuard allowedUseCases={[USE_CASES.AGENT]}>
          <div className="h-screen bg-gray-50 overflow-auto">
            <AgentNavigation />
            <main className="container mx-auto px-4 py-8">{children}</main>
          </div>
        </PageGuard>
      </AgentProvider>
    </AuthProvider>
  );
};

export default AgentLayout;
