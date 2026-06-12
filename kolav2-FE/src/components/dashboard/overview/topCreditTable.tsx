import TanTable from "@/components/General/TanTable";
import { formatNumber } from "@/utils/helpers";
import { topCreditData } from "@/utils/mockData";
import React from "react";
import TableCategoryFilter from "./views/tableCategoryFilter";

const TopCreditSection = () => {
  const columns = [
    {
      header: "No",
      cell: (item: any) => <span className="">#{item.row.index + 1}</span>,
    },
    {
      header: "Date",
      accessorKey: "date",
    },
    {
      header: "Customer",
      accessorKey: "customer",
    },
    {
      header: "Agent",
      accessorKey: "agent",
    },
    {
      header: "Last amount paid",
      accessorKey: "last_amount_paid",
      cell: ({ row }: any) =>
        `GHS ${formatNumber(row.original?.last_amount_paid)}`,
    },
    {
      header: "Total credit",
      accessorKey: "total_credit",
    },
    {
      header: "Outstanding",
      accessorKey: "outstanding",
    },
  ];

  return (
    <div>
      <TableCategoryFilter />
      <TanTable
        columnData={columns}
        data={topCreditData}
        showSearch
        length={5}
        showDateFilter
        showFilter
      />
    </div>
  );
};

export default TopCreditSection;
