import React, { useState } from "react";
import { iSelect } from ".";
import { colors } from "@/constants/colors";

export const FormSelect = ({
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

	const [hasTouched, setHasTouched] = useState(false);

	return (
		<div className={`text-sm ${name == "Check Type" && "w-full"}`}>
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
					onBlur={() => setHasTouched(true)} // <-- Added
					name={name}
					disabled={readOnly}
					className={`block p-4 rounded-md w-full ${
						error && hasTouched
							? "border-red_pry"
							: "dark:border-borderDark border-borderLight"
					} dark:text-gray_3 text-gray_5  ${className} ${icon && "pl-8"} 	${
						readOnly ? "dark:bg-darkBg bg-lightBg" : bgColor || "bg-transparent"
					}`}
					style={{
						borderWidth: borderWidth || 1,
						borderColor: borderColor,
						color: error && hasTouched ? colors.red_pry : color,
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

			{hasTouched && error && ( // <-- Changed
				<div style={{ color: colors.red_pry }}>{error}</div>
			)}
		</div>
	);
};
