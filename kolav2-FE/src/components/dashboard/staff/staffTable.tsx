import { BinIcon } from "@/assets/svg";
import { DeleteModal } from "@/components/General/deleteModal";
import TanTable from "@/components/General/TanTable";
import { useDash } from "@/context/dashboardContext";
import { Pen } from "lucide-react";
import React, { useEffect, useMemo, useState } from "react";
import FilterStaffModal, { FilterStaffState } from "./modals/filterStaffModal";
import { UIGuard } from "@/components/guards/roleGuard";
import { Typography, Switch } from "@material-tailwind/react";

interface StaffTableProps {
  onEditButtonClick?: (data: StaffProps) => void;
  staffData?: StaffProps[];
}

const AllStaff = ({ onEditButtonClick, staffData }: StaffTableProps) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<any>(null);
  const {
    handleDeleteStaff,
    isStaffDeleting,
    handleSuspendStaff,
    isStaffSuspending,
  } = useDash();

  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [filters, setFilters] = useState<FilterStaffState>({
    role: "",
  });

  const [filteredStaff, setFilteredStaff] = useState<StaffProps[]>([]);
  const [suspendingStaffId, setSuspendingStaffId] = useState<string | null>(
    null
  );

  const baseData = useMemo(() => {
    return staffData || [];
  }, [staffData]);

  useEffect(() => {
    if (baseData) {
      let filtered = baseData.filter((staff) => {
        return (
          !filters.role ||
          staff.role.toLowerCase() === filters.role.toLowerCase()
        );
      });
      setFilteredStaff(filtered);
    }
  }, [filters, baseData]);

  const handleFilter = (newFilters: FilterStaffState) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  const handleDeleteModal = (row: any) => {
    setSelectedRow(row);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (selectedRow) {
      handleDeleteStaff(selectedRow, () => {
        setIsDeleteModalOpen(false);
        setSelectedRow(null);
      });
    }
  };

  const handleToggleSuspension = async (staff: StaffProps) => {
    setSuspendingStaffId(staff.id);
    try {
      await handleSuspendStaff({ id: staff.id } as CreateStaffProps, () => {
        setSuspendingStaffId(null);
      });
    } catch (error) {
      setSuspendingStaffId(null);
    }
  };

  const formatRoleName = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const columns = [
    {
      header: "#",
      cell: (item: any) => <span className="">#{item.row.index + 1}</span>,
    },
    {
      header: "Name",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-2">
          <Typography className="text-sm font-medium text-black">
            {row.original.first_name} {row.original.last_name}
          </Typography>
        </div>
      ),
    },
    {
      header: "Email",
      accessorKey: "email",
      cell: ({ row }: any) => (
        <Typography className="text-[#667085] text-sm">
          {row.original.email}
        </Typography>
      ),
    },
    {
      header: "Phone Number",
      cell: ({ row }: any) => (
        <Typography className="text-[#667085] text-sm">
          {`${row.original?.country_code} ${row.original?.phone_number}`}
        </Typography>
      ),
    },
    {
      header: "Role",
      accessorKey: "role",
      cell: ({ row }: any) => (
        <span className="px-2 py-1 rounded-md bg-blue-50 text-blue-700 text-sm">
          {formatRoleName(row.original.role)}
        </span>
      ),
    },
    {
      header: "Status",
      cell: ({ row }: any) => (
        <span
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            row.original.is_suspended
              ? "bg-red-50 text-red-600"
              : "bg-green-50 text-green-600"
          }`}
        >
          {row.original.is_suspended ? "Suspended" : "Active"}
        </span>
      ),
    },
    {
      header: "Action",
      cell: ({ row }: any) => (
        <div className="flex items-center gap-3">
          <UIGuard permission="UPDATE_STAFF">
            <button
              type="button"
              onClick={() => {
                onEditButtonClick && onEditButtonClick(row.original);
                setSelectedRow(row.original);
              }}
              aria-label="Edit Staff"
            >
              <Pen size={18} className="text-[#667085]" />
            </button>
          </UIGuard>

          <UIGuard permission="UPDATE_STAFF">
            <div className="flex items-center gap-2">
              <Switch
                checked={row.original.is_suspended}
                onChange={() => handleToggleSuspension(row.original)}
                disabled={suspendingStaffId === row.original.id}
                color={row.original.is_suspended ? "red" : "green"}
                crossOrigin={undefined}
                labelProps={{
                  className: "text-xs",
                }}
              />
            </div>
          </UIGuard>

          {/* <UIGuard permission="DELETE_STAFF">
            <button
              type="button"
              onClick={() => handleDeleteModal(row.original)}
              aria-label="Delete Staff"
            >
              <BinIcon />
            </button>
          </UIGuard> */}
        </div>
      ),
    },
  ];

  return (
    <div>
      <TanTable
        data={filteredStaff || []}
        columnData={columns}
        showSearch
        length={10}
        searchPlaceholder="Search staff..."
      />
      <FilterStaffModal
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
        loading={isStaffDeleting}
        header="Delete Staff?"
        message={`Are you sure you want to delete ${selectedRow?.first_name} ${selectedRow?.last_name}? This action cannot be undone.`}
      />
    </div>
  );
};

export default AllStaff;
