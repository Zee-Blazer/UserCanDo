import React from "react";
import { colors } from "@/constants/colors";

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
	icon,
	readOnly,
	...rest
}: iSelect) => {
	return (
		<div className='text-sm'>
			{label && (
				<label style={{ color: color }} className='mb-2 block'>
					{label} {required && <span>*</span>}
				</label>
			)}
			<div className='relative'>
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
					className={`block p-4 rounded-md w-full ${
						error
							? "border-red_pry"
							: "dark:border-borderDark border-borderLight"
					} dark:text-gray_3 text-gray_4 ${className} text-gray_3 ${
						icon && "pl-8"
					}`}
					style={{
						backgroundColor: bgColor || "transparent",
						borderWidth: borderWidth || 1,
						borderColor: borderColor,
						color: (error && colors.red_pry) || color,
					}}
					{...rest}
				>
					{placeholder && <option value=''>{placeholder}</option>}
					{options?.map((option, ind) => (
						<option key={ind} value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
			{error && <div style={{ color: colors.red_pry }}>{error}</div>}
		</div>
	);
};

export default FormSelect;
