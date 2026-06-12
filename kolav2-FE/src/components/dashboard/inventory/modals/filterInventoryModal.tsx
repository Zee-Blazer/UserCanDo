import {
  Dialog,
  IconButton,
  Typography,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@material-tailwind/react";
import { RefreshCw, X } from "lucide-react";
import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import { useEffect, useState } from "react";

export interface FilterInventoryState {
  businessName: string;
  productName: string;
  SKU: string;
  category: string;
  brand: string;
}

interface FilterInventoryModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterInventoryState) => void;
  initialFilters: FilterInventoryState;
}

const FilterInventoryModal = ({
  open,
  onClose,
  onFilter,
  initialFilters,
}: FilterInventoryModalProps) => {
  const [filters, setFilters] = useState<FilterInventoryState>(initialFilters);

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (
    field: keyof FilterInventoryState,
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
      businessName: "",
      productName: "",
      SKU: "",
      category: "",
      brand: "",
    };
    setFilters(resetState);
    onFilter(resetState);
    onClose();
  };

  return (
    <Dialog open={open} handler={onClose} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-semibold">
          Filter Products
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
        <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 gap-y-6 gap-x-10 items-center">
          <label className="text-sm text-[#101828]">Business/Supplier</label>
          <FormInput
            type="text"
            color="#101828"
            bgColor="white"
            borderColor="#D5D8DC"
            placeholder="e.g JM Ventures"
            fontSize="14px"
            paddingY="2"
            className="rounded-none"
            value={filters.businessName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("businessName", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Product Name</label>
          <FormSelect
            options={["Soup"]}
            className="rounded-none w-80"
            paddingY="2"
            value={filters.productName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("productName", e.target.value)
            }
          />
          <label className="text-sm text-[#101828]">SKU</label>
          <FormInput
            type="text"
            color="#101828"
            bgColor="white"
            borderColor="#D5D8DC"
            className="rounded-none"
            paddingY="2"
            fontSize="14px"
            value={filters.SKU}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("SKU", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Category</label>
          <FormSelect
            options={["Soup"]}
            placeholder="Select Category"
            className="rounded-none w-80"
            paddingY="2"
            value={filters.category}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("category", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Brand</label>
          <div className="flex items-center gap-3 w-full">
            <div className="flex-1">
              <FormSelect
                options={["Gucci"]}
                placeholder="Select Brand"
                className="rounded-none w-full"
                paddingY="2"
              />
            </div>
            <div className="flex-shrink-0">
              <RefreshCw size={15} color="black" />
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

export default FilterInventoryModal;
