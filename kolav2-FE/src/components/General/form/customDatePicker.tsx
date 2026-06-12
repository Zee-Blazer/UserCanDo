import React from "react";
import { DayPicker } from "react-day-picker";
import { Button } from "@material-tailwind/react";
import "react-day-picker/dist/style.css";

export type DateRange = {
  from: Date | undefined;
  to: Date | undefined;
};

export interface CustomDatePickerProps {
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
  onClose: () => void;
  onApply: () => void;
  quickRanges?: string[];
  position?: "top" | "bottom";
  className?: string;
}

const defaultQuickRanges = [
  "Today",
  "Yesterday",
  "Last 7 Days",
  "This Quarter",
  "Last Quarter",
  "This Year",
  "Custom Range",
];

export const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  selectedRange,
  onRangeChange,
  onClose,
  onApply,
  quickRanges = defaultQuickRanges,
  position = "top",
  className = "",
}) => {
  const defaultMonth = new Date();
  const nextMonth = new Date();
  nextMonth.setMonth(defaultMonth.getMonth() + 1);

  return (
    <div
      className={`absolute left-0 right-0 ${position}-full z-7 mt-3 ${className}`}
    >
      <div className="bg-white shadow-xl p-2 border rounded-lg">
        <div className="flex p-4">
          <div className="w-48">
            {quickRanges.map((range) => (
              <div
                key={range}
                className="cursor-pointer hover:bg-[#0088CC] hover:text-white px-3 py-2 text-md text-gray-600"
              >
                {range}
              </div>
            ))}
          </div>
          <div className="flex-1">
            <div className="flex shadow-md rounded-xl p-5 justify-center">
              <div className="scale-95 origin-left">
                <DayPicker
                  mode="single"
                  defaultMonth={defaultMonth}
                  selected={selectedRange.from}
                  onSelect={(date) =>
                    onRangeChange({ ...selectedRange, from: date || undefined })
                  }
                />
              </div>
              <div className="scale-95 origin-right">
                <DayPicker
                  mode="single"
                  defaultMonth={nextMonth}
                  selected={selectedRange.to}
                  onSelect={(date) =>
                    onRangeChange({ ...selectedRange, to: date || undefined })
                  }
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2 p-3">
          <Button
            variant="outlined"
            className="text-sm border border-gray_4 font-medium py-2"
            onClick={onClose}
          >
            Close
          </Button>
          <Button
            variant="filled"
            className="text-sm font-medium px-8 py-2 bg-pry2"
            onClick={onApply}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};
