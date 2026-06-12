"use client";
import React, { ChangeEvent, useState } from "react";
import AddCustomerModal from "@/components/dashboard/salesPos/modals/addCustomerModal";
import { colors } from "@/constants/colors";
import { Button, Typography } from "@material-tailwind/react";
import { Plus, Search } from "lucide-react";
import AddCustomerFlyout from "../../customers/addCustomerFlyout";
import { FormInput } from "@/components/General/form";
import { UIGuard } from "@/components/guards/roleGuard";

interface SearchHeaderProps {
  selectedCustomer: CreateCustomerProps | null;
  onCustomerSelected: (customer: CreateCustomerProps) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SearchHeader = ({
  selectedCustomer,
  onCustomerSelected,
  searchQuery,
  onSearch,
}: SearchHeaderProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const handleAddCustomerClick = () => {
    setIsDialogOpen(true);
  };

  const handleFlyoutOpen = () => {
    setIsAddCustomerOpen(true);
    setIsDialogOpen(false);
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mt-4 md:gap-10">
      <div className="md:col-span-7">
        <FormInput
          placeholder="Search by product name"
          icon={<Search />}
          iconPosition="left"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="md:col-span-5 mt-3">
        {selectedCustomer ? (
          <div className="flex items-center justify-between">
            <div className="flex bg-[#F9FAFB] w-72 p-1 rounded-lg items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-pry2 bg-opacity-10 flex items-center justify-center">
                {selectedCustomer?.customer_name?.charAt(0) || "?"}
              </div>
              <span>
                {selectedCustomer?.customer_name || "Unknown Customer"}
              </span>
            </div>
            <Button
              variant="text"
              className="text-pry2 normal-case border w-36 border-pry2 py-2"
              onClick={handleAddCustomerClick}
            >
              <Typography>Change</Typography>
            </Button>
          </div>
        ) : (
          <UIGuard permission="CREATE_CUSTOMER">
            <Button
              onClick={handleAddCustomerClick}
              className="flex border text-md gap-2 py-2 border-pry2 normal-case text-white bg-pry2 w-full justify-center font-normal items-center"
            >
              <Plus color={colors.pry2} />
              Add Customer
            </Button>
          </UIGuard>
        )}
      </div>

      <AddCustomerModal
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onClick={handleFlyoutOpen}
        onSelectCustomer={onCustomerSelected}
      />

      <AddCustomerFlyout
        isRightDrawerOpen={isAddCustomerOpen}
        closeFlyout={() => setIsAddCustomerOpen(false)}
      />
    </div>
  );
};

export default SearchHeader;
