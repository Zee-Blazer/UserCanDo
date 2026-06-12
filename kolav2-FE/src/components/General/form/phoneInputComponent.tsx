import React from "react";
import "react-phone-number-input/style.css";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";

interface PhoneInputProps {
  value: string;
  setValue: (value: string) => void;
  color?: string;
  bgColor?: string;
  showLabel?: boolean;
  fontSize?: string;
  className?: string;
  required?: boolean;
  optional?: boolean;
  label?: string;
}

const CustomInputComponent = React.forwardRef<HTMLInputElement, any>(
  (props, ref) => {
    const isInvalid = !props.value || !isValidPhoneNumber(props.value);

    return (
      <input
        {...props}
        ref={ref}
        className={`w-full px-3 py-2 bg-transparent focus:outline-none text-black ml-2 ${
          isInvalid ? "border-[#F1F1F1]" : "border-white "
        } text-base`}
      />
    );
  }
);

const PhoneInputComponent = ({
  value,
  setValue,
  color,
  bgColor,
  showLabel = true,
  fontSize,
  className,
  required = false,
  optional = false,
  label = "Mobile Number",
}: PhoneInputProps) => {
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {showLabel && (
        <label
          htmlFor="mobile_number"
          className={`text-[${fontSize ? fontSize : "12"}] text-[474A4E] pb-1`}
          style={{ color: color }}
        >
          {label}
          {required && <span className={`pl-1 text-red-400`}>*</span>}
          {optional && <span className="text-[#787486] pl-1 ">(Optional)</span>}
        </label>
      )}
      <span
        className={`block ${
          !value || !isValidPhoneNumber(value)
            ? bgColor
              ? `border-[#F1F1F1] bg-[${bgColor}]`
              : "border-[#F1F1F1] bg-white"
            : "border-[#FFD68F] bg-[#FEFAF4] bg-opacity-10"
        }  w-full p-1 px-3 rounded-md border-[2px]`}
      >
        <PhoneInput
          placeholder="Enter phone number"
          value={value}
          onChange={(val) => {
            setValue(val!);
          }}
          international
          defaultCountry="GH"
          id="mobile_number"
          inputComponent={CustomInputComponent}
        />
      </span>
    </div>
  );
};

export default PhoneInputComponent;
