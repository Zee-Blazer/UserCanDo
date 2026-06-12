import { COLORS } from "@/constants/colors";
import { SearchIcon } from "lucide-react";
import React from "react";

interface SearchCompProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  setPageIndex?: React.Dispatch<React.SetStateAction<number>>;
  filterList?: string[];
  handleFilterChange?: (selectedFilter: string) => void;
  placeholder?: string;
  maxWidth?: string;
  placeholderColor?: string;
  searchIcon?: React.ReactNode;
  iconColor?: string;
}

const SearchComp: React.FC<SearchCompProps> = ({
  searchTerm,
  setSearchTerm,
  setPageIndex,
  placeholder = "Search",
  maxWidth,
  placeholderColor,
  searchIcon,
  iconColor = COLORS.gray4,
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPageIndex && setPageIndex(1);
  };

  return (
    <div
      className={`flex gap-3 my-3 relative w-full justify-between items-center border-[1px] border-gray_2 rounded-md ${maxWidth || "lg:max-w-[257px]"
        }`}
    >
      <span className="absolute h-full top-0 flex items-center justify-center px-3">
        {searchIcon || <SearchIcon size={20} color={iconColor} />}
      </span>
      <input
        type="text"
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleInputChange}
        className={`rounded-md p-2 pl-12 w-full bg-transparent placeholder:${placeholderColor}`}
      />
    </div>
  );
};

export default SearchComp;
