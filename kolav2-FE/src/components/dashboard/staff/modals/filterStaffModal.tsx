import React, { useEffect, useState } from "react";
import {
  IconButton,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { FormSelect } from "@/components/General/form";
import { ALL_ROLES, USER_ROLES } from "@/types";

export interface FilterStaffState {
  role: string;
}

interface FilterStaffModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterStaffState) => void;
  initialFilters: FilterStaffState;
}

const FilterStaffModal = ({
  open,
  onClose,
  onFilter,
  initialFilters,
}: FilterStaffModalProps) => {
  const [filters, setFilters] = useState<FilterStaffState>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (field: keyof FilterStaffState, value: any) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFilter = () => {
    onFilter(filters);
    onClose();
  };

  const handleReset = () => {
    const resetState = {
      role: "",
    };
    setFilters(resetState);
    onFilter(resetState);
    onClose();
  };

  return (
    <Dialog open={open} handler={onClose} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-semibold">Filter Staff</Typography>
        <IconButton
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
        >
          <X className="h-5 w-5 stroke-2" />
        </IconButton>
      </DialogHeader>

      <DialogBody className="space-y-4 md:max-h-none md:overflow-visible max-h-[60vh] overflow-y-auto">
        <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 gap-y-4 gap-x-10 items-center">
          <label className="text-sm text-[#101828]">Role</label>
          <FormSelect
            color="#101828"
            borderColor="#D5D8DC"
            placeholder="Select Role"
            options={ALL_ROLES.filter(
              (role) => role !== USER_ROLES.SUPER_ADMIN
            ).sort((a, b) => a.localeCompare(b))}
            value={filters.role}
            name="role"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("role", e.target.value)
            }
          />
        </div>
      </DialogBody>

      <DialogFooter className="flex justify-end gap-3 mt-6 flex-nowrap">
        <button
          type="button"
          className="bg-pry2 text-white font-medium text-sm px-4 py-2 border border-[#003366] shadow-[0px_1px_2px_0px_#1018280D] rounded-lg"
          onClick={handleFilter}
        >
          Filter
        </button>
        <button
          type="button"
          className="bg-white text-[#344054] font-medium text-sm px-4 py-2 border border-[#D0D5DD66] shadow-[0px_1px_2px_0px_#1018280D] rounded-lg"
          onClick={handleReset}
        >
          Reset
        </button>
        <button
          type="button"
          className="bg-white text-[#344054] font-medium text-sm px-4 py-2 border border-[#D0D5DD] shadow-[0px_1px_2px_0px_#1018280D] rounded-lg"
          onClick={onClose}
        >
          Close
        </button>
      </DialogFooter>
    </Dialog>
  );
};

export default FilterStaffModal;
