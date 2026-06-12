import TanTable from "@/components/General/TanTable";
import React from "react";
import {
  getStatusDisplay,
  getStatusStyle,
  getPaymentStatusDisplay,
  getPaymentStatusStyle,
  formatNumber,
} from "@/utils/helpers";

interface OrderData {
  date?: string;
  customer?: string;
  agent?: string;
  total_due?: number;
  order_status?:
    | "approved"
    | "out for delivery"
    | "delivered"
    | "pending"
    | "cancelled"
    | string;
  status?: "Owing" | "Paid" | string;
}

interface TopOrdersTableProps {
  data?: OrderData[];
}

const TopOrdersTable: React.FC<TopOrdersTableProps> = ({ data = [] }) => {
  const columns = [
    {
      header: "No",
      cell: (item: any) => <span>#{item?.row?.index + 1}</span>,
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
      header: "Sales Agent",
      accessorKey: "agent",
    },
    {
      header: "Order Value",
      accessorKey: "total_due",
      cell: ({ row }: { row: { original: OrderData } }) => (
        <span>GHS {`${formatNumber(row?.original?.total_due ?? 0)}`}</span>
      ),
    },
    {
      header: "Order Status",
      accessorKey: "order_status",
      cell: ({ row }: { row: { original: OrderData } }) => (
        <span
          className={`px-2 py-1 rounded capitalize ${getStatusStyle(
            row?.original?.order_status
          )}`}
        >
          {getStatusDisplay(row?.original?.order_status)}
        </span>
      ),
    },
    {
      header: "Payment Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: OrderData } }) => (
        <span
          className={`px-2 py-1 rounded ${getPaymentStatusStyle(
            row?.original?.status
          )}`}
        >
          {getPaymentStatusDisplay(row?.original?.status)}
        </span>
      ),
    },
  ];

  return (
    <div>
      <TanTable
        columnData={columns}
        data={data ?? []}
        showSearch
        length={5}
        showDateFilter
        dateField="date"
        showFilter={false}
      />
    </div>
  );
};

export default TopOrdersTable;
