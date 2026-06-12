import React, { useState, ChangeEvent, useEffect } from "react";
import FormInput from "./formInput";

interface ExpiryDateInputProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  required?: boolean;
  placeholder?: string;
  name?: string;
}

const ExpiryDateInput: React.FC<ExpiryDateInputProps> = ({
  label,
  value,
  onChange,
  error,
  required,
  placeholder = "MM/YY",
  name = "cardExpiryDate",
}) => {
  const [internalValue, setInternalValue] = useState(value);

  useEffect(() => {
    setInternalValue(value); // Sync internal value with prop value
  }, [value]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    let input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters

    // Format MM/YY as user types
    if (input.length > 2) {
      input = `${input.slice(0, 2)}/${input.slice(2, 4)}`;
    }

    // Validate MM (01-12)
    const [month, year] = input.split("/");
    if (month && (parseInt(month) < 1 || parseInt(month) > 12)) {
      return;
    }

    setInternalValue(input);
    onChange(input);
  };

  return (
    <FormInput
      label={label}
      type="tel"
      value={internalValue}
      onChange={handleChange}
      error={error}
      placeholder={placeholder}
      required={required}
      name={name}
      maxLength={5} 
    />
  );
};

export default ExpiryDateInput;
