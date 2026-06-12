import { usePageData } from "@/api/hooks/usePageData";
import { BinIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { UIGuard } from "@/components/guards/roleGuard";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { Pen } from "lucide-react";

interface ManagersProps {
  onOpenModal: () => void;
  onClick: () => void;
}

const Managers = ({ onOpenModal, onClick }: ManagersProps) => {
  const { loadSalesAgentsData } = useDash();
  const { managerAgents, salesAgents } = useDashboardSelector();

  usePageData([loadSalesAgentsData]);

  const managerOnlyAgents =
    managerAgents && managerAgents.length > 0
      ? managerAgents
      : salesAgents?.filter(
          (agent) => agent.agent_role?.toLowerCase() === "manager"
        );

  const columns = [
    {
      header: "#",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Name",
      accessorKey: "name",
    },
    {
      header: "Date",
      accessorKey: "added_on",
      cell: ({ row }: any) => {
        const date = new Date(row.original.created_at);
        const formattedDate = `${date.toLocaleString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
        })} ${date.toLocaleString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })}`;
        return (
          <div className="text-sm">
            {formattedDate.split(" ").slice(0, 3).join(" ")}
            <span className="text-xs text-[#B1B7BE]">
              {formattedDate.slice(formattedDate.indexOf(" "))}{" "}
            </span>
          </div>
        );
      },
    },
    {
      header: "Phone Number",
      accessorKey: "phone_number",
    },
    {
      header: "Role",
      accessorKey: "agent_role",
      cell: ({ row }: any) => (
        <span className="inline-block w-32 text-center px-2 py-2 rounded-lg font-medium bg-[#F1F6FF] text-[#365FB6]">
          {row.original.agent_role}
        </span>
      ),
    },
    {
      header: "Latest Target",
      accessorKey: "latest_target",
    },
    {
      header: "Business",
      accessorKey: "business_name",
    },
    {
      header: "Action",
      accessorKey: "order",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <UIGuard permission="UPDATE_SALES_AGENT">
            <button onClick={onClick}>
              <Pen size={20} />
            </button>
          </UIGuard>
          <UIGuard permission="DELETE_SALES_AGENT">
            <div onClick={onOpenModal} className="cursor-pointer">
              <BinIcon color="#667085" />
            </div>
          </UIGuard>
        </div>
      ),
    },
  ];

  return (
    <div>
      <TanTable
        columnData={columns}
        data={managerOnlyAgents}
        showSearch
        length={5}
        showDateFilter
      />
    </div>
  );
};

export default Managers;
