import { BinIcon, SortIcon } from "@/assets/svg";
import TanTable from "@/components/General/TanTable";
import { Typography } from "@material-tailwind/react";
import { Clock4, Eye } from "lucide-react";
import React, { useEffect, useState } from "react";
import FilterInventoryModal, {
  FilterInventoryState,
} from "./modals/filterInventoryModal";
import EditInventoryFlyout from "./editInventoryFlyout";
import { useDashboardSelector } from "@/Redux/selectors";
import {
  formatDate,
  formatNumber,
  formatTime,
  getInitials,
} from "@/utils/helpers";
import { DeleteModal } from "@/components/General/deleteModal";
import { useDash } from "@/context/dashboardContext";
import { UIGuard } from "@/components/guards/roleGuard";

const InventoryTable = () => {
  const { products } = useDashboardSelector();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isEditRightDrawerOpen, setIsEditRightDrawerOpen] = useState(false);
  const [tempData, setTempData] = useState<Product | null>(null);

  const handleEditOpenDialog = () => setIsEditRightDrawerOpen(true);

  const { loadProductsData, handleDeleteProductInfo, isProductInfoDeleting } =
    useDash();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);

  const [filters, setFilters] = useState<FilterInventoryState>({
    businessName: "",
    productName: "",
    SKU: "",
    category: "",
    brand: "",
  });

  const handleFilter = (newFilters: FilterInventoryState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteProductInfo(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    } else {
    }
  };

  useEffect(() => {
    loadProductsData();
  }, [loadProductsData]);

  const columns = [
    {
      header: "#",
      cell: (item: any) => <span>#{item.row.index + 1}</span>,
    },
    {
      header: "Name of product",
      accessorKey: "product_name",
      cell: ({
        row: { original },
      }: {
        row: { original: ProductListProps };
      }) => (
        <div className="flex items-center gap-2 min-w-[200px] max-w-[300px]">
          <div className="flex items-center gap-2">
            {original.product_image ? (
              <img
                src={original?.product_image}
                alt={original?.product_name || "Product image"}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-pry2 bg-opacity-10 font-bold flex items-center justify-center">
                {getInitials(original?.product_name)}
              </div>
            )}
          </div>
          <div className="flex text-[#003366] flex-col overflow-hidden">
            <Typography className="text-sm font-medium whitespace-normal break-words">
              {original?.product_name}
            </Typography>
            <Typography className="text-sm font-normal">
              {original?.product_sku}
            </Typography>
          </div>
        </div>
      ),
    },
    // {
    // 	header: "Business",
    // 	accessorKey: "businessName",
    // },
    {
      header: "Category",
      accessorKey: "product_category_name",
      cell: ({ row }: { row: { original: Product } }) => {
        return (
          <span className="text-[#667085]">
            {row.original?.product_category_name
              ? row.original?.product_category_name
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Brand",
      accessorKey: "product_brand_name",
      cell: ({ row }: { row: { original: Product } }) => {
        return (
          <span className="text-[#667085]">
            {row.original?.product_brand_name
              ? row.original?.product_brand_name
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "In Stock",
      accessorKey: "product_stock_level",
      cell: ({ row }: { row: { original: Product } }) => {
        return (
          <span className="text-gray_5">
            {row.original?.product_stock_level
              ? row.original?.product_stock_level
              : "N/A"}
          </span>
        );
      },
    },
    {
      header: "Wholesale Price",
      accessorKey: "product_wholesale_price",
      cell: ({ row: { original } }: { row: { original: ProductListProps } }) =>
        formatNumber(Number(original.product_wholesale_price || 0)),
    },
    {
      header: "Retail",
      accessorKey: "product_retail_price",
      cell: ({ row: { original } }: { row: { original: ProductListProps } }) =>
        formatNumber(Number(original?.product_retail_price || 0)),
    },
    {
      header: "Last Modified",
      accessorKey: "updated_at",
      cell: ({ row }: any) => {
        const dateStr = formatDate(row?.original.updated_at);
        const timeStr = formatTime(row?.original.updated_at);

        return (
          <div className="flex gap-1 items-center">
            <Typography className="font-normal text-sm">{dateStr}</Typography>
            <span className="text-xs text-[#B1B7BE]">{" " + timeStr}</span>
          </div>
        );
      },
    },
    {
      header: "Action",
      accessorKey: "order",
      cell: ({
        row: { original },
      }: {
        row: { original: ProductListProps };
      }) => (
        <div className="flex items-center gap-2">
          <UIGuard permission="VIEW_PRODUCT_BY_ID">
            <button title="details">
              <Eye
                onClick={() => {
                  setTempData(original);
                  handleEditOpenDialog();
                }}
                size={20}
              />
            </button>
          </UIGuard>
          <UIGuard permission="DELETE_PRODUCT">
            <div
              onClick={() => handleDeleteModal(original)}
              className="cursor-pointer"
            >
              <BinIcon color="#667085" />
            </div>
          </UIGuard>
        </div>
      ),
    },
  ];
  return (
    <div>
      <TanTable
        columnData={columns}
        data={products || []}
        showSearch
        length={5}
        showSortFilter
        customFilterButton={() => setIsFilterModalOpen(true)}
        sortOptions={[
          {
            key: "nameOfProduct",
            label: "Sort Alphabetically",
            icon: <SortIcon />,
          },
          {
            key: "name",
            label: "Sort by Recently Uploaded",
            icon: <Clock4 />,
          },
        ]}
      />
      <FilterInventoryModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        initialFilters={filters}
      />
      <EditInventoryFlyout
        isEditRightDrawerOpen={isEditRightDrawerOpen}
        data={tempData}
        closeFlyout={() => {
          setIsEditRightDrawerOpen(false);
        }}
      />
      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setSelectedRow(null);
        }}
        onDelete={confirmDelete}
        header="Remove Product"
        message="Are you sure you want to remove this product from the library?"
        loading={isProductInfoDeleting}
      />
    </div>
  );
};

export default InventoryTable;
