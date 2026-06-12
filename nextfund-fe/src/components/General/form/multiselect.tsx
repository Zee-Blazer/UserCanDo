import { CaretDown } from "@phosphor-icons/react";
import { XIcon } from "lucide-react";
import { useEffect, useState } from "react";

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
        className="flex flex-wrap items-center justify-between border px-3 py-2 cursor-pointer rounded-lg min-h-[42px]"
        onClick={toggleDropdown}
      >
        {selected.length === 0 && (
          <span className="text-gray-500">{placeholder}</span>
        )}
        <div className="flex items-center flex-wrap gap-2">
          {selected.map((option) => (
            <div
              key={option}
              className="flex items-center gap-x-2 bg-[#ECFDF3B2] text-[#027A48] text-sm px-2 py-1 rounded-lg"
            >
              <span>{option}</span>
              <button
                type="button"
                className="flex items-center justify-center p-0 text-sm text-[#DA9C9C] hover:text-red-600 bg-transparent border-none outline-none"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemove(option);
                }}
              >
                <XIcon size={16} />
              </button>
            </div>
          ))}
        </div>
        <button type="button" className="bg-transparent border-none outline-none ml-2">
          <CaretDown />
        </button>
      </div>

      {/* Dropdown */}
      {dropdownOpen && (
        <div className="absolute z-50 w-full mt-2 bg-white border rounded-lg shadow-lg max-h-60 overflow-auto" style={{ zIndex: 9999 }}>
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
