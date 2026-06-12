import React, { useEffect, useState } from "react";
import { Typography, Radio, Button } from "@material-tailwind/react";
import { BluePencil } from "@/assets/svg";
import {
  formatDate,
  getCurrentAgentRequestStatus,
  getHistoryItemComment,
  getHistoryItemDate,
} from "@/utils/helpers";

interface HistoryProps {
  onOpenModal: () => void;
  agentRequestData: AgentRequestProps;
}

const History = ({ onOpenModal, agentRequestData }: HistoryProps) => {
  const [statusSteps, setStatusSteps] = useState<AgentRequestHistoryProps[]>(
    []
  );

  useEffect(() => {
    if (agentRequestData && agentRequestData.request_history) {
      const steps = [
        {
          status: "Request Placed",
          isCompleted: agentRequestData.request_history.some(
            (h) => h.status === "placed"
          ),
          request_date: getHistoryItemDate(agentRequestData.request_history, "placed"),
          comment: getHistoryItemComment(
            agentRequestData.request_history,
            "placed"
          ),
        },
        {
          status: "Approved",
          isCompleted: agentRequestData.request_history.some(
            (h) => h.status === "approved"
          ),
          request_date: getHistoryItemDate(
            agentRequestData.request_history,
            "approved"
          ),
          comment: getHistoryItemComment(
            agentRequestData.request_history,
            "approved"
          ),
        },
        {
          status: "Delivered",
          isCompleted: agentRequestData.request_history.some(
            (h) => h.status === "delivered"
          ),
          request_date: getHistoryItemDate(
            agentRequestData.request_history,
            "delivered"
          ),
          comment: getHistoryItemComment(
            agentRequestData.request_history,
            "delivered"
          ),
        },
        {
          status: "Rejected",
          isCompleted: agentRequestData.request_history.some(
            (h) => h.status === "rejected"
          ),
          request_date: getHistoryItemDate(
            agentRequestData.request_history,
            "rejected"
          ),
          comment: getHistoryItemComment(
            agentRequestData.request_history,
            "rejected"
          ),
        },
      ];
      setStatusSteps(steps);
    }
  }, [agentRequestData, agentRequestData.request_history]);

  return (
    <main>
      <section className="bg-[#F8F9FA] -mx-12 p-6">
        <Typography>
          <span className="text-gray-500 font-medium">
            (Request ID: {agentRequestData?.request_number})
          </span>
        </Typography>
      </section>

      <div className="mt-6 flex flex-col">
        {statusSteps.map((step, index) => (
          <div key={index} className="flex items-start gap-4 relative">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center z-10">
                <div className="flex flex-col items-center">
                  <Radio
                    name="status"
                    color="orange"
                    checked={step.isCompleted}
                    className="relative z-10"
                    ripple={false}
                    containerProps={{
                      className: "p-0",
                    }}
                    crossOrigin=""
                  />
                </div>
              </div>
              {index !== statusSteps.length - 1 && (
                <div className="h-16 w-px bg-gray_2 my-1" />
              )}
            </div>
            <div className="flex flex-col gap-1 flex-grow">
              <Typography
                className={`font-normal ${
                  step.isCompleted ? "text-gray-900" : "text-gray-500 italic"
                }`}
              >
                {step.status}
              </Typography>
              {step.request_date && (
                <Typography className="text-sm text-gray-500 mt-1">
                  {step.request_date}
                </Typography>
              )}
              {step.comment && (
                <Typography className="text-sm text-gray-500">
                  {step.comment}
                </Typography>
              )}
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onOpenModal}
          className="px-5 flex items-center normal shadow-none normal-case border border-gray-200 gap-3 py-[10px] rounded-lg text-sm font-medium text-center bg-[#F8FAF8] text-pry2 hover:opacity-90"
        >
          <BluePencil />
          Update
        </Button>
      </div>
    </main>
  );
};

export default History;
