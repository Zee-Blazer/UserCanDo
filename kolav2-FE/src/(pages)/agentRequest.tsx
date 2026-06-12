"use client";
import AddAgentRequestFlyout from "@/components/dashboard/agentRequest/addAgentRequestFlyout";
import AgentPageHeader from "@/components/dashboard/agentRequest/agentPageHeader";
import AgentRequestDetailsFlyout from "@/components/dashboard/agentRequest/agentRequestDetailsFlyout";
import EditAgentRequestFlyout from "@/components/dashboard/agentRequest/editAgentRequestFlyout";
import Requests from "@/components/dashboard/agentRequest/requests";
import { useState } from "react";

const AgentRequest = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
  const [isEditRightDrawerOpen, setIsEditRightDrawerOpen] = useState(false);
  const [isDetailsRightDrawerOpen, setIsDetailsRightDrawerOpen] =
    useState(false);

  const [agentRequestDetails, setAgentRequestDetails] =
    useState<AgentRequestProps | null>(null);

  const handleEditRequest = (data: AgentRequestProps) => {
    setAgentRequestDetails(data);
    setIsDetailsRightDrawerOpen(false);
    setTimeout(() => {
      setIsEditRightDrawerOpen(true);
    }, 100);
  };

  const handleOpenDetails = (data: AgentRequestProps) => {
    setAgentRequestDetails(data);
    setIsDetailsRightDrawerOpen(true);
  };

  return (
    <div className="border-[1px] border-gray_2 rounded-md p-4">
      <AgentPageHeader
        activeIndex={activeTabIndex}
        setActiveIndex={setActiveTabIndex}
        onClick={() => {
          setIsRightDrawerOpen(true);
        }}
      />
      {activeTabIndex === 0 && (
        <Requests
          onEditButtonClick={handleEditRequest}
          openDetailsModal={handleOpenDetails}
        />
      )}
      <AddAgentRequestFlyout
        isRightDrawerOpen={isRightDrawerOpen}
        closeFlyout={() => {
          setIsRightDrawerOpen(false);
        }}
      />
      <EditAgentRequestFlyout
        isEditRightDrawerOpen={isEditRightDrawerOpen}
        closeFlyout={() => {
          setIsEditRightDrawerOpen(false);
        }}
        data={agentRequestDetails || null}
      />
      {agentRequestDetails && (
        <AgentRequestDetailsFlyout
          isDetailsRightDrawerOpen={isDetailsRightDrawerOpen}
          closeFlyout={() => {
            setIsDetailsRightDrawerOpen(false);
          }}
          data={agentRequestDetails}
        />
      )}
    </div>
  );
};

export default AgentRequest;
