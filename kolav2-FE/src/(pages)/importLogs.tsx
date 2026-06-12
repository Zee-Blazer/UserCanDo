"use client";
import TanTable from "@/components/General/TanTable";
import { inventoryLogs } from "@/utils/mockData";
import { Typography } from "@material-tailwind/react";

const ImportLogs = () => {
  const columns = [
    {
      header: "Date",
      accessorKey: "Date",
    },
    {
      header: "User",
      accessorKey: "user",
    },
    {
      header: "Log",
      accessorKey: "Log",
    },
    {
      header: "Action",
      accessorKey: "Action",
    },
  ];
  return (
    <div className="px-4 py-3">
      <Typography>
        Kola Market Place /{" "}
        <span className="font-medium text-black">Inventory</span>{" "}
      </Typography>
      <TanTable columnData={columns} data={inventoryLogs} length={5} />
    </div>
  );
};

export default ImportLogs;
