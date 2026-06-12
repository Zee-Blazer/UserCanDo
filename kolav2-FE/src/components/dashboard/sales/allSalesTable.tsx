import { RecieptIcon } from "@/assets/svg";
import { DeleteModal } from "@/components/General/deleteModal";
import TanTable from "@/components/General/TanTable";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import FilterSalesModal, { FilterSaleState } from "./modals/filterSaleModal";
import {
  formatDate,
  formatNumber,
  formatTime,
  getPaymentStatusDisplay,
  getPaymentStatusStyle,
} from "@/utils/helpers";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { UIGuard } from "@/components/guards/roleGuard";
import { usePageData } from "@/api/hooks/usePageData";
import { Typography } from "@material-tailwind/react";

interface SalesTableProps {
  onEditButtonClick?: (data: SalesListProps) => void;
  salesData?: SalesListProps[];
}

const AllSalesTable = ({ onEditButtonClick, salesData }: SalesTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { customers, salesAgents, products } = useDashboardSelector();
  const {
    loadCustomersData,
    loadSalesAgentsData,
    loadProductsData,
    handleDeleteSale,
    isSaleDeleting,
  } = useDash();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterSaleState>({
    customer: "",
    saleStartDate: null,
    saleEndDate: null,
    saleType: "",
    paymentMode: "",
    saleAgent: "",
    dueStartDate: null,
    dueEndDate: null,
  });

  const [filteredSales, setFilteredSales] = useState<SalesListProps[]>([]);

  const baseData = useMemo(() => {
    return salesData || [];
  }, [salesData]);

  usePageData([loadSalesAgentsData, loadCustomersData, loadProductsData]);

  useEffect(() => {
    if (baseData) {
      let filtered = baseData.filter((sale) => {
        const customer = customers?.find(
          (c) =>
            c?.customer_entity_id === sale?.customer_entity_id &&
            c?.customer_entity_type === sale?.customer_entity_type
        );
        const agent = salesAgents?.find((a) => a?.id === sale?.sales_agent_id);
        const saleDate = new Date(sale?.sale_date);

        return (
          (!filters?.customer ||
            (customer &&
              customer?.customer_name?.includes(filters.customer))) &&
          (!filters?.saleStartDate ||
            saleDate >= new Date(filters.saleStartDate)) &&
          (!filters?.saleEndDate ||
            saleDate <= new Date(filters.saleEndDate)) &&
          (!filters?.saleType ||
            sale?.sale_type?.toLowerCase() ===
              filters.saleType.toLowerCase()) &&
          (!filters?.paymentMode ||
            sale?.payment_mode?.toLowerCase() ===
              filters.paymentMode.toLowerCase()) &&
          (!filters?.saleAgent ||
            (agent && agent?.name?.includes(filters.saleAgent))) &&
          (!filters?.dueStartDate ||
            (sale?.due_date &&
              new Date(sale.due_date) >= new Date(filters.dueStartDate))) &&
          (!filters?.dueEndDate ||
            (sale?.due_date &&
              new Date(sale.due_date) <= new Date(filters.dueEndDate)))
        );
      });
      setFilteredSales(filtered);
    }
  }, [filters, baseData, customers, salesAgents]);

  const handleFilter = (newFilters: FilterSaleState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteSale(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const columns = [
    {
      header: "No",
      cell: (item: any) => <span className="">#{item?.row?.index + 1}</span>,
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
      cell: ({ row }: { row: { original: SalesListProps } }) => {
        return (
          <span className="font-medium">
            {row?.original?.customer_name || "N/A"}
          </span>
        );
      },
    },
    {
      header: "Agent",
      accessorKey: "sales_agent_name",
      cell: ({ row }: { row: { original: SalesListProps } }) => {
        return <span>{row?.original?.sales_agent_name || "N/A"}</span>;
      },
    },
    {
      header: "Total Due",
      accessorKey: "total_sale_amount",
      cell: ({ row }: { row: { original: SalesListProps } }) => {
        return (
          <span className="text-gray_4">
            GHS {formatNumber(Number(row?.original?.total_sale_amount ?? 0))}
          </span>
        );
      },
    },
    {
      header: "Sale Type",
      accessorKey: "sale_type",
      cell: ({ row }: any) => {
        const sale_type = row?.original?.sale_type?.toLowerCase() ?? "N/A";
        const className =
          sale_type === "cash"
            ? "text-[#027A48] font-medium bg-[#ECFDF3]"
            : sale_type === "credit"
            ? "text-[#365FB6] font-medium bg-[#D1E0FF]"
            : "text-gray-500";
        return (
          <span className={`capitalize py-1 px-2 rounded ${className}`}>
            {sale_type} Sale
          </span>
        );
      },
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: SalesListProps } }) => (
        <span
          className={`px-2 py-1 rounded-md font-medium bg-opacity-90 ${getPaymentStatusStyle(
            row?.original?.status
          )}`}
        >
          {getPaymentStatusDisplay(row?.original?.status)}
        </span>
      ),
    },
    {
      header: "Orders",
      cell: ({ row }: { row: { original: SalesListProps } }) => {
        const productNames =
          row?.original?.products?.map((product) => {
            const matchedProduct = products?.find(
              (p) => p?.id === product?.product_id
            );
            return matchedProduct?.product_name || "Unknown Product";
          }) || [];
        const displayNames =
          productNames.length > 3
            ? productNames.slice(0, 3).join(", ") + "..."
            : productNames.join(", ");

        return (
          <span
            className="text-gray_4 font-medium"
            title={productNames.join(", ")}
          >
            {displayNames || "N/A"}
          </span>
        );
      },
    },
    {
      header: "Action",
      cell: ({ row }: { row: { original: SalesListProps } }) => (
        <div className="flex items-center gap-3">
          <UIGuard permission="VIEW_SALE_INFO">
            <Link
              href={`${ROUTES.salesInvoice}?saleId=${row?.original?.id}`}
              onClick={(e) => e.stopPropagation()}
            >
              <button type="button" aria-label="Sale Receipt">
                <RecieptIcon />
              </button>
            </Link>
          </UIGuard>
          <UIGuard permission="DELETE_SALE">
            <button
              type="button"
              onClick={() => handleDeleteModal(row?.original)}
              aria-label="Delete Sale"
            >
              <Trash2 size={18} className="text-[#667085]" />
            </button>
          </UIGuard>
          <UIGuard permission="UPDATE_SALE">
            <button
              type="button"
              onClick={() => {
                onEditButtonClick && onEditButtonClick(row?.original);
                setSelectedRow(row?.original);
              }}
              aria-label="Edit Item"
            >
              <Pencil size={18} className="text-[#667085]" />
            </button>
          </UIGuard>
        </div>
      ),
    },
  ];

  return (
    <div>
      <TanTable
        data={filteredSales || []}
        columnData={columns}
        showSearch
        length={5}
        showDateFilter
        dateField="sale_date"
        customFilterButton={() => setIsFilterModalOpen(true)}
        tableId="sales-table"
      />
      <FilterSalesModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        initialFilters={filters}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRow(null);
        }}
        onDelete={confirmDelete}
        loading={isSaleDeleting}
        header="Delete Sale?"
        message="Are you sure you want to delete this sale record?"
      />
    </div>
  );
};

export default AllSalesTable;
