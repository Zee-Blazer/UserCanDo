import React, { useEffect, useState } from "react";
import { Typography } from "@material-tailwind/react";
import { Clock, Trash2 } from "lucide-react";
import TanTable from "@/components/General/TanTable";
import { DeleteModal } from "@/components/General/deleteModal";
import FilterSuppliersModal, {
  FilterSuppliersState,
} from "./modals/filterSuppliersModal";
import { SortIcon } from "@/assets/svg";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";
import {
  displayValue,
  formatDate,
  formatPhoneNumber,
  formatTime,
} from "@/utils/helpers";
import { UIGuard } from "@/components/guards/roleGuard";

const SuppliersTable = () => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const { suppliers } = useDashboardSelector();
  const { isSuppliersLoading } = useDash();
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filteredSuppliers, setFilteredSuppliers] = useState(suppliers || []);
  const [filters, setFilters] = useState<FilterSuppliersState>({
    name: "",
    phone: "",
    email: "",
    location: "",
  });

  const { loadSupplierData, handleDeleteSupplier, isSupplierDeleting } =
    useDash();

  useEffect(() => {
    loadSupplierData();
  }, [loadSupplierData]);

  const handleFilter = (newFilters: FilterSuppliersState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteSupplier(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  useEffect(() => {
    if (suppliers) {
      let filtered = suppliers.filter((supplier) => {
        return (
          (!filters.name ||
            supplier.name
              ?.toLowerCase()
              .includes(filters.name.toLowerCase())) &&
          (!filters.phone || supplier.phone?.includes(filters.phone)) &&
          (!filters.email || supplier.email?.includes(filters.email)) &&
          (!filters.location ||
            supplier.location
              ?.toLowerCase()
              .includes(filters.location.toLowerCase()))
        );
      });
      setFilteredSuppliers(filtered);
    }
  }, [filters, suppliers]);

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row.original);
    setIsDeleteModalOpen(true);
  };

  const columns = [
    {
      header: "#",
      cell: (item: any) => <span className="">#{item.row.index + 1}</span>,
    },
    {
      header: "Date",
      accessorKey: "added_on",
      cell: ({ row }: any) => {
        const createdAt = row.original.created_at;

        if (!createdAt) {
          return (
            <div className="whitespace-nowrap">
              <Typography className="font-normal text-sm text-[#667085]">
                N/A
              </Typography>
            </div>
          );
        }

        const dateStr = formatDate(createdAt);
        const timeStr = formatTime(createdAt);

        return (
          <div className="whitespace-nowrap flex gap-1 items-center">
            <Typography className="font-normal text-sm text-black">
              {displayValue(dateStr)}
            </Typography>
            <span className="text-xs text-[#B1B7BE]">
              {" " + displayValue(timeStr)}
            </span>
          </div>
        );
      },
    },
    {
      header: "Business",
      accessorKey: "business",
      cell: ({ row }: any) => {
        return (
          <Typography className="text-sm font-medium text-black">
            {displayValue(row.original.name)}
          </Typography>
        );
      },
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }: any) => (
        <Typography className="text-[#667085] text-sm">
          {displayValue(row.original.email)}
        </Typography>
      ),
    },
    {
      header: "Phone Number",
      accessorKey: "phoneNumber",
      cell: ({ row }: any) => {
        const phoneNumber = row.original?.phone;
        const formattedPhone = phoneNumber
          ? formatPhoneNumber(phoneNumber)
          : null;

        return (
          <Typography className="text-[#667085] text-sm">
            {displayValue(formattedPhone)}
          </Typography>
        );
      },
    },
    {
      header: "Location",
      accessorKey: "location",
      cell: ({ row }: any) => (
        <Typography className="text-[#667085]">
          {displayValue(row.original.location)}
        </Typography>
      ),
    },
    {
      header: "Action",
      accessorKey: "suppliers",
      cell: ({ row }: any) => {
        return (
          <div className="flex items-center gap-3">
            <UIGuard permission="DELETE_SUPPLIER">
              <button
                type="button"
                onClick={() => handleDeleteModal(row)}
                aria-label="Delete Item"
              >
                <Trash2 size={18} />
              </button>
            </UIGuard>
          </div>
        );
      },
    },
  ];

  return (
    <div>
      <TanTable
        data={filteredSuppliers || []}
        columnData={columns}
        length={5}
        showDateFilter
        showSearch
        showSortFilter
        loadingState={isSuppliersLoading}
        sortOptions={[
          {
            key: "business",
            label: "Sort by Business Name",
            icon: <SortIcon />,
          },
          {
            key: "added_on",
            label: "Sort by Date Added",
            icon: <Clock className="h-5 w-5" />,
          },
        ]}
        customFilterButton={() => setIsFilterModalOpen(true)}
        dateField="created_at"
      />
      <FilterSuppliersModal
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
        header="Delete Supplier?"
        message={`Are you sure you want to remove "${displayValue(
          selectedRow?.name
        )}"?`}
        loading={isSupplierDeleting}
      />
    </div>
  );
};

export default SuppliersTable;
