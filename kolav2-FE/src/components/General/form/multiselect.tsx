import React, { useState, useEffect } from "react";
import { CaretDown } from "@phosphor-icons/react";
import { IconButton } from "@material-tailwind/react";
import { XIcon } from "lucide-react";

interface MultiSelectProps {
  options: string[]; // Available options to select from
  selectedOptions?: string[]; // Preselected options
  placeholder?: string; // Placeholder text for the select input
  onChange?: (selected: string[]) => void; // Callback to handle value changes
}

const MultiSelect = ({
  options,
  selectedOptions = [],
  placeholder = "Select options...",
  onChange,
}: MultiSelectProps) => {
  const [selected, setSelected] = useState<string[]>(selectedOptions);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Add useEffect to update internal state when selectedOptions prop changes
  useEffect(() => {
    setSelected(selectedOptions);
  }, [selectedOptions]);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  const handleSelect = (option: string) => {
    if (!selected.includes(option)) {
      const newSelected = [...selected, option];
      setSelected(newSelected);
      onChange?.(newSelected); 
    }
  };

  const handleRemove = (option: string) => {
    const newSelected = selected.filter((item) => item !== option);
    setSelected(newSelected);
    onChange?.(newSelected); // Notify parent of changes
  };

  return (
    <div className="relative w-full">
      {/* Select Box */}
      <div
        className="flex flex-wrap items-center justify-between border px-2 cursor-pointer"
        onClick={toggleDropdown}
      >
        {selected.length === 0 && (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <div className="flex items-center flex-wrap gap-2">
          {selected.map((option) => (
            <div
              key={option}
              className="flex items-center gap-x-2 bg-[#ECFDF3B2] text-[#027A48] text-sm px-3 py-2 rounded-lg"
            >
              <span>{option}</span>
              <IconButton
                variant="text"
                className="p-0 h-2 w-6 text-sm text-[#DA9C9C] hover:text-red-600"
                onClick={(e) => {
                  e.stopPropagation(); 
                  handleRemove(option);
                }}
              >
                <XIcon size="16" />
              </IconButton>
            </div>
          ))}
        </div>
        <IconButton variant="text">
          <CaretDown />
        </IconButton>
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute z-10 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto">
          {options
            .filter((option: string) => !selected.includes(option))
            .map((option) => (
              <div
                key={option}
                className="px-4 py-2 cursor-pointer hover:bg-blue-100 text-sm font-medium"
                onClick={() => {
                  handleSelect(option);
                  setDropdownOpen(false);
                }}
              >
                {option}
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
