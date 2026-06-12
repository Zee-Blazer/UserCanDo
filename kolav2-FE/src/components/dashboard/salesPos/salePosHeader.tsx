"use client";
import SalePosHeaderLinks from "./salePosHeader/salePosHeaderLinks";
import SearchHeader from "./salePosHeader/searchHeader";

interface SalePosHeaderProps {
  selectedCustomer: CreateCustomerProps | null;
  onCustomerSelected: (customer: CreateCustomerProps) => void;
  searchQuery: string;
  onSearch: (query: string) => void;
}

const SalePosHeader = ({
  selectedCustomer,
  onCustomerSelected,
  searchQuery,
  onSearch,
}: SalePosHeaderProps) => {
  return (
    <div>
      <SalePosHeaderLinks />
      <SearchHeader
        selectedCustomer={selectedCustomer}
        onCustomerSelected={onCustomerSelected}
        searchQuery={searchQuery}
        onSearch={onSearch}
      />
    </div>
  );
};

export default SalePosHeader;
