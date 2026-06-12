import React from "react";
import Select from "react-select";
import countryList from "react-select-country-list";

interface CountryOption {
  value: string;
  label: string;
  flag: string;
}

interface CountrySelectorProps {
  value: CountryOption | null;
  onChange: (option: CountryOption | null) => void;
  color?: string;
  bgColor?: string;
  showLabel?: boolean;
  fontSize?: string;
  className?: string;
  selectClassName?: string;
}

const CountrySelector = ({
  value,
  onChange,
  color = "black",
  bgColor = "white",
  showLabel = true,
  fontSize = "16px",
  className = "",
  selectClassName = "",
}: CountrySelectorProps) => {
  const options = React.useMemo(() => {
    return countryList()
      .getData()
      .map((country) => ({
        value: country.value,
        label: country.label,
        flag: country.value.toLowerCase(),
      }));
  }, []);

  const customStyles = {
    control: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: bgColor,
      borderColor: "#F1F1F1",
      borderWidth: "2px",
      borderRadius: "6px",
      padding: "2px 8px",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#F1F1F1",
      },
    }),
    option: (provided: any, state: any) => ({
      ...provided,
      backgroundColor: state.isSelected
        ? "#FEFAF4"
        : state.isFocused
        ? "#F8F8F8"
        : "white",
      color: "black",
      padding: "8px 16px",
    }),
    menu: (provided: any) => ({
      ...provided,
      zIndex: 1000,
    }),
  };

  const formatOptionLabel = ({ value, label }: CountryOption) => (
    <div className="flex items-center gap-2">
      <img
        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.toUpperCase()}.svg`}
        alt={label}
        className="w-5 h-4 object-cover"
      />
      <span>{label}</span>
    </div>
  );

  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      {showLabel && (
        <label
          className="pb-1 text-lg"
          style={{
            color: color,
            fontSize: fontSize,
          }}
        >
          Country
        </label>
      )}
      <Select
        value={value}
        onChange={onChange}
        options={options}
        formatOptionLabel={formatOptionLabel}
        styles={customStyles}
        placeholder="Select Option"
        isClearable
        className={selectClassName}
      />
    </div>
  );
};

export default CountrySelector;
