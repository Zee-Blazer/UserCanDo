import React, { useEffect, useState } from "react";
import {
  IconButton,
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { CalendarDays, X } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "@/constants/colors";

export interface FilterStockState {
  dateFrom: Date | null;
  dateTo: Date | null;
}

interface FilterStockModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterStockState) => void;
  initialFilters: FilterStockState;
}

const FilterStockModal = ({
  open,
  onClose,
  onFilter,
  initialFilters,
}: FilterStockModalProps) => {
  const [filters, setFilters] = useState<FilterStockState>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (field: keyof FilterStockState, value: any) => {
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
      dateFrom: null,
      dateTo: null,
    };
    setFilters(resetState);
    onFilter(resetState);
    onClose();
  };

  // DatePicker custom input component
  const CustomDateInput = React.forwardRef<
    HTMLDivElement,
    {
      value?: string;
      onClick?: () => void;
      placeholder: string;
    }
  >(({ value, onClick, placeholder }, ref) => (
    <div
      className="flex items-center gap-2 bg-white rounded-md border border-[#D5D8DC] p-2 cursor-pointer"
      onClick={onClick}
      ref={ref}
    >
      <CalendarDays size={18} color={colors.gray_4} />
      <input
        value={value}
        readOnly
        placeholder={placeholder}
        className="outline-none border-none w-full text-sm cursor-pointer"
      />
    </div>
  ));

  return (
    <Dialog size="xs" open={open} handler={onClose} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-semibold">
          Filter Available Stocks
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col">
            <label className="text-sm text-[#101828] mb-1">Date From</label>
            <DatePicker
              selected={filters.dateFrom}
              onChange={(date) => handleInputChange("dateFrom", date)}
              selectsStart
              startDate={filters.dateFrom}
              endDate={filters.dateTo}
              customInput={<CustomDateInput placeholder="YYYY/MM/DD" />}
              dateFormat="yyyy/MM/dd"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-sm text-[#101828] mb-1">Date To</label>
            <DatePicker
              selected={filters.dateTo}
              onChange={(date) => handleInputChange("dateTo", date)}
              selectsEnd
              startDate={filters.dateFrom}
              endDate={filters.dateTo}
              customInput={<CustomDateInput placeholder="YYYY/MM/DD" />}
              dateFormat="yyyy/MM/dd"
            />
          </div>
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

export default FilterStockModal;
