"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDashboardSelector } from "@/Redux/selectors";
import AgentRequestInvoiceComponent from "@/components/dashboard/agentRequest/agentRequestInvoiceComponent";
import { useDash } from "@/context/dashboardContext";

const AgentRequestInvoice = () => {
  const searchParams = useSearchParams();
  const agentRequestId = searchParams.get("agentRequestId");
  const { loadAgentRequestsData } = useDash();
  const { agentRequests } = useDashboardSelector();
  const [agentRequestData, setAgentRequestData] = useState<any>(null);

  useEffect(() => {
    loadAgentRequestsData();
  }, [loadAgentRequestsData]);

  useEffect(() => {
    if (agentRequestId && agentRequests && agentRequests.length > 0) {
      const selectedAgentRequest = agentRequests.find(
        (agentRequest: any) => agentRequest?.id === agentRequestId
      );
      if (selectedAgentRequest) {
        setAgentRequestData(selectedAgentRequest);
      }
    }
  }, [agentRequestId, agentRequests]);

  return (
    <AgentRequestInvoiceComponent
      title="Agent Requests Invoice"
      itemData={agentRequestData}
    />
  );
};

export default AgentRequestInvoice;
