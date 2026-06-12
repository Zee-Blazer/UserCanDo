import TanTable from "@/components/General/TanTable";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import React, { useMemo } from "react";
import {
  formatDate,
  formatTime,
  getPaymentStatusDisplay,
  getPaymentStatusStyle,
} from "@/utils/helpers";
import { usePageData } from "@/api/hooks/usePageData";
import { Typography } from "@material-tailwind/react";

interface TotalSalesTableProps {
  salesData?: SalesListProps[];
}

const TotalSalesTable = ({ salesData }: TotalSalesTableProps) => {
  const { sales } = useDashboardSelector();
  const { loadCustomersData, loadSalesAgentsData, loadProductsData } =
    useDash();

  const baseData = useMemo(() => {
    return salesData ?? sales ?? [];
  }, [salesData, sales]);

  usePageData([loadSalesAgentsData, loadCustomersData, loadProductsData]);

  const columns = [
    {
      header: "No",
      cell: (item: any) => <span className="">#{item.row.index + 1}</span>,
    },
    {
      header: "Date",
      accessorKey: "sale_date",
      cell: ({ row }: any) => {
        const dateStr = formatDate(row.original.sale_date);
        const timeStr = formatTime(row.original.sale_date);

        return (
          <div className="whitespace-nowrap flex gap-1 items-center">
            <Typography className="font-normal text-sm text-black">
              {dateStr}
            </Typography>
            <span className="text-xs text-[#B1B7BE]">{" " + timeStr}</span>
          </div>
        );
      },
    },
    {
      header: "Customer",
      accessorKey: "customer_name",
      cell: ({ row }: { row: { original: SalesListProps } }) => (
        <span className="font-medium">
          {row?.original?.customer_name ?? "N/A"}
        </span>
      ),
    },
    {
      header: "Agent",
      accessorKey: "sales_agent_name",
      cell: ({ row }: { row: { original: SalesListProps } }) => (
        <span>{row?.original?.sales_agent_name ?? "N/A"}</span>
      ),
    },
    {
      header: "# Product",
      cell: ({ row }: { row: { original: SalesListProps } }) => {
        const productCount = row?.original?.products?.length ?? 0;
        return <span>{productCount || "N/A"}</span>;
      },
    },
    {
      header: "Total Due",
      accessorKey: "total_sale_amount",
      cell: ({ row }: { row: { original: SalesListProps } }) => (
        <span className="text-gray_4">
          GHS {row?.original?.total_sale_amount ?? "N/A"}
        </span>
      ),
    },
    {
      header: "Sale Type",
      accessorKey: "sale_type",
      cell: ({ row }: { row: { original: SalesListProps } }) => (
        <span
          className={`px-2 py-1 rounded-md ${
            row?.original?.sale_type === "credit"
              ? "bg-[#D1E0FF] text-[#365FB6]"
              : "bg-[#ECFDF3] text-[#027A48]"
          } bg-opacity-90`}
        >
          {row?.original?.sale_type ?? "N/A"}
        </span>
      ),
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: SalesListProps } }) => (
        <span
          className={`px-2 py-1 rounded-md ${getPaymentStatusStyle(
            row?.original?.status
          )}`}
        >
          {getPaymentStatusDisplay(row?.original?.status)}
        </span>
      ),
    },
    {
      header: "Top Credit Score",
      cell: ({ row }: { row: { original: SalesListProps } }) => (
        <span className="bg-gray-100 px-2 py-1 rounded-md">N/A</span>
      ),
    },
  ];

  return (
    <div>
      <TanTable
        data={baseData ?? []}
        columnData={columns}
        showSearch
        length={5}
        showDateFilter
        dateField="sale_date"
        showFilter={false}
      />
    </div>
  );
};

export default TotalSalesTable;
