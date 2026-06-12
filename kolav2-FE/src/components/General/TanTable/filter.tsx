import { colors } from "@/constants/colors";
import { Filter } from "lucide-react";
import React from "react";

interface TableFilterProps {
  filterList?: string[];
  handleFilterChange: (selectedFilter: string) => void;
}
const TableFilter = ({ filterList, handleFilterChange }: TableFilterProps) => {
  return (
    <div className="relative">
      <select
        name="tableFilter"
        title="tableFilter"
        className="p-2 pl-10 bg-transparent border-[1px] border-gray_2 rounded-md capitalize text-sm text-gray_4"
        onChange={(e) => {
          handleFilterChange && handleFilterChange(e.target.value);
        }}
      >
        <option value="">Filter</option>
        {filterList?.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
      <span className="absolute px-4 left-0 flex h-full top-0 items-center justify-center">
        <Filter size={20} color={colors.gray_4} />
      </span>
    </div>
  );
};

export default TableFilter;
