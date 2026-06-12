import React, { useEffect, useState } from "react";
import {
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import { FormInput, PhoneInputComponent } from "@/components/General/form";

export interface FilterSuppliersState {
  name: string;
  phone: string;
  email: string;
  location: string;
}

interface FilterSuppliersModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterSuppliersState) => void;
  initialFilters: FilterSuppliersState;
}

const FilterSuppliersModal = ({
  open,
  onClose,
  onFilter,
  initialFilters,
}: FilterSuppliersModalProps) => {
  const [filters, setFilters] = useState<FilterSuppliersState>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (
    field: keyof FilterSuppliersState,
    value: string
  ) => {
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
      name: "",
      phone: "",
      email: "",
      location: "",
    };
    setFilters(resetState);
    onFilter(resetState);
    onClose();
  };

  return (
    <Dialog open={open} handler={onClose} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-semibold">
          Filter Business
        </Typography>
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
          <label className="text-sm text-[#101828]">Business Name</label>
          <FormInput
            type="text"
            color="#101828"
            bgColor="white"
            borderColor="#D5D8DC"
            placeholder="e.g JM Ventures"
            fontSize="14px"
            value={filters.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("name", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Email</label>
          <FormInput
            type="email"
            color="#101828"
            bgColor="white"
            borderColor="#D5D8DC"
            placeholder="kolamarketventures@gmail.com"
            fontSize="14px"
            value={filters.email}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("email", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Phone Number</label>
          <PhoneInputComponent
            value={filters.phone}
            setValue={(value: string) => handleInputChange("phone", value)}
            color="black"
            showLabel={false}
          />

          <label className="text-sm text-[#101828]">Location</label>
          <FormInput
            type="text"
            color="#101828"
            bgColor="white"
            borderColor="#D5D8DC"
            placeholder="e.g Accra"
            fontSize="14px"
            value={filters.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("location", e.target.value)
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

export default FilterSuppliersModal;
