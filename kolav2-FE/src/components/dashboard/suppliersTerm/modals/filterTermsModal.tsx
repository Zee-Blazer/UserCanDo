import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Input,
  Select,
  Option,
  Typography,
} from "@material-tailwind/react";
import { X } from "lucide-react";

interface FilterTermsModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterTermState) => void;
  currentFilters: FilterTermState;
}

interface FilterTermState {
  supplier_name?: string;
  approval_status?: string;
  payment_status?: string;
  due_date?: string;
  start_date?: string;
  end_date?: string;
  term_number?: string;
}

const FilterTermsModal = ({
  open,
  onClose,
  onFilter,
  currentFilters,
}: FilterTermsModalProps) => {
  const [filters, setFilters] = useState<FilterTermState>(currentFilters);

  useEffect(() => {
    setFilters(currentFilters);
  }, [currentFilters, open]);

  const handleInputChange = (field: keyof FilterTermState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleClearFilters = () => {
    const clearedFilters: FilterTermState = {
      supplier_name: "",
      approval_status: "",
      payment_status: "",
      due_date: "",
      start_date: "",
      end_date: "",
      term_number: "",
    };
    setFilters(clearedFilters);
    onFilter(clearedFilters);
  };

  const approvalStatusOptions = [
    { value: "", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "approved", label: "Approved" },
    { value: "declined", label: "Declined" },
    { value: "on hold", label: "On Hold" },
  ];

  const paymentStatusOptions = [
    { value: "", label: "All Status" },
    { value: "not due", label: "Not Due" },
    { value: "partially paid", label: "Partially Paid" },
    { value: "fully paid", label: "Fully Paid" },
    { value: "overdue", label: "Overdue" },
    { value: "due today", label: "Due Today" },
  ];

  return (
    <Dialog open={open} handler={onClose} size="md" className="max-w-2xl">
      <DialogHeader className="flex items-center justify-between">
        <Typography variant="h5" className="font-bold">
          Filter Credit Request
        </Typography>
        <Button variant="text" color="gray" onClick={onClose} className="p-2">
          <X size={20} />
        </Button>
      </DialogHeader>

      <DialogBody className="space-y-4 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Term Number */}
          <div>
            <Typography variant="small" className="mb-2 font-medium">
              Term Number
            </Typography>
            <Input
              label="Enter term number"
              value={filters.term_number || ""}
              onChange={(e) => handleInputChange("term_number", e.target.value)}
              crossOrigin={undefined}
            />
          </div>

          {/* Supplier Name */}
          <div>
            <Typography variant="small" className="mb-2 font-medium">
              Supplier Name
            </Typography>
            <Input
              label="Enter supplier name"
              value={filters.supplier_name || ""}
              onChange={(e) =>
                handleInputChange("supplier_name", e.target.value)
              }
              crossOrigin={undefined}
            />
          </div>

          {/* Approval Status */}
          <div>
            <Typography variant="small" className="mb-2 font-medium">
              Approval Status
            </Typography>
            <Select
              label="Select approval status"
              value={filters.approval_status || ""}
              onChange={(value) =>
                handleInputChange("approval_status", value || "")
              }
            >
              {approvalStatusOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Payment Status */}
          <div>
            <Typography variant="small" className="mb-2 font-medium">
              Payment Status
            </Typography>
            <Select
              label="Select payment status"
              value={filters.payment_status || ""}
              onChange={(value) =>
                handleInputChange("payment_status", value || "")
              }
            >
              {paymentStatusOptions.map((option) => (
                <Option key={option.value} value={option.value}>
                  {option.label}
                </Option>
              ))}
            </Select>
          </div>

          {/* Start Date */}
          <div>
            <Typography variant="small" className="mb-2 font-medium">
              Start Date
            </Typography>
            <Input
              type="date"
              label="Select start date"
              value={filters.start_date || ""}
              onChange={(e) => handleInputChange("start_date", e.target.value)}
              crossOrigin={undefined}
            />
          </div>

          {/* End Date */}
          <div>
            <Typography variant="small" className="mb-2 font-medium">
              End Date
            </Typography>
            <Input
              type="date"
              label="Select end date"
              value={filters.end_date || ""}
              onChange={(e) => handleInputChange("end_date", e.target.value)}
              crossOrigin={undefined}
            />
          </div>

          {/* Due Date */}
          <div className="md:col-span-2">
            <Typography variant="small" className="mb-2 font-medium">
              Due Date
            </Typography>
            <Input
              type="date"
              label="Select due date"
              value={filters.due_date || ""}
              onChange={(e) => handleInputChange("due_date", e.target.value)}
              crossOrigin={undefined}
            />
          </div>
        </div>
      </DialogBody>

      <DialogFooter className="flex gap-2">
        <Button
          variant="outlined"
          color="gray"
          onClick={handleClearFilters}
          className="flex-1"
        >
          Clear Filters
        </Button>
        <Button
          variant="outlined"
          color="gray"
          onClick={onClose}
          className="flex-1"
        >
          Cancel
        </Button>
        <Button className="flex-1 bg-sec" onClick={handleApplyFilters}>
          Apply Filters
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default FilterTermsModal;
