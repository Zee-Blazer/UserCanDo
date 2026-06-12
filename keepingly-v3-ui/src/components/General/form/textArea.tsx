import React from "react";
import { iInputField } from ".";

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
	bgColor,
}: iInputField) => {
	const isLeftIcon = iconPosition === "left";

	return (
		<div className='text-sm'>
			<label className='text-grayMd'>{label}</label>
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
					type={type}
					value={value}
					//@ts-ignore
					onChange={onChange}
					placeholder={placeholder}
					required={required}
					name={name}
					cols={5}
					rows={5}
					readOnly={readOnly}
					className={`bg-graySm text-grayMd block p-3 rounded-md w-full border-[1px] dark:placeholder:text-gray_3 placeholder:text-gray_4 ${
						error
							? "border-red-600"
							: "dark:border-borderDark border-borderLight"
					} ${isLeftIcon ? "pl-12" : "pr-12"} ${
						readOnly ? "dark:bg-darkBg bg-lightBg" : bgColor || "bg-transparent"
					}`}
				/>
			</div>
			{error && <div style={{ color: "red" }}>{error}</div>}
		</div>
	);
};

export default FormTextArea;
