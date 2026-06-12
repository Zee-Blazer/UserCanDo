import { ReactNode } from "react";
import FormInput from "./formInput";
import FormSelect from "./select";
import FormTextArea from "./textArea";

const formInputColors = {
  borderColor: "#F1F1F1",
  bgColor: "#F9FAFB",
  activeBorderColor: "#FFD68F",
};

function AuthFormInput({
  label,
  type,
  value,
  slug,
  handleChange,
  required,
  optional,
  placeholder,
  icon,
  iconPosition,
  bgColor,
  onKeyPress,
  ...rest
}: {
  label: string;
  value: string;
  type?: string;
  slug: string;
  handleChange: (slug: string, inputValue: string) => void;
  required?: Boolean;
  optional?: Boolean;
  placeholder?: string;
  icon?: ReactNode;
  iconPosition?: "right" | "left" | undefined;
  bgColor?: string;
  onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void;
  [key: string]: any;
}) {
  return (
    <FormInput
      label={label}
      icon={icon && icon}
      iconPosition={iconPosition && iconPosition}
      type={type}
      required={required && true}
      optional={optional && true}
      borderColor={
        value ? formInputColors.activeBorderColor : formInputColors.borderColor
      }
      bgColor={bgColor ? bgColor : formInputColors.bgColor}
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(slug, event.target.value)
      }
      onKeyPress={onKeyPress}
      paddingY="2"
      fontSize="14px"
      placeholder={placeholder}
      {...rest}
    />
  );
}

function AuthFormTextArea({
  label,
  type,
  value,
  slug,
  handleChange,
  required,
  optional,
  placeholder,
  bgColor,
}: {
  label: string;
  value: string;
  type?: string;
  slug: string;
  handleChange: (slug: string, inputValue: string) => void;
  required?: Boolean;
  optional?: Boolean;
  placeholder?: string;
  bgColor?: string;
}) {
  return (
    <FormTextArea
      label="What are your goals and expectations for promoting your brand on NexFund?"
      fontSize="14px"
      optional={optional && true}
      required={required && true}
      bgColor={bgColor ? bgColor : formInputColors.bgColor}
      borderColor={
        value ? formInputColors.activeBorderColor : formInputColors.borderColor
      }
      value={value}
      onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
        handleChange(slug, event.target.value)
      }
    />
  );
}

function AuthFormSelect({
  label,
  value,
  slug,
  handleChange,
  required,
  optional,
  placeholder,
  options,
  paddingY,
  bgColor,
}: {
  label: string;
  value: string;
  options: string[];
  slug: string;
  handleChange: (slug: string, inputValue: string) => void;
  required?: Boolean;
  optional?: Boolean;
  placeholder?: string;
  paddingY?: string;
  bgColor?: string;
}) {
  return (
    <FormSelect
      label={label}
      value={value}
      placeholder={placeholder}
      options={options}
      required={required && true}
      optional={optional && true}
      borderColor={
        value ? formInputColors.activeBorderColor : formInputColors.borderColor
      }
      bgColor={bgColor ? bgColor : formInputColors.bgColor}
      onSelect={(e: React.ChangeEvent<HTMLSelectElement>) =>
        handleChange(slug, e.target.value)
      }
      paddingY={paddingY ? paddingY : "2"}
      fontSize="sm"
    />
  );
}

export { AuthFormInput, AuthFormSelect, AuthFormTextArea };

