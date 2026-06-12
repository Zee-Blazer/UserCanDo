import { FormInput } from "@/components/General/form";
import FilterDialog from "@/components/General/TanTable/filterDialog";
import FilterStockModal from "@/components/shoppers/stock/FilterStockModal";
import { Button, Typography } from "@material-tailwind/react";
import { Search } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

interface StockPageHeaderProps {
  addNewStock: () => void;
}

const StockPageHeader: React.FC<StockPageHeaderProps> = ({ addNewStock }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);

  const [filters, setFilters] = useState({
    dateFrom: null,
    dateTo: null,
  });

  const handleFilter = (newFilters: any) => {
    setFilters(newFilters);
    setIsFilterModalOpen(false);
  };

  return (
    <header className="flex flex-col md:flex-row justify-between gap-4">
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 w-full md:w-auto">
        <Typography className="font-semibold text-black text-xl">
          Stock
        </Typography>
        <div className="w-full md:w-auto">
          <FormInput
            placeholder="Search by Business Name"
            icon={<Search />}
            iconPosition="left"
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            className="w-full"
          />
        </div>
      </div>
      <div className="flex gap-4 w-full md:w-auto">
        <Button
          className="bg-[#E0F0FF] py-2 w-full md:w-40 normal-case"
          onClick={addNewStock}
        >
          <Typography className="text-[#0052A3] font-medium">
            Add Stock
          </Typography>
        </Button>
        <FilterDialog onClick={() => setIsFilterModalOpen(true)} />
      </div>
      <FilterStockModal
        open={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onFilter={handleFilter}
        initialFilters={filters}
      />
    </header>
  );
};

export default StockPageHeader;
