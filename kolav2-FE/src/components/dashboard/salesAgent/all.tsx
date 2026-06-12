import { BinIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { UIGuard } from "@/components/guards/roleGuard";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { displayValue, formatNumber, formatPhoneNumber } from "@/utils/helpers";
import { Typography } from "@material-tailwind/react";
import { Pen } from "lucide-react";
import { useEffect, useState } from "react";

interface AllProps {
  onEditButtonClick: (data: SalesAgentListProps) => void;
  handleDelete: (row: any) => void;
}

const All = ({ onEditButtonClick, handleDelete }: AllProps) => {
  const { loadSalesAgentsData } = useDash();
  const { salesAgents } = useDashboardSelector();
  const [selectedRow, setSelectedRow] = useState<any>(null);

  useEffect(() => {
    loadSalesAgentsData();
  }, [loadSalesAgentsData]);

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
      accessorKey: "phoneNumber",
      cell: ({ row }: any) => {
        const phoneNumber = row.original?.phone_number;
        const formattedPhone = phoneNumber
          ? formatPhoneNumber(phoneNumber)
          : "N/A";

        return (
          <Typography className="text-[#667085] text-sm">
            {displayValue(formattedPhone)}
          </Typography>
        );
      },
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }: { row: { original: CreateSalesAgentProps } }) => (
        <span
          className={`inline-block w-32 text-center px-2 py-2 rounded-lg font-medium ${
            row.original.agent_role === "manager"
              ? "bg-pry text-pry"
              : row.original.agent_role === "agent stock"
              ? "bg-orange-600 text-orange-600"
              : row.original.agent_role === "Owner"
              ? "bg-green_pry text-green_pry"
              : row.original.agent_role === "agent"
              ? "bg-yellow_pry text-yellow_pry"
              : "bg-pry2 text-pry2"
          } bg-opacity-10 capitalize`}
        >
          {row.original.agent_role}
        </span>
      ),
    },
    {
      header: "Latest Target",
      accessorKey: "latest_target",
      cell: ({ row }: any) => (
        <span>GHS {formatNumber(row?.original?.latest_target || 0)}</span>
      ),
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
            <button>
              <Pen
                onClick={() => {
                  onEditButtonClick && onEditButtonClick(row.original);
                  setSelectedRow(row.original);
                }}
                size={20}
              />
            </button>
          </UIGuard>
          <UIGuard permission="DELETE_SALES_AGENT">
            <div onClick={() => handleDelete(row)} className="cursor-pointer">
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
        data={salesAgents || []}
        showSearch
        length={5}
        showDateFilter
      />
    </div>
  );
};

export default All;
