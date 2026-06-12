import TanTable from "@/components/General/TanTable";
import { Button } from "@material-tailwind/react";
import React from "react";

interface SalesByRegionTableProps {
  data: SalesRegionReportProps[];
}

const SalesByRegionTable = ({ data }: SalesByRegionTableProps) => {
  const columns = [
    {
      header: "No",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Supplier",
      accessorKey: "supplier",
    },
    {
      header: "Sales Between",
      accessorKey: "sales_between",
    },
    {
      header: "Receipts",
      accessorKey: "sales_receipts",
      cell: ({ row }: any) => (
        <Button
          variant="text"
          className="normal-case underline font-normal hover:bg-transparent p-2"
        >
          Reciept
        </Button>
      ),
    },
    {
      header: "Sales Agent",
      accessorKey: "sales_agent",
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

export default SalesByRegionTable;
