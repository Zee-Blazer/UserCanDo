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
import { FormInput, FormSelect } from "@/components/General/form";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { colors } from "@/constants/colors";
import { useAppContext } from "@/app/appContext";
import { useDash } from "@/context/dashboardContext";
import { usePageData } from "@/api/hooks/usePageData";

export interface FilterSaleState {
  customer: string;
  saleStartDate: Date | null;
  saleEndDate: Date | null;
  saleType: string;
  paymentMode: string;
  saleAgent: string;
  dueStartDate: Date | null;
  dueEndDate: Date | null;
}

interface FilterSalesModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterSaleState) => void;
  initialFilters: FilterSaleState;
}

const FilterSalesModal = ({
  open,
  onClose,
  onFilter,
  initialFilters,
}: FilterSalesModalProps) => {
  const [filters, setFilters] = useState<FilterSaleState>(initialFilters);
  const { loadCustomersData, loadSalesAgentsData } = useDash();
  const { customers, salesAgents } = useDashboardSelector();

  const { saleTypes, paymentModes } = useAuthSelector();
  const { isSaleTypesLoading, isPaymentModesLoading } = useAppContext();

  usePageData([loadCustomersData, loadSalesAgentsData]);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (field: keyof FilterSaleState, value: any) => {
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
      customer: "",
      saleStartDate: null,
      saleEndDate: null,
      saleType: "",
      paymentMode: "",
      saleAgent: "",
      dueStartDate: null,
      dueEndDate: null,
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
    <Dialog open={open} handler={onClose} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-semibold">Filter Sale</Typography>
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
          <label className="text-sm text-[#101828]">Customer</label>
          <FormSelect
            color="#101828"
            borderColor="#D5D8DC"
            placeholder="Select Customer"
            options={
              customers?.map((customer) => customer.customer_name || "") || []
            }
            value={filters.customer}
            name="customer"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("customer", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Sale Between</label>
          <div className="flex items-center gap-2">
            <div className="w-full">
              <DatePicker
                selected={filters.saleStartDate}
                onChange={(date) => handleInputChange("saleStartDate", date)}
                selectsStart
                startDate={filters.saleStartDate}
                endDate={filters.saleEndDate}
                customInput={<CustomDateInput placeholder="YYYY/MM/DD" />}
                dateFormat="yyyy/MM/dd"
              />
            </div>
            <span>and</span>
            <div className="w-full">
              <DatePicker
                selected={filters.saleEndDate}
                onChange={(date) => handleInputChange("saleEndDate", date)}
                selectsEnd
                startDate={filters.saleStartDate}
                endDate={filters.saleEndDate}
                customInput={<CustomDateInput placeholder="YYYY/MM/DD" />}
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>

          <label className="text-sm text-[#101828]">Sale Type</label>
          {saleTypes?.length < 1 ? (
            <FormInput
              color="#101828"
              borderColor="#D5D8DC"
              placeholder={
                isSaleTypesLoading ? "Loading..." : "Enter Sale Type"
              }
              value={filters.saleType}
              name="saleType"
              readOnly={isSaleTypesLoading}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleInputChange("saleType", e.target.value)
              }
            />
          ) : (
            <FormSelect
              color="#101828"
              borderColor="#D5D8DC"
              placeholder={
                isSaleTypesLoading ? "Loading..." : "Select Sale Type"
              }
              options={saleTypes?.map((saleType) => saleType.value) || []}
              value={filters.saleType}
              name="saleType"
              readOnly={isSaleTypesLoading}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleInputChange("saleType", e.target.value)
              }
            />
          )}

          <label className="text-sm text-[#101828]">Payment Mode</label>
          {paymentModes?.length < 1 ? (
            <FormInput
              color="#101828"
              borderColor="#D5D8DC"
              placeholder={
                isPaymentModesLoading ? "Loading..." : "Enter Payment Mode"
              }
              value={filters.paymentMode}
              name="paymentMode"
              readOnly={isPaymentModesLoading}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleInputChange("paymentMode", e.target.value)
              }
            />
          ) : (
            <FormSelect
              color="#101828"
              borderColor="#D5D8DC"
              placeholder={
                isPaymentModesLoading ? "Loading..." : "Select Payment Mode"
              }
              options={
                paymentModes?.map((paymentMode) => paymentMode.value) || []
              }
              value={filters.paymentMode}
              name="paymentMode"
              readOnly={isPaymentModesLoading}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleInputChange("paymentMode", e.target.value)
              }
            />
          )}

          <label className="text-sm text-[#101828]">Sale Agent</label>
          <FormSelect
            color="#101828"
            borderColor="#D5D8DC"
            placeholder="Select Sale Agent"
            options={salesAgents?.map((agent) => agent.name) || []}
            value={filters.saleAgent}
            name="saleAgent"
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("saleAgent", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Due Between</label>
          <div className="flex items-center gap-2">
            <div className="w-full">
              <DatePicker
                selected={filters.dueStartDate}
                onChange={(date) => handleInputChange("dueStartDate", date)}
                selectsStart
                startDate={filters.dueStartDate}
                endDate={filters.dueEndDate}
                customInput={<CustomDateInput placeholder="YYYY/MM/DD" />}
                dateFormat="yyyy/MM/dd"
              />
            </div>
            <span>and</span>
            <div className="w-full">
              <DatePicker
                selected={filters.dueEndDate}
                onChange={(date) => handleInputChange("dueEndDate", date)}
                selectsEnd
                startDate={filters.dueStartDate}
                endDate={filters.dueEndDate}
                customInput={<CustomDateInput placeholder="YYYY/MM/DD" />}
                dateFormat="yyyy/MM/dd"
              />
            </div>
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

export default FilterSalesModal;
