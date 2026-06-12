import TanTable from "@/components/General/TanTable";
import { formatNumber } from "@/utils/helpers";
import { sellingAgentData } from "@/utils/mockData";
import React from "react";

const TopSellingProductSection = () => {
  const columns = [
    {
      header: "Rank",
      cell: (item: any) => <span className="">#{item.row.index + 1}</span>,
    },
    {
      header: "Business",
      accessorKey: "business",
    },
    {
      header: "# Sales",
      accessorKey: "sales",
    },
    {
      header: "Sales value (GHS)",
      accessorKey: "sales_value",
      cell: ({ row }: any) => formatNumber(row.original.sales_value),
    },
  ];

  return (
    <div>
      <TanTable
        columnData={columns}
        data={sellingAgentData}
        showSearch
        length={5}
        showDateFilter
        showFilter
      />
    </div>
  );
};

export default TopSellingProductSection;
