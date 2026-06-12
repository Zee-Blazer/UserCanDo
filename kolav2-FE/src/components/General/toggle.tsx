import React, { ChangeEventHandler } from "react";

interface ToggleProps {
	checked: boolean;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	className?: string;
	disabled?: boolean;
	checkedColor?: string;
	uncheckedColor?: string;
	thumbColor?: string;
	checkedThumbColor?: string;
}

const Toggle = ({
	checked,
	onChange,
	className = "",
	disabled = false,
	checkedColor,
	uncheckedColor,
	thumbColor,
	checkedThumbColor,
}: ToggleProps) => {
	return (
		<label
			htmlFor={"toggle"}
			className={`relative cursor-pointer inline-block w-[3.75rem] h-[1.875rem] ${className}`}
		>
			<input
				id={"toggle"}
				type='checkbox'
				className='sr-only peer'
				checked={checked}
				onChange={onChange}
				disabled={disabled}
				aria-label={"Toggle switch"}
			/>
			<div
				className={`
            absolute cursor-pointer
            inset-0 rounded-full
            ${uncheckedColor ? uncheckedColor : "bg-[#D5D8DC]"}
            transition-all duration-300
            ${checkedColor ? checkedColor : "peer-checked:bg-[#D5D8DC]"}
            peer-disabled:cursor-not-allowed
            peer-disabled:opacity-50
          `}
			/>
			<div
				className={`
            absolute left-[0.125rem] top-[0.125rem] 
            h-[1.625rem] w-[1.625rem]
            rounded-full 
            ${thumbColor ? thumbColor : "bg-white"}
            transition-all duration-300
            ${
							checkedThumbColor
								? checkedThumbColor
								: "peer-checked:bg-[#F5AA29]"
						}
            peer-checked:translate-x-[1.875rem]
            peer-disabled:cursor-not-allowed
          `}
			/>
		</label>
	);
};

export default Toggle;
