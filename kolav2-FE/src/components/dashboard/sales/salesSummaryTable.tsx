import TanTable from "@/components/General/TanTable";
import React from "react";

interface SalesSummaryTableProps {
  data: SalesSummaryReportProps[];
}

const SalesSummaryTable = ({ data }: SalesSummaryTableProps) => {
  const columns = [
    {
      header: "No",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Period",
      accessorKey: "period",
    },
    {
      header: "Number of Sales",
      accessorKey: "number_of_sales",
    },
    {
      header: "Product Sold",
      accessorKey: "number_of_products_sold",
    },
    {
      header: "Total Value",
      accessorKey: "total_value",
    },
  ];

  return (
    <div>
      <TanTable
        columnData={columns}
        data={data}
        showSearch
        length={5}
        showDateFilter
        showFilter
      />
    </div>
  );
};

export default SalesSummaryTable;
