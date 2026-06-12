import TanTable from "@/components/General/TanTable";
import { Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { supplierOrders } from "@/utils/mockData";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

interface OrderHistoryTableProps {}

const OrderHistoryTable = ({}: OrderHistoryTableProps) => {
  const { supplierOrders } = useDashboardSelector();
  const { loadSupplierData, isSupplierOrdersLoading } = useDash();

  useEffect(() => {
    loadSupplierData();
  }, [loadSupplierData]);

  const columns = [
    {
      header: "Order Date",
      accessorKey: "order_date",
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
          <div className="text-sm ">
            {formattedDate.split(" ").slice(0, 3).join(" ")}
            <span className="text-xs text-[#B1B7BE]">
              {formattedDate.slice(formattedDate.indexOf(" "))}{" "}
            </span>
          </div>
        );
      },
    },
    {
      header: "Type",
      accessorKey: "payment_mode",
      cell: ({ row }: any) => (
        <Typography className="text-sm">{row.original.payment_mode}</Typography>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: ({ row }: any) => (
        <Typography className="text-sm">{row.original.customer}</Typography>
      ),
    },
    {
      header: "Sales Agent",
      accessorKey: "sales_agent",
      cell: ({ row }: any) => (
        <Typography className="text-sm">{row.original.sales_agent}</Typography>
      ),
    },
    {
      header: "Total",
      accessorKey: "total",
      cell: ({ row }: any) => (
        <Typography className="text-sm">{row.original.total}</Typography>
      ),
    },
    {
      header: "Due Date",
      accessorKey: "due_date",
      cell: ({ row }: any) => {
        const date = new Date(row.original.due_date);
        const formattedDate = `${date.getDate()}/${
          date.getMonth() + 1
        }/${date.getFullYear()}`;
        return <Typography className="text-sm">{formattedDate}</Typography>;
      },
    },
    {
      header: "Order Status",
      accessorKey: "order_status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded ${
            row.original.status === "Owing"
              ? "bg-red-400 text-red-700"
              : "bg-[#ECFDF3B2] text-[#027A48]"
          } bg-opacity-10`}
        >
          Approved
        </span>
      ),
    },
  ];

  return (
    <div className="px-10 py-4">
      <TanTable
        data={supplierOrders || []}
        columnData={columns}
        length={5}
        showDateFilter
        // showFilter
        showSearch
        loadingState={isSupplierOrdersLoading}
        dateField="order_date"
      />
    </div>
  );
};

export default OrderHistoryTable;
