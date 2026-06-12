import { BinIcon, SortIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { Typography } from "@material-tailwind/react";
import { Clock, Pen } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import FilterPurchaseOrder, {
  FilterPurchaseOrderState,
} from "./modal/filterPurchaseOrder";
import { TrashModal } from "@/components/General/trashModal";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { formatDate, formatTime, getPaymentStatusStyle } from "@/utils/helpers";

const Orders = () => {
  const router = useRouter();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [filters, setFilters] = useState<FilterPurchaseOrderState>({
    product_name: "",
    payment_mode: "",
    saleBetween: "",
    saleType: "",
    paymentType: "",
    supplier_name: "",
    dueBetween: "",
  });

  const {
    loadPurchaseOrdersData,
    isPurchaseOrderLoading,
    handleDeletePurchaseOrder,
    isPuchaseOrderDeleting,
  } = useDash();

  const { allPurchaseOrder } = useDashboardSelector();

  useEffect(() => {
    loadPurchaseOrdersData();
  }, [loadPurchaseOrdersData]);

  const filteredData = useMemo(() => {
    if (!allPurchaseOrder) return [];

    return allPurchaseOrder.filter((order: any) => {
      const supplierNameMatch =
        !filters.supplier_name ||
        order.supplier?.name
          ?.toLowerCase()
          ?.includes(filters.supplier_name.toLowerCase());

      const paymentMethodMatch =
        !filters.paymentType ||
        order.payment_method?.toLowerCase() ===
          filters.paymentType.toLowerCase();

      const dueDateMatch =
        !filters.dueBetween ||
        new Date(order.due_date) <= new Date(filters.dueBetween);

      const deliveryDateMatch =
        !filters.saleBetween ||
        new Date(order.delivery_date) >= new Date(filters.saleBetween);

      return (
        supplierNameMatch &&
        paymentMethodMatch &&
        dueDateMatch &&
        deliveryDateMatch
      );
    });
  }, [allPurchaseOrder, filters]);

  const handleFilter = (newFilters: FilterPurchaseOrderState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleDeleteModal = (row: any) => {
    setSelectedOrder(row);
    setIsDialogOpen(true);
  };

  const handleEditOrder = (orderData: any) => {
    localStorage.setItem("editOrderData", JSON.stringify(orderData));
    router.push("/dashboard/purchase-order/place-order?mode=edit");
  };

  const confirmDelete = () => {
    if (selectedOrder) {
      handleDeletePurchaseOrder(selectedOrder, () => {
        setIsDialogOpen(false);
        setSelectedOrder(null);
      });
    }
  };

  const handleCloseDialog = () => setIsDialogOpen(false);

  const columns = [
    {
      header: "Delivery Date",
      accessorKey: "delivery_date",
      cell: ({ row }: any) => {
        const dateStr = formatDate(row.original.delivery_date);
        const timeStr = formatTime(row.original.delivery_date);

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
      accessorKey: "supplier",
      cell: ({ row }: any) => (
        <Typography className="text-sm font-medium">
          {row.original?.supplier?.name}
        </Typography>
      ),
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: ({ row }: any) => (
        <Typography className="text-sm font-medium">
          {row.original?.customer?.name}
        </Typography>
      ),
    },
    {
      header: "PO Number",
      accessorKey: "po_number",
      cell: ({ row }: any) => (
        <Typography className="text-sm font-medium">
          {row.original?.po_number}
        </Typography>
      ),
    },
    {
      header: "Total Cost",
      accessorKey: "total_cost",
      cell: ({ row }: any) => (
        <Typography className="text-sm font-medium">
          GHS {parseFloat(row.original?.total_cost || 0).toFixed(2)}
        </Typography>
      ),
    },
    {
      header: "Delivery Date",
      accessorKey: "delivery_date",
      cell: ({ row }: any) => {
        const dateStr = formatDate(row.original.delivery_date);
        const timeStr = formatTime(row.original.delivery_date);

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
      header: "Approval Status",
      accessorKey: "payment_method",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 bg-[#D1E0FF] text-[#003366] font-medium rounded-md capitalize ${row.original?.approval_status}`}
        >
          {row.original?.approval_status}
        </span>
      ),
    },
    {
      header: "Payment Status",
      accessorKey: "payment_status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-md font-medium  capitalize ${getPaymentStatusStyle(
            row.original?.payment_status
          )}`}
        >
          {row.original?.payment_status || "N/A"}
        </span>
      ),
    },
    {
      header: "Action",
      accessorKey: "action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <button onClick={() => handleEditOrder(row.original)}>
            <Pen size={16} className="text-gray-600" />
          </button>
          <div
            onClick={() => handleDeleteModal(row.original)}
            className="cursor-pointer"
          >
            <BinIcon color="#B42318" />
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="py-4">
      <Typography className="text-xl font-semibold font-inter my-2.5">
        Purchase Orders
      </Typography>
      <TanTable
        data={filteredData}
        columnData={columns}
        length={5}
        showDateFilter
        showSearch
        customFilterButton={() => setIsFilterModalOpen(true)}
        loadingState={isPurchaseOrderLoading}
        tableId="purchase-order-table"
        sortOptions={[
          {
            key: "delivery_date",
            label: "Sort By Recently Uploaded",
            icon: <SortIcon />,
          },
          {
            key: "delivery_date",
            label: "Sort by Date Added",
            icon: <Clock className="h-5 w-5" />,
          },
        ]}
      />

      <FilterPurchaseOrder
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        initialFilters={filters}
      />

      <TrashModal
        isOpen={isDialogOpen}
        onClose={handleCloseDialog}
        header="Remove Order"
        title="Are you sure you want to delete this order?"
        onDelete={confirmDelete}
        loading={isPuchaseOrderDeleting}
      />
    </div>
  );
};

export default Orders;
