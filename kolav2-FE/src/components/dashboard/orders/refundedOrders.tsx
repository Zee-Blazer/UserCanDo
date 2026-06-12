import { BinIcon, RecieptIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { Pen } from "lucide-react";
import { useEffect, useMemo } from "react";
import { FilterOrderState } from "./modals/filterOrderModal";
import { useDashboardSelector } from "@/Redux/selectors";
import { formatDate, formatTime } from "@/utils/helpers";
import { Typography } from "@material-tailwind/react";
import { useDash } from "@/context/dashboardContext";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

interface RefundedOrdersProps {
  onOpenModal: () => void;
  filters: FilterOrderState;
  onOpenFilterModal: () => void;
  setSelectedRow: (row: any) => void;
  onOpenEditDrawer: (data: CreateOrderProps) => void;
  onViewOrderDetails: (data: any) => void;
}

const RefundedOrders = ({
  onOpenModal,
  filters,
  onOpenFilterModal,
  setSelectedRow,
  onOpenEditDrawer,
  onViewOrderDetails,
}: RefundedOrdersProps) => {
  const { refundedOrders } = useDashboardSelector();
  const { loadOrdersByStatus, isOrdersLoading } = useDash();

  useEffect(() => {
    loadOrdersByStatus("refunded");
  }, [loadOrdersByStatus]);

  const filteredData = useMemo(() => {
    return refundedOrders.filter((order: any) => {
      let dateMatch = true;
      const orderDate = order?.created_at
        ? new Date(order.created_at)
        : new Date();

      if (filters?.start_date && filters?.end_date) {
        const startDate = new Date(filters.start_date);
        const endDate = new Date(filters.end_date);
        dateMatch = orderDate >= startDate && orderDate <= endDate;
      } else if (filters?.start_date) {
        const startDate = new Date(filters.start_date);
        dateMatch = orderDate >= startDate;
      } else if (filters?.end_date) {
        const endDate = new Date(filters.end_date);
        dateMatch = orderDate <= endDate;
      }

      let dueDateMatch = true;
      if (filters?.due_date) {
        dueDateMatch = order?.due_date === filters.due_date;
      }

      let orderNumberMatch = true;
      if (filters?.order_number && filters.order_number.trim() !== "") {
        orderNumberMatch = Boolean(
          order?.order_number &&
            order.order_number
              .toLowerCase()
              .includes(filters.order_number.toLowerCase())
        );
      }

      let paymentModeMatch = true;
      if (filters?.payment_mode) {
        paymentModeMatch = order?.payment_mode === filters.payment_mode;
      }

      return (
        dateMatch &&
        dueDateMatch &&
        orderNumberMatch &&
        paymentModeMatch &&
        (!filters?.customer_name ||
          filters.customer_name.trim() === "" ||
          (order?.customer_name &&
            order.customer_name
              .toLowerCase()
              .includes(filters.customer_name.toLowerCase()))) &&
        (!filters?.sale_type ||
          filters.sale_type.trim() === "" ||
          order?.sale_type === filters.sale_type) &&
        (!filters?.sales_agent_name ||
          filters.sales_agent_name.trim() === "" ||
          (order?.sales_agent_name &&
            order.sales_agent_name
              .toLowerCase()
              .includes(filters.sales_agent_name.toLowerCase())))
      );
    });
  }, [RefundedOrders, filters]);
  const columns = [
    {
      header: "#",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Order Number",
      accessorKey: "order_number",
    },
    {
      header: "Order Date",
      accessorKey: "created_at",
      cell: ({ row }: any) => {
        const dateStr = formatDate(row.original.created_at);
        const timeStr = formatTime(row.original.created_at);

        return (
          <div className="flex gap-1 items-center">
            <Typography className="font-normal text-sm text-black">
              {dateStr}
            </Typography>
            <span className="text-xs text-[#B1B7BE]">{" " + timeStr}</span>
          </div>
        );
      },
    },
    {
      header: "Type",
      accessorKey: "sale_type",
      cell: ({ row }: { row: { original: SalesOrderlistProps } }) => {
        return (
          <span className="text-gray_4">
            {row.original.sale_type ? row.original.sale_type : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Customer",
      accessorKey: "customer_name",
      cell: ({ row }: { row: { original: SalesOrderlistProps } }) => {
        return (
          <span className="text-gray_4">
            {row.original.customer_name ? row.original.customer_name : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Sales Agent",
      accessorKey: "sales_agent_name",
      cell: ({ row }: { row: { original: SalesOrderlistProps } }) => {
        return (
          <span className="text-gray_4">
            {row.original.sales_agent_name
              ? row.original.sales_agent_name
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Total",
      cell: ({ row }: any) => {
        const total =
          row.original.total_sale_amount ||
          row.original.products.reduce(
            (sum: number, product: any) => sum + (product.total_price || 0),
            0
          );

        return (
          <Typography variant="small" className="font-normal text-gray_4">
            <span>GHS</span>
            {""} {total.toFixed(2)}
          </Typography>
        );
      },
    },
    {
      header: "Due Date",
      accessorKey: "due_date",
      cell: ({ row }: { row: { original: SalesOrderlistProps } }) => {
        return (
          <span className="text-gray_4">
            {row.original.due_date ? row.original.due_date : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ row }: any) => (
        <span className="inline-block bg-[#FFF9F2] text-[#FF000D] w-32 text-center px-2 py-1 rounded-lg font-medium ">
          {row.original.status_history[0]?.status}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "order",
      cell: ({ row }: any) => (
        <div
          className="flex items-center gap-2"
          onClick={(e) => e.stopPropagation()}
        >
          <Link
            href={`${ROUTES.orderInvoice}?orderId=${row.original.id}`}
            onClick={(e) => e.stopPropagation()}
          >
            <RecieptIcon />
          </Link>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenEditDrawer(row.original);
            }}
          >
            <Pen size={20} className="text-[#667085]" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedRow(row.original);
              onOpenModal();
            }}
            className="cursor-pointer"
          >
            <BinIcon color="#667085" />
          </button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <TanTable
        columnData={columns}
        data={filteredData}
        showSearch
        length={5}
        showBorder
        showDateFilter
        customFilterButton={onOpenFilterModal}
        loadingState={isOrdersLoading}
        onRowClick={(row: any) => onViewOrderDetails(row.original)}
      />
    </div>
  );
};

export default RefundedOrders;
