import { usePageData } from "@/api/hooks/usePageData";
import { FormInput, FormSelect } from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import {
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface FilterPurchaseOrderState {
  product_name: string;
  payment_mode: string;
  saleBetween: string;
  saleType: string;
  paymentType: string;
  supplier_name: string;
  dueBetween: string;
}

interface FilterPurchaseOrderProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterPurchaseOrderState) => void;
  initialFilters: FilterPurchaseOrderState;
}

const FilterPurchaseOrder = ({
  open,
  onClose,
  onFilter,
  initialFilters,
}: FilterPurchaseOrderProps) => {
  const { loadSupplierData } = useDash();
  const { suppliers } = useDashboardSelector();

  usePageData([loadSupplierData]);

  const [filters, setFilters] =
    useState<FilterPurchaseOrderState>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (
    field: keyof FilterPurchaseOrderState,
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
      product_name: "",
      payment_mode: "",
      saleBetween: "",
      saleType: "",
      paymentType: "",
      supplier_name: "",
      dueBetween: "",
    };
    setFilters(resetState);
    onFilter(resetState);
    onClose();
  };

  return (
    <Dialog open={open} handler={onClose} size="lg" className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-semibold">Filter Order</Typography>
        <IconButton
          variant="text"
          className="!absolute right-3.5 top-3.5"
          onClick={onClose}
        >
          <X className="h-5 w-5 stroke-2" />
        </IconButton>
      </DialogHeader>
      <DialogBody className="space-y-4 md:max-h-none md:overflow-visible overflow-y-auto">
        <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 gap-y-8 gap-x-14 items-center">
          <label className="text-sm text-[#101828]">Supplier</label>
          <FormSelect
            options={suppliers?.map((data) => data?.name) || []}
            placeholder="Search supplier name"
            className="w-full"
            paddingY="3"
            value={filters.supplier_name}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("supplier_name", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Payment Status</label>
          <FormSelect
            options={["Fully Paid", "Unpaid", "Partially Paid"]}
            className="rounded-none w-full"
            placeholder="Select Payment Status"
            paddingY="2"
            value={filters.paymentType}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("paymentType", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Sale Between</label>
          <div className="flex w-full items-center gap-3">
            <div className="flex-1">
              <FormInput
                type="date"
                className="rounded-none w-full bg-inherit"
                paddingY="2"
                value={filters.saleBetween}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("saleBetween", e.target.value)
                }
              />
            </div>
          </div>

          <label className="text-sm text-[#101828]">Due Between</label>
          <div className="flex w-full items-center gap-3">
            <div className="flex-1">
              <FormInput
                type="date"
                className="rounded-none w-full bg-inherit"
                paddingY="2"
                value={filters.dueBetween}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("dueBetween", e.target.value)
                }
              />
            </div>
          </div>
        </div>
      </DialogBody>
      <DialogFooter className="flex justify-end gap-3 flex-nowrap">
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

export default FilterPurchaseOrder;
