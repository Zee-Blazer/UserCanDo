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
import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import { useAuthSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/appContext";

export interface FilterCustomerState {
  customerName: string;
  phoneNumber: string;
  location: string;
  country: string;
  region: string;
}
interface FilterCustomerModalProps {
  open: boolean;
  onClose: () => void;
  onFilter: (filters: FilterCustomerState) => void;
  initialFilters: FilterCustomerState;
}

const FilterCustomerModal = ({
  open,
  onClose,
  onFilter,
  initialFilters,
}: FilterCustomerModalProps) => {
  const [filters, setFilters] = useState<FilterCustomerState>(initialFilters);

  const { regions, countries } = useAuthSelector();
  const { isCountryFetching, isRegionFetching, getCountryRegions } =
    useAppContext();

  useEffect(() => {
    setFilters(initialFilters);
  }, [initialFilters]);

  const handleInputChange = (
    field: keyof FilterCustomerState,
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
      customerName: "",
      phoneNumber: "",
      location: "",
      customer_business_type: "",
      country: "",
      region: "",
    };
    setFilters(resetState);
    onFilter(resetState);
    onClose();
  };

  useEffect(() => {
    if (filters.country) {
      getCountryRegions(filters.country);
    }
  }, [filters.country]);

  return (
    <Dialog open={open} handler={onClose} className="p-4">
      <DialogHeader className="relative m-0 block">
        <Typography className="text-xl font-semibold">
          Filter Customer
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
          <label className="text-sm text-[#101828]">Customer Name</label>
          <FormInput
            type="text"
            color="#101828"
            bgColor="white"
            borderColor="#D5D8DC"
            placeholder="e.g JM Ventures"
            fontSize="14px"
            value={filters.customerName}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("customerName", e.target.value)
            }
          />

          <label className="text-sm text-[#101828]">Phone Number</label>
          <PhoneInputComponent
            value={filters.phoneNumber}
            setValue={(value: string) =>
              handleInputChange("phoneNumber", value)
            }
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

          <label className="text-sm text-[#101828]">Country</label>
          {countries?.length < 1 ? (
            <FormInput
              color="#101828"
              borderColor="#D5D8DC"
              placeholder={isCountryFetching ? "Loading..." : "Enter Country"}
              value={filters.country}
              name="country"
              readOnly={isCountryFetching}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("country", e.target.value)
              }
            />
          ) : (
            <FormSelect
              color="#101828"
              borderColor="#D5D8DC"
              placeholder={isCountryFetching ? "Loading..." : "Select Country"}
              options={countries?.map((country) => country.name) || []}
              value={filters.country}
              name="country"
              bgColor="white"
              readOnly={isCountryFetching}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleInputChange("country", e.target.value)
              }
            />
          )}

          <label className="text-sm text-[#101828]">Region</label>
          {regions?.length > 0 ? (
            <FormSelect
              color="#101828"
              borderColor="#D5D8DC"
              placeholder={isRegionFetching ? "Loading..." : "Select Region"}
              readOnly={isRegionFetching}
              options={regions?.map((rg) => rg.name) || []}
              value={filters.region}
              bgColor="white"
              name="region"
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
                handleInputChange("region", e.target.value)
              }
            />
          ) : (
            <FormInput
              color="#101828"
              borderColor="#D5D8DC"
              placeholder={isRegionFetching ? "Loading..." : "Enter Region"}
              readOnly={isRegionFetching}
              value={filters.region}
              bgColor="white"
              name="region"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                handleInputChange("region", e.target.value)
              }
            />
          )}
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

export default FilterCustomerModal;
