"use client";
import TanTable from "@/components/General/TanTable";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { formatDate, formatTime } from "@/utils/helpers";
import { Typography } from "@material-tailwind/react";
import { useEffect } from "react";

const SalesLogs = () => {
  const { salesLog } = useDashboardSelector();
  const { loadSalesData, isSalesLogLoading } = useDash();

  useEffect(() => {
    loadSalesData();
  }, [loadSalesData]);

  const columns = [
    {
      header: "Date",
      accessorKey: "date",
      cell: ({ row }: any) => {
        const dateStr = formatDate(row.original.date);
        const timeStr = formatTime(row.original.date);

        return (
          <div className="flex gap-1 text-[#6F6F6F] items-center">
            <Typography className="font-normal text-sm">{dateStr}</Typography>
            <span className="text-sm">{" " + timeStr}</span>
          </div>
        );
      },
    },
    {
      header: "User",
      accessorKey: "username",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-1 text-[#6F6F6F] items-center">
            <Typography className="font-normal text-sm">
              {row.original.username}
            </Typography>
          </div>
        );
      },
    },
    {
      header: "Log",
      accessorKey: "log",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-1 text-[#6F6F6F] items-center">
            <Typography className="font-normal text-sm">
              {row.original.log}
            </Typography>
          </div>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "log",
      cell: ({ row }: any) => {
        return (
          <div className="flex gap-1 text-[#6F6F6F] items-center">
            <Typography className="font-normal text-sm">
              {row.original.log}
            </Typography>
          </div>
        );
      },
    },
  ];
  return (
    <div className="max-w-6xl space-y-4 px-4 py-3">
      <Typography>
        Kola Market Place /{" "}
        <span className="font-medium text-black">Sales</span>{" "}
      </Typography>
      <p className="text-xl font-semibold">Import Logs</p>
      <TanTable
        columnData={columns}
        data={salesLog}
        length={5}
        loadingState={isSalesLogLoading}
      />
    </div>
  );
};

export default SalesLogs;
