import { COLORS } from "@/constants/colors";
import { iInputField } from "./formTypes";

const FormInput = ({
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
  min,
  paddingX,
  paddingY,
  className,
  containerClassName,
  id,
  requiredColor = "text-red-400",
  maxLength,
  ...rest
}: iInputField & { containerClassName?: string }) => {
  const isLeftIcon = iconPosition === "left";

  return (
    <div className={containerClassName}>
      {label && (
        <label
          style={{ color: (error && COLORS.danger) || color }}
          className={`mb-2 block text-[${fontSize}]`}
        >
          {label}
          {required && <span className={`pl-1 ${requiredColor}`}>*</span>}
          {optional && <span className="text-[#787486] pl-1 ">(Optional)</span>}
        </label>
      )}

      <div className="relative flex-1">
        {icon && (
          <span
            onClick={iconClick}
            className={`absolute ${isLeftIcon ? "left-0" : "right-0"
              } px-3 bottom-0 flex items-center justify-center h-full cursor-pointer`}
          >
            {icon}
          </span>
        )}
        <input
          id={id}
          type={type}
          ref={inputRef}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          name={name}
          readOnly={readOnly}
          maxLength={maxLength}
          className={`${className} block px-${paddingX ? paddingX : "4"} py-${paddingY ? paddingY : "2"
            }
          } rounded-md w-full border-[1px] ${error
              ? "border-red_pry"
              : value
                ? "border-[#FFD68F]"
                : "dark:border-borderDark border-borderLight"
            } ${isLeftIcon ? "pl-12" : "pr-12"
            } dark:placeholder:text-gray_3 placeholder:text-gray_4 ${readOnly
              ? "dark:bg-darkBg bg-lightBg"
              : bgColor
                ? `bg-[${bgColor}]`
                : "bg-[#F9FAFB]"
            } text-base`}
          style={{
            borderWidth,
            borderColor,
            color: (error && COLORS.danger) || color,
            lineHeight: '1.3125rem',
          }}
          {...rest}
        />
      </div>
      {error && (
        <div className="mt-1" style={{ color: COLORS.danger }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default FormInput;
