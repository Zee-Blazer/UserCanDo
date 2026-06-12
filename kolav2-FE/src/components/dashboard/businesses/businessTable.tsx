import TanTable from "@/components/General/TanTable";
import { Typography } from "@material-tailwind/react";
import { Pencil, Trash2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import { DeleteModal } from "@/components/General/deleteModal";
import FilterBusinessModal, { FilterState } from "./modals/filterBusinessModal";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import { ClockIcon, SortIcon } from "@/assets/svg";
import { formatNumber, getInitials } from "@/utils/helpers";
import { UIGuard } from "@/components/guards/roleGuard";

interface BusinessTableProps {
  onEditButtonClick?: (data: BusinessListProps) => void;
}

const BusinessTable = ({ onEditButtonClick }: BusinessTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { businesses } = useDashboardSelector();
  const { handleDeleteBusiness, isBusinessDeleting } = useDash();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({
    businessName: "",
    phoneNumber: "",
    // location: "",
    businessType: "",
    country: "",
    region: "",
  });

  const [filteredBusinesses, setFilteredBusinesses] = useState(
    businesses || []
  );

  useEffect(() => {
    if (businesses) {
      let filtered = businesses.filter((business) => {
        const businessTypeMatch =
          !filters.businessType ||
          (Array.isArray(business.business_type)
            ? business.business_type.includes(filters.businessType)
            : business.business_type === filters.businessType);

        return (
          (!filters.businessName ||
            business.business_name
              .toLowerCase()
              .includes(filters.businessName.toLowerCase())) &&
          (!filters.phoneNumber ||
            business.business_phone.includes(filters.phoneNumber)) &&
          businessTypeMatch &&
          (!filters.country || business.country === filters.country) &&
          (!filters.region || business.region === filters.region)
        );
      });
      setFilteredBusinesses(filtered);
    }
  }, [filters, businesses]);

  const handleFilter = (newFilters: FilterState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteBusiness(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const columns = [
    {
      header: "#",
      cell: (item: any) => <span className="">#{item.row.index + 1}</span>,
    },
    {
      header: "Business",
      accessorKey: "business_name",
      cell: ({
        row: { original },
      }: {
        row: { original: BusinessListProps };
      }) => (
        <>
          {original.business_logo ? (
            <img
              src={original.business_logo}
              className="w-10 h-10 rounded-full"
              alt="business logo"
            />
          ) : (
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-pry2 bg-opacity-10 font-bold flex items-center justify-center">
                {getInitials(original?.business_name)}
              </div>
            </div>
          )}
        </>
      ),
    },
    {
      header: "Business Owner",
      accessorKey: "business",
      cell: ({
        row: { original },
      }: {
        row: { original: BusinessListProps };
      }) => {
        return (
          <div className="">
            <Typography className="text-[#101828] font-medium">
              {original.business_name}
            </Typography>
            <Typography>{original.business_phone}</Typography>
          </div>
        );
      },
    },
    {
      header: "Region",
      accessorKey: "region",
    },
    {
      header: "Total Sales",
      accessorKey: "total_sales",
    },
    {
      header: "Total Order Value",
      accessorKey: "total_orders_value",
      cell: ({ row }: any) =>
        `GHS ${formatNumber(row.original.total_orders_value)}`,
    },
    {
      header: "Total Products",
      accessorKey: "number_of_product",
    },
    {
      header: "Total Stores",
      accessorKey: "number_of_store",
    },
    {
      header: "Last Updated",
      accessorKey: "last_updated",
    },
    {
      header: "Action",
      accessorKey: "sales",
      cell: ({
        row: { original },
      }: {
        row: { original: BusinessListProps };
      }) => {
        return (
          <div className="flex items-center gap-3">
            <UIGuard permission="DELETE_BUSINESS">
              <button
                type="button"
                onClick={() => handleDeleteModal(original)}
                aria-label="Delete Item"
              >
                <Trash2 size={18} />
              </button>
            </UIGuard>
            <UIGuard permission="UPDATE_BUSINESS">
              <button
                type="button"
                onClick={() => {
                  onEditButtonClick && onEditButtonClick(original);
                  setSelectedRow(original);
                }}
                aria-label="Edit Item"
              >
                <Pencil size={18} />
              </button>
            </UIGuard>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <div className="my-8 border-b-[1px] border-gray_2 pb-3">
        <Typography className="font-semibold mb-1">
          All Businesses
          <span className="ml-2 text-[#6941C6] rounded-full font-normal text-sm bg-[#B692F61A] p-1 px-3">
            {businesses?.length} Businesses
          </span>
        </Typography>
        <Typography className="text-sm">
          Keep track of all created/assigned businesses
        </Typography>
      </div>
      <TanTable
        data={filteredBusinesses || []}
        columnData={columns}
        showDateFilter
        dateField="last_updated"
        // showFilter
        showSearch
        searchPlaceholder={"Search"}
        showSortFilter
        sortOptions={[
          {
            key: "business_name",
            label: "Sort Alphabetically",
            icon: <SortIcon />,
            type: "string",
            defaultDirection: "asc",
          },
          {
            key: "last_updated",
            label: "Sort By Recently Updated",
            icon: <ClockIcon />,
            type: "date",
            defaultDirection: "desc",
          },
        ]}
        customFilterButton={() => setIsFilterModalOpen(true)}
      />
      <FilterBusinessModal
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
        loading={isBusinessDeleting}
        header="Delete Business?"
        message={`Are you sure you want to remove "${selectedRow?.business_name}"?`}
      />
    </div>
  );
};

export default BusinessTable;
