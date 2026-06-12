import React from "react";
import { colors } from "@/constants/colors";

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
	name,
	readOnly,
	bgColor,
	borderColor,
	borderWidth,
	color,
	inputRef,
	...rest
}: iInputField) => {
	const isLeftIcon = iconPosition === "left";

	return (
		<div className='w-full'>
			{label && (
				<label
					style={{ color: (error && colors.red_pry) || color }}
					className='mb-2 block'
				>
					{label}
					{required && <span>*</span>}
				</label>
			)}

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
				<input
					type={type}
					ref={inputRef}
					value={value}
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					name={name}
					readOnly={readOnly}
					className={`block p-4 rounded-md w-full border-[1px] ${
						error
							? "border-red_pry"
							: "dark:border-borderDark border-borderLight"
					} ${
						isLeftIcon ? "pl-12" : "pr-12"
					} dark:placeholder:text-gray_3 placeholder:text-gray_4 ${
						readOnly ? "dark:bg-darkBg bg-lightBg" : bgColor || "bg-transparent"
					}`}
					style={{
						// backgroundColor: bgColor || "transparent",
						borderWidth,
						borderColor,
						color: (error && colors.red_pry) || color,
					}}
					{...rest}
				/>
			</div>
			{error && (
				<div className='mt-1' style={{ color: colors.red_pry }}>
					{error}
				</div>
			)}
		</div>
	);
};

export default FormInput;
