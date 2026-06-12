import { UIGuard } from "@/components/guards/roleGuard";
import { colors } from "@/constants/colors";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import { CirclePlus } from "lucide-react";
import React, { useMemo } from "react";

interface SalesAgentPageHeaderProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
  onClick: () => void;
}

const SalesAgentPageHeader = ({
  activeIndex,
  setActiveIndex,
  onClick,
}: SalesAgentPageHeaderProps) => {
  const {
    activeBusiness,
    salesAgents,
    ownerAgents,
    managerAgents,
    regularAgents,
    agentStock,
  } = useDashboardSelector();

  // Calculate counts for each tab
  const tabCounts = useMemo(() => {
    return {
      all: salesAgents?.length || 0,
      owner:
        ownerAgents?.length ||
        salesAgents?.filter(
          (agent) => agent.agent_role?.toLowerCase() === "owner"
        )?.length ||
        0,
      managers:
        managerAgents?.length ||
        salesAgents?.filter(
          (agent) => agent.agent_role?.toLowerCase() === "manager"
        )?.length ||
        0,
      agents:
        regularAgents?.length ||
        salesAgents?.filter(
          (agent) => agent.agent_role?.toLowerCase() === "sales agent"
        )?.length ||
        0,
      agentStock: agentStock?.length || 0,
    };
  }, [salesAgents, ownerAgents, managerAgents, regularAgents, agentStock]);

  const btnTexts = [
    { label: "All", count: tabCounts.all },
    { label: "Owner", count: tabCounts.owner },
    { label: "Managers", count: tabCounts.managers },
    { label: "Agents", count: tabCounts.agents },
    { label: "Agent Stock", count: tabCounts.agentStock },
  ];

  return (
    <div className="px-4 py-3">
      <Typography variant="small">
        {activeBusiness?.business_name || "Kola Market"} /{" "}
        <span className="font-medium">Sales Agent</span>
      </Typography>
      <header className="flex flex-col md:flex-row my-4 md:justify-between lg:items-center gap-4">
        <Typography className="font-bold">Sales Agent</Typography>
        <UIGuard permission="CREATE_SALES_AGENT">
          <div className="flex gap-6">
            <Button
              onClick={onClick}
              className="flex items-center justify-center normal-case gap-1 text-sm text-sec bg-transparent font-normal shadow-none p-0 hover:shadow-none"
            >
              <CirclePlus size={20} color={colors.sec} />
              Add an agent
            </Button>
          </div>
        </UIGuard>
      </header>
      <div className="flex gap-6 border-b-[1px] border-b-gray_2 -mx-4 px-4 overflow-x-auto">
        {btnTexts.map((btn, index) => {
          return (
            <Button
              key={index}
              className={`normal-case bg-transparent font-normal shadow-none p-0 py-3 hover:shadow-none whitespace-nowrap ${
                activeIndex === index
                  ? "text-black border-b-sec"
                  : "text-gray_4 border-b-transparent"
              } border-b-2 rounded-none min-w-fit`}
              onClick={() => setActiveIndex(index)}
            >
              <Typography className="flex items-center gap-2 text-sm">
                {btn.label}
                {btn.count !== undefined && (
                  <span className="bg-gray_5 bg-opacity-10 rounded-full text-xs px-2 py-1 min-w-6 h-6 flex items-center justify-center text-gray_6 font-semibold">
                    {btn.count}
                  </span>
                )}
              </Typography>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default SalesAgentPageHeader;
