import { BinIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { Pen, ScrollText } from "lucide-react";
import { useEffect, useMemo } from "react";
import { FilterOrderState } from "./modals/filterOrderModal";
import { useDashboardSelector } from "@/Redux/selectors";
import { Typography } from "@material-tailwind/react";
import { formatDate, formatTime } from "@/utils/helpers";
import { useDash } from "@/context/dashboardContext";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";
import { UIGuard } from "@/components/guards/roleGuard";
import { useDispatch } from "react-redux";
import { setActiveOrderStatus } from "@/Redux/features/dashboardSlice";
import { useRouter } from "next/navigation";

export interface OrdersTableProps {
  onOpenModal: () => void;
  filters: FilterOrderState;
  onOpenFilterModal: () => void;
  setSelectedRow: (row: any) => void;
  onOpenEditDrawer: (data: any) => void;
  onViewOrderDetails: (data: any) => void;
  orderType:
    | "new"
    | "approved"
    | "out for delivery"
    | "delivered"
    | "cancelled"
    | "invoice";
  onRefresh?: () => void;
  isRefreshing?: boolean;
}

const filterOrders = (orders: any[], filters: FilterOrderState) => {
  if (!orders || orders.length === 0) return [];

  return orders.filter((order: any) => {
    let dateMatch = true;
    if (filters?.start_date || filters?.end_date) {
      const orderDate = order?.created_at
        ? new Date(order.created_at)
        : new Date();

      if (filters?.start_date && filters?.end_date) {
        const startDate = new Date(filters.start_date);
        const endDate = new Date(filters.end_date);
        dateMatch = orderDate >= startDate && orderDate <= endDate;
      } else if (filters?.start_date) {
        dateMatch = orderDate >= new Date(filters.start_date);
      } else if (filters?.end_date) {
        dateMatch = orderDate <= new Date(filters.end_date);
      }
    }

    const matchesField = (orderField: string, filterValue: string) => {
      if (!filterValue || filterValue.trim() === "") return true;
      return orderField?.toLowerCase().includes(filterValue.toLowerCase());
    };

    const matchesExactField = (orderField: string, filterValue: string) => {
      if (!filterValue) return true;
      return orderField === filterValue;
    };

    return (
      dateMatch &&
      matchesExactField(order?.due_date, filters?.due_date) &&
      matchesField(order?.order_number, filters?.order_number) &&
      matchesExactField(order?.payment_mode, filters?.payment_mode) &&
      matchesField(order?.customer_name, filters?.customer_name) &&
      matchesExactField(order?.sale_type, filters?.sale_type) &&
      matchesField(order?.sales_agent_name, filters?.sales_agent_name)
    );
  });
};

const getStatusStyling = (status: string) => {
  const statusStyles = {
    delivered: "bg-[#F1F6FF] text-[#365FB6]",
    "out for delivery": "bg-[#FFF6EDB2] text-[#AF7208]",
    approved: "bg-[#F2FEF7] text-[#027A48]",
    rejected: "bg-[#FFF9F2] text-[#FF000D]",
    pending: "bg-[#FAF2EF] text-[#CA810A]",
    refunded: "bg-[#FFF9F2] text-[#FF000D]",
  };
  return statusStyles[status as keyof typeof statusStyles] || "";
};

const OrdersTable = ({
  onOpenModal,
  filters,
  onOpenFilterModal,
  setSelectedRow,
  orderType,
  isRefreshing,
}: OrdersTableProps) => {
  const selector = useDashboardSelector();
  const { loadOrdersData, loadOrdersByStatus, isOrdersLoading } = useDash();
  const dispatch = useDispatch();
  const router = useRouter();

  const getOrdersData = () => {
    switch (orderType) {
      case "new":
        return selector?.pendingOrders ?? [];
      case "approved":
        return selector?.approvedOrders ?? [];
      case "out for delivery":
        return selector?.outForDeliveryOrders ?? [];
      case "delivered":
        return selector?.deliveredOrders ?? [];
      case "cancelled":
        return selector?.cancelledOrders ?? [];
      case "invoice":
        return selector?.cancelledOrders ?? [];
      default:
        return [];
    }
  };

  const ordersData = getOrdersData();
  useEffect(() => {
    if (orderType === "new") {
      loadOrdersByStatus("pending");
    } else {
      loadOrdersByStatus(orderType);
    }
  }, [orderType, loadOrdersData, loadOrdersByStatus]);

  const filteredData = useMemo(() => {
    return filterOrders(ordersData, filters);
  }, [ordersData, filters]);

  const columns = [
    {
      header: "Order",
      accessorKey: "order_number",
      cell: ({ row }: any) => (
        <Typography className="text-[#101828] font-inter text-sm">
          {row?.original?.order_number ?? "N/A"}
        </Typography>
      ),
    },
    {
      header: "Date",
      accessorKey: "created_at",
      cell: ({ row }: any) => {
        const dateStr = formatDate(row.original.created_at);
        const timeStr = formatTime(row.original.created_at);

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
      header: "Supplier",
      accessorKey: "supplier_name",
      cell: ({ row }: any) => (
        <Typography className="text-[#6F6F6F] font-inter text-sm font-medium">
          {row?.original?.supplier_name ?? "N/A"}
        </Typography>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer_name",
      cell: ({ row }: any) => (
        <Typography className="text-[#6F6F6F] font-inter text-sm font-medium">
          {row?.original?.customer_name ?? "N/A"}
        </Typography>
      ),
    },
    {
      header: "Sales Agent",
      accessorKey: "sales_agent_name",
      cell: ({ row }: any) => (
        <Typography className="text-[#6F6F6F] font-inter text-sm font-medium">
          {row?.original?.sales_agent_name ?? "N/A"}
        </Typography>
      ),
    },
    {
      header: "Total Cost",
      cell: ({ row }: any) => {
        const total =
          row?.original?.total_sale_amount ??
          row?.original?.products?.reduce(
            (sum: number, product: any) => sum + (product?.total_price ?? 0),
            0
          ) ??
          0;
        return (
          <span className="text-[#6F6F6F] font-inter text-sm font-medium">
            GHS {total.toFixed(2)}
          </span>
        );
      },
    },
    {
      header: "Order Type",
      accessorKey: "sale_type",
      cell: ({ row }: any) => {
        const sale_type = row?.original?.sale_type?.toLowerCase() ?? "N/A";
        const className =
          sale_type === "cash"
            ? "text-[#027A48] font-medium bg-[#ECFDF3]"
            : sale_type === "credit"
            ? "text-[#FF000D] font-medium bg-[#FFF6ED]"
            : "text-gray-500";
        return (
          <span className={`capitalize py-1 px-2 rounded ${className}`}>
            {sale_type} Sale
          </span>
        );
      },
    },
    {
      header: "Order Status",
      accessorKey: "status",
      cell: ({ row }: any) => {
        const status =
          row?.original?.status_history?.[0]?.status?.toLowerCase() ?? "N/A";
        const className = getStatusStyling(status);
        return (
          <span className={`capitalize py-1 px-2 rounded ${className}`}>
            {status}
          </span>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div
          className="flex items-center gap-3"
          onClick={(e) => e.stopPropagation()}
        >
          {orderType !== "new" && (
            <Link
              href={`${ROUTES.orderInvoice}?orderId=${row?.original?.id ?? ""}`}
              onClick={(e) => e.stopPropagation()}
            >
              <ScrollText size={20} />
            </Link>
          )}
          <UIGuard permission="UPDATE_PURCHASE_ORDER">
            <button
              onClick={(e) => {
                e.stopPropagation();
                dispatch(setActiveOrderStatus(row?.original));
                router.push(ROUTES.orderStatus);
              }}
            >
              <Pen size={20} />
            </button>
          </UIGuard>
          <UIGuard permission="DELETE_PURCHASE_ORDER">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedRow(row?.original);
                onOpenModal();
              }}
              className="cursor-pointer"
            >
              <BinIcon />
            </button>
          </UIGuard>
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <TanTable
        columnData={columns}
        data={filteredData ?? []}
        showSearch
        length={5}
        showBorder
        showDateFilter
        dateField="created_at"
        customFilterButton={onOpenFilterModal}
        loadingState={isOrdersLoading || isRefreshing}
        // onRowClick={(row: any) => onViewOrderDetails(row.original)}
      />
    </div>
  );
};

export default OrdersTable;
