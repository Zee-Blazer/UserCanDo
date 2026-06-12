import { ThumbsDown, ThumbsUp } from "@/assets/svg";
import {
  getAgentRequestStatusClasses,
  getCurrentAgentRequestStatus,
} from "@/utils/helpers";
import { Button } from "@material-tailwind/react";
import React from "react";

interface StatusProps {
  onOpenModal: (statusData: any) => void;
  agentRequestData: AgentRequestProps;
}

const Status = ({ onOpenModal, agentRequestData }: StatusProps) => {
  const currentStatus = getCurrentAgentRequestStatus(
    agentRequestData?.request_history || []
  );
  const statusClasses = getAgentRequestStatusClasses(currentStatus);

  const createStatusData = (status: string) => ({
    status,
    created_at: new Date().toISOString(),
    comment: "",
  });

  return (
    <main className="flex gap-3 items-center">
      <Button
        className={` p-2 normal-case shadow-none font-medium text-sm ${statusClasses} capitalize`}
      >
        {currentStatus}
      </Button>
      <Button
        variant="outlined"
        className="bg-none border normal-case gap-1 p-2 items-center flex border-[#F7E9E8] shadow-none"
        onClick={() => onOpenModal(createStatusData("rejected"))}
        disabled={currentStatus === "rejected"}
      >
        <ThumbsDown />
        <span className="font-medium text-sm text-[#B42318] ">Reject</span>
      </Button>
      <Button
        className="border normal-case gap-1 p-2 items-center flex shadow-none bg-[#027A48]"
        onClick={() => onOpenModal(createStatusData("approved"))}
        disabled={currentStatus === "approved"}
      >
        <ThumbsUp />
        <span className="font-medium text-sm text-white">Approve</span>
      </Button>
    </main>
  );
};

export default Status;
