import {
  Button,
  Menu,
  MenuHandler,
  MenuItem,
  MenuList,
} from "@material-tailwind/react";
import React, { useState } from "react";
// Inline SVG for sort icon (replaces missing SortIcon)
const SortIcon: React.FC = () => (
  <svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 8L10 12L14 8" stroke="#17406D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

interface SortOption {
  key: string;
  label: string;
  icon?: React.ReactNode;
  type?: "string" | "date" | "number";
  defaultDirection?: "asc" | "desc";
}

interface SortFilterProps {
  data: any[];
  onSort: (data: any[]) => void;
  sortOptions: SortOption[];
}

const SortFilter: React.FC<SortFilterProps> = ({
  data,
  onSort,
  sortOptions,
}) => {
  const [activeOption, setActiveOption] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (option: SortOption) => {
    // Toggle direction if clicking the same option again
    if (activeOption === option.key) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setActiveOption(option.key);
      setSortDirection(option.defaultDirection || "asc");
    }

    const direction =
      activeOption === option.key
        ? sortDirection === "asc"
          ? "desc"
          : "asc"
        : option.defaultDirection || "asc";

    const sortType = option.type || "string";

    const sortedData = [...data].sort((a, b) => {
      // Get nested properties if key contains dots
      const valueA = option.key.split(".").reduce((obj, k) => obj?.[k], a);
      const valueB = option.key.split(".").reduce((obj, k) => obj?.[k], b);

      // Handle null/undefined values
      if (valueA === null || valueA === undefined)
        return direction === "asc" ? 1 : -1;
      if (valueB === null || valueB === undefined)
        return direction === "asc" ? -1 : 1;

      if (sortType === "date") {
        const dateA = new Date(valueA).getTime();
        const dateB = new Date(valueB).getTime();

        // If invalid dates, fall back to string comparison
        if (isNaN(dateA) || isNaN(dateB)) {
          return direction === "asc"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
        }

        return direction === "asc" ? dateA - dateB : dateB - dateA;
      } else if (sortType === "number") {
        const numA = Number(valueA);
        const numB = Number(valueB);

        // If invalid numbers, fall back to string comparison
        if (isNaN(numA) || isNaN(numB)) {
          return direction === "asc"
            ? String(valueA).localeCompare(String(valueB))
            : String(valueB).localeCompare(String(valueA));
        }

        return direction === "asc" ? numA - numB : numB - numA;
      } else {
        // String handling (case-insensitive)
        const strA = String(valueA).toLowerCase();
        const strB = String(valueB).toLowerCase();

        return direction === "asc"
          ? strA.localeCompare(strB)
          : strB.localeCompare(strA);
      }
    });

    onSort(sortedData);
  };

  if (!sortOptions?.length) return null;

  return (
    <Menu placement="bottom-end">
      <MenuHandler>
        <Button
          variant="outlined"
          className="p-2 bg-transparent border border-gray_2 rounded-md flex items-center gap-2 normal-case"
          onPointerEnterCapture={() => { }}
          onPointerLeaveCapture={() => { }}
          onResize={() => { }}
          onResizeCapture={() => { }}
          placeholder=""
        >
          <SortIcon />
        </Button>
      </MenuHandler>
      <MenuList
        className="min-w-[200px]"
        onPointerEnterCapture={() => { }}
        onPointerLeaveCapture={() => { }}
        onResize={() => { }}
        onResizeCapture={() => { }}
        placeholder=""
      >
        {sortOptions.map((option) => (
          <MenuItem
            key={option.key}
            className={`flex items-center gap-3 ${activeOption === option.key ? "bg-gray-100" : ""
              }`}
            onClick={() => handleSort(option)}
            onPointerEnterCapture={() => { }}
            onPointerLeaveCapture={() => { }}
            onResize={() => { }}
            onResizeCapture={() => { }}
            placeholder=""
            type="button"
          >
            {option.icon || <SortIcon />}
            <span className="font-normal">
              {option.label}
              {activeOption === option.key && (
                <span className="ml-1 text-sm text-gray-500">
                  ({sortDirection === "asc" ? "↑" : "↓"})
                </span>
              )}
            </span>
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default SortFilter;
