import React from "react";
import { colors } from "@/constants/colors";
import { iInputField } from "./formTypes";

const FormTextArea = ({
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
	name,
	readOnly,
	fontSize,
	optional,
	bgColor,
	borderColor,
	borderWidth,
	color,
}: iInputField) => {
	const isLeftIcon = iconPosition === "left";

	return (
		<div className='text-sm'>
			<label className={`text-grayMd text-[${fontSize}] `}>
				{label}{" "}
				{optional && <span className='text-[#787486] pl-1 '>(Optional)</span>}
			</label>
			<div className='relative'>
				{icon && (
					<span
						onClick={iconClick}
						className={`absolute ${
							isLeftIcon ? "left-0" : "right-0"
						} px-3 bottom-0 flex items-center justify-center h-full cursor-pointer`}
					>
						{icon}
					</span>
				)}
				<textarea
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					name={name}
					cols={5}
					rows={5}
					readOnly={readOnly}
					className={`text-grayMd block p-3 rounded-md w-full mt-3 border-[1px]  ${
						error
							? "border-red-600"
							: value
							? "border-[#FFD68F]"
							: "border-[#D5D8DC]"
					} ${isLeftIcon ? "pl-12" : "pr-12"} ${
						readOnly
							? "dark:bg-darkBg bg-lightBg"
							: bgColor
							? `bg-[${bgColor}]`
							: "bg-graySm"
					}`}
					style={{
						borderWidth,
						borderColor,
						color: (error && colors.red_pry) || color,
					}}
				/>
			</div>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</div>
	);
};

export default FormTextArea;
