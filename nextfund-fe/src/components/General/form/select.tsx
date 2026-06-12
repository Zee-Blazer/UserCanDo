import { COLORS } from "@/constants/colors";
import { iSelect } from "./formTypes";

const FormSelect = ({
  label,
  options,
  value,
  error,
  placeholder,
  onSelect,
  name,
  className,
  bgColor,
  borderWidth,
  borderColor,
  color,
  required,
  optional,
  icon,
  readOnly,
  paddingX,
  paddingY,
  fontSize,
  labelPosition = "block",
  requiredColor = "text-red-400",
  labelGap = "gap-4",
  ...rest
}: iSelect) => {
  return (
    <div
      className={`${labelPosition === "flex" ? `flex items-center ${labelGap}` : ""
        }`}
    >
      {label && (
        <label
          style={{ color: color }}
          className={`${labelPosition === "flex" ? "whitespace-nowrap" : "mb-2 block"
            } text-${fontSize} font-normal `}
        >
          {label}{" "}
          {required && <span className={`pl-1 ${requiredColor}`}>*</span>}
          {optional && <span className="text-[#787486] pl-1 ">(Optional)</span>}
        </label>
      )}
      <div className="relative flex-1">
        {icon && (
          <span
            className={`absolute left-0 px-3 bottom-0 flex items-center justify-center h-full cursor-pointer`}
          >
            {icon}
          </span>
        )}
        <select
          value={value}
          //@ts-ignore
          onChange={onSelect}
          name={name}
          disabled={readOnly}
          className={`block px-${paddingX ? paddingX : "4"} py-${paddingY ? paddingY : "2"
            } rounded-md w-full ${error
              ? "border-red_pry"
              : value
                ? "border-[#FFD68F]"
                : "dark:border-borderDark border-borderLight"
            } dark:text-gray_3 text-gray_4 ${className} text-gray_3 ${icon && "pl-8"
            }`}
          style={{
            backgroundColor: bgColor ? bgColor : "#F9FAFB",
            borderWidth: borderWidth || 1,
            borderColor: borderColor,
            color: (error && COLORS.primary) || color,
            lineHeight: '1.3125rem',
          }}
          {...rest}
        >
          {placeholder && <option value="" disabled>{placeholder}</option>}
          {options?.map((option, ind) => (
            <option key={ind} value={option}>
              {option}
            </option>
          ))}
        </select>
      </div>
      {error && <div style={{ color: COLORS.primary }}>{error}</div>}
    </div>
  );
};

export default FormSelect;
