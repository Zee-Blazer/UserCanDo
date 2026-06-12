import React from "react";

interface CurrencyInputProps {
  label?: string;
  placeholder?: string;
  value?: string | number;
  onChange?: (value: string) => void;
  currency?: string;
  labelGap?: string;
  currencyBgColor?: string;
  labelClassName?: string;
  inputClassName?: string;
  error?: string;
  disabled?: boolean;
}

const CurrencyInput = ({
  label,
  placeholder = "0",
  value,
  onChange,
  currency = "GHS",
  labelGap = "gap-4",
  currencyBgColor = "bg-gray-50",
  labelClassName = "text-sm font-normal text-black",
  inputClassName = "",
  error,
  disabled,
}: CurrencyInputProps) => {
  return (
    <div className={`flex items-center ${label ? labelGap : ""}`}>
      {label && (
        <label className={`w-24 whitespace-nowrap ${labelClassName}`}>
          {label}
        </label>
      )}
      <div className="flex flex-1">
        <span
          className={`inline-flex items-center px-3 border border-r-0 border-gray-300 ${currencyBgColor} text-gray_5 font-normal text-sm rounded-l`}
        >
          {currency}
        </span>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 border border-gray-300 px-3 py-2 rounded-r ${
            error ? "border-red-500" : ""
          } ${inputClassName}`}
        />
      </div>
      {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
    </div>
  );
};

export default CurrencyInput;
