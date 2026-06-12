import TanTable from "@/components/General/TanTable";
import { Button } from "@material-tailwind/react";
import React from "react";

interface SalesBySupplierTableProps {
  data: SalesSupplierReportProps[];
}

const SalesBySupplierTable = ({ data }: SalesBySupplierTableProps) => {
  const columns = [
    {
      header: "No",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Supplier Name",
      accessorKey: "supplier_name",
    },
    {
      header: "Total Sales Value",
      accessorKey: "total_sales_value",
    },
    {
      header: "Sales Receipts",
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
      header: "Product Ordered",
      accessorKey: "product_ordered",
    },
    {
      header: "Unique Product",
      accessorKey: "unique_product",
    },
    {
      header: "Most Frequently Sold Products",
      accessorKey: "most_frequently_sold_products",
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

export default SalesBySupplierTable;
