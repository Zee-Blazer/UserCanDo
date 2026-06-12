import { usePageData } from "@/api/hooks/usePageData";
import { useAppContext } from "@/app/appContext";
import { FormInput, FormSelect } from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
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

export interface FilterOrderState {
  customer_name: string;
  sale_type: string;
  sales_agent_name: string;
  due_date: string;
  payment_mode: string;
  start_date: string;
  end_date: string;
  order_number: string;
}

interface FilterOrderModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterOrderState) => void;
  initialFilters: FilterOrderState;
}

const FilterOrderModal = ({
  open,
  onClose,
  onFilter,
  initialFilters,
}: FilterOrderModalProps) => {
  const [filters, setFilters] = useState<FilterOrderState>({
    customer_name: initialFilters?.customer_name || "",
    sale_type: initialFilters?.sale_type || "",
    sales_agent_name: initialFilters?.sales_agent_name || "",
    due_date: initialFilters?.due_date || "",
    payment_mode: initialFilters?.payment_mode || "",
    start_date: initialFilters?.start_date || "",
    end_date: initialFilters?.end_date || "",
    order_number: initialFilters?.order_number || "",
  });

  const { loadSalesAgentsData, loadCustomersData } = useDash();
  const { salesAgents, customers } = useDashboardSelector();
  const { paymentModes } = useAuthSelector();
  const { isPaymentModesLoading } = useAppContext();

  usePageData([loadSalesAgentsData, loadCustomersData]);

  useEffect(() => {
    setFilters({
      customer_name: initialFilters?.customer_name || "",
      sale_type: initialFilters?.sale_type || "",
      sales_agent_name: initialFilters?.sales_agent_name || "",
      due_date: initialFilters?.due_date || "",
      payment_mode: initialFilters?.payment_mode || "",
      start_date: initialFilters?.start_date || "",
      end_date: initialFilters?.end_date || "",
      order_number: initialFilters?.order_number || "",
    });
  }, [initialFilters]);

  const handleInputChange = (field: keyof FilterOrderState, value: string) => {
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
      customer_name: "",
      sale_type: "",
      sales_agent_name: "",
      due_date: "",
      payment_mode: "",
      start_date: "",
      end_date: "",
      order_number: "",
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
        <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 gap-y-4 gap-x-14 items-center">
          <label className="text-sm text-[#101828]">Customer</label>
          <FormSelect
            placeholder="Select Customer"
            options={
              customers?.map((customer) => customer?.customer_name || "") || []
            }
            name="customer_name"
            value={filters?.customer_name}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("customer_name", e?.target?.value)
            }
            readOnly={!customers?.length}
            required
            className="rounded-none w-full"
            paddingY="2"
          />
          <label className="text-sm text-[#101828]">Sale Between</label>
          <div className="flex w-full items-center gap-3">
            <div className="flex-1">
              <FormInput
                type="date"
                className="rounded-none w-full bg-inherit"
                paddingY="2"
                value={filters?.start_date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("start_date", e?.target?.value)
                }
              />
            </div>
            <span className="text-black whitespace-nowrap">and</span>
            <div className="flex-1">
              <FormInput
                type="date"
                className="rounded-none w-full bg-inherit"
                paddingY="2"
                value={filters?.end_date}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  handleInputChange("end_date", e?.target?.value)
                }
              />
            </div>
          </div>
          <label className="text-sm text-[#101828]">Due Date</label>
          <FormInput
            type="date"
            className="rounded-none w-full bg-inherit"
            paddingY="2"
            value={filters?.due_date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("due_date", e?.target?.value)
            }
          />
          <label className="text-sm text-[#101828]">Order Number</label>
          <FormInput
            type="text"
            className="rounded-none w-full bg-inherit"
            paddingY="2"
            placeholder="xxx-xxx-xxxx"
            value={filters?.order_number}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("order_number", e?.target?.value)
            }
          />
          <label className="text-sm text-[#101828]">Payment Mode</label>
          <FormSelect
            placeholder={
              isPaymentModesLoading ? "Loading..." : "Select Payment Mode"
            }
            options={
              paymentModes?.map((paymentMode) => paymentMode?.value) || []
            }
            name="payment_mode"
            value={filters?.payment_mode}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("payment_mode", e?.target?.value)
            }
            readOnly={isPaymentModesLoading}
            required
            className="rounded-none w-full"
            paddingY="2"
          />
          <label className="text-sm text-[#101828]">Sale Type</label>
          <FormSelect
            placeholder="Select Sale Type"
            options={["cash", "credit"]}
            name="sale_type"
            value={filters?.sale_type}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("sale_type", e?.target?.value)
            }
            className="rounded-none w-full"
            paddingY="2"
          />
          <label className="text-sm text-[#101828]">Sale Agent</label>
          <FormSelect
            options={salesAgents?.map((agent) => agent?.name) || []}
            placeholder="Select Sales Agent"
            className="rounded-none w-full"
            paddingY="2"
            value={filters?.sales_agent_name}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
              handleInputChange("sales_agent_name", e?.target?.value)
            }
            readOnly={!salesAgents?.length}
          />
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

export default FilterOrderModal;
