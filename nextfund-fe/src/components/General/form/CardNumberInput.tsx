import { COLORS } from "@/constants/colors";
import React, { useState } from "react";
import { iInputField } from "./formTypes";

const CardNumberInput = ({
  label,
  type,
  value,
  onChange,
  error,
  placeholder,
  icon,
  iconPosition,
  iconClick,
  required,
  optional,
  name,
  readOnly,
  bgColor,
  borderColor,
  borderWidth,
  color,
  inputRef,
  fontSize,
  paddingX,
  paddingY,
  className,
  id,
  requiredColor = "text-red-400",
  ...rest
}: iInputField) => {
  const [isValid, setIsValid] = useState(true);

  // Function to format card number with spaces
  const formatCardNumber = (input: string) => {
    return input
      .replace(/\D/g, "") // Remove non-numeric characters
      .replace(/(\d{4})/g, "$1 ") // Add space every 4 digits
      .trim(); // Remove trailing spaces
  };

  // Function to validate card number (must be 16 digits)
  const validateCardNumber = (input: string) => {
    const digitsOnly = input.replace(/\D/g, ""); // Remove spaces
    return digitsOnly.length === 16;
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = event.target.value;
    const formattedValue = formatCardNumber(rawValue);
    const valid = validateCardNumber(formattedValue);
    setIsValid(valid);

    // Call the parent's onChange with the formatted value
    if (onChange) {
      onChange({
        ...event,
        target: { ...event.target, value: formattedValue, name },
      });
    }
  };

  return (
    <div>
      {label && (
        <label
          style={{ color: (error && COLORS.primary) || color }}
          className={`mb-2 block text-[${fontSize}]`}
        >
          {label}
          {required && <span className={`pl-1 ${requiredColor}`}>*</span>}
          {optional && <span className="text-[#787486] pl-1">(Optional)</span>}
        </label>
      )}

      <div className="relative flex-1">
        {icon && (
          <span
            onClick={iconClick}
            className={`absolute ${iconPosition === "left" ? "left-0" : "right-0"
              } px-3 bottom-0 flex items-center justify-center h-full cursor-pointer`}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          type="tel"
          inputMode="numeric"
          ref={inputRef}
          value={value}
          onChange={handleInputChange}
          placeholder="1234 5678 9012 3456"
          required={required}
          name={name}
          readOnly={readOnly}
          maxLength={19}
          className={`${className} block px-${paddingX || "4"} py-${paddingY || "2"
            } rounded-md w-full border-[1px] ${!isValid
              ? "border-red-500" // Red border if invalid
              : value
                ? "border-[#FFD68F]" // Yellow border when value is entered
                : "dark:border-borderDark border-borderLight"
            } ${iconPosition === "left" ? "pl-12" : "pr-12"
            } dark:placeholder:text-gray_3 placeholder:text-gray_4 ${readOnly
              ? "dark:bg-darkBg bg-lightBg"
              : bgColor
                ? `bg-[${bgColor}]`
                : "bg-[#F9FAFB]"
            } text-base`}
          style={{
            borderWidth,
            borderColor,
            color: (error && COLORS.primary) || color,
          }}
          {...rest}
        />
      </div>
      {!isValid && (
        <div className="mt-1 text-red-500 text-sm">Invalid card number. Must be 16 digits.</div>
      )}
    </div>
  );
};

export default CardNumberInput;
