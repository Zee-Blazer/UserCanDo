import React from "react";

interface PercentageInputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  labelGap?: string;
  percentageBgColor?: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: string;
  disabled?: boolean;
}

const PercentageInput = ({
  label,
  placeholder = "0",
  value,
  onChange,
  labelGap = "gap-4",
  percentageBgColor = "bg-gray-50",
  labelClassName = "text-sm font-normal text-black",
  inputClassName = "",
  error,
  disabled,
}: PercentageInputProps) => {
  return (
    <div className={`flex items-center ${label ? labelGap : ""}`}>
      {label && (
        <label className={`w-24 whitespace-nowrap ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="flex flex-1">
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 border border-gray-300 px-3 py-2 rounded-l ${
            error ? "border-red-500" : ""
          } ${inputClassName}`}
        />
        <span
          className={`inline-flex items-center px-3 border border-l-0 border-gray-300 ${percentageBgColor} text-gray_5 font-normal text-sm rounded-r`}
        >
          %
        </span>
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default PercentageInput;
