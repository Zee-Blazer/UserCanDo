import React from "react";
import { iInputField } from ".";
import CurrencyInputNew from "react-currency-input-field";
import { colors } from "@/constants/colors";
import { useAppContext } from "@/app/context";

const CurrencyInput = ({
	label,
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
	decimal = true, 
	...rest
}: iInputField & { decimal?: boolean }) => { 
	const isLeftIcon = iconPosition === "left";
	const { isDarkMode } = useAppContext();

	return (
		<div style={{ fontSize: "1rem" }}>
			{label && (
				<label
					style={{
						color: (error && colors.red_pry) || color,
						marginBottom: "0.5rem",
						display: "block",
					}}
				>
					{label} {required && <span>*</span>}
				</label>
			)}

			<div style={{ position: "relative" }}>
				{icon && (
					<span
						onClick={iconClick}
						style={{
							position: "absolute",
							[isLeftIcon ? "left" : "right"]: "0",
							padding: "0 0.75rem",
							bottom: "0",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							height: "100%",
							cursor: "pointer",
						}}
					>
						{icon}
					</span>
				)}
				<CurrencyInputNew
					id='input-example'
					name={name}
					placeholder={placeholder}
					value={value}
					onValueChange={(value, name) => {
						if (onChange) {
							const safeValue =
								value === undefined || value === null || value === ""
									? "0"
									: value;
							// @ts-ignore
							onChange({ target: { name: name!, value: safeValue } });
						}
					}}
					allowDecimals={decimal}
					decimalsLimit={decimal ? 2 : 0}
					decimalScale={decimal ? 2 : 0}
					// readOnly={readOnly}
					required={required}
					prefix='$'
					style={{
						backgroundColor: readOnly
							? isDarkMode
								? colors.darkBg
								: colors.lightBg
							: bgColor || "transparent",
						padding: icon
							? isLeftIcon
								? "14px 14px 14px 36px"
								: "14px 36px 14px 14px"
							: "14px",
						borderWidth: borderWidth || "1px",
						borderColor:
							borderColor ||
							(error
								? colors.red_pry
								: isDarkMode
								? colors.borderDark
								: colors.borderLight),
						borderStyle: "solid",
						borderRadius: "0.375rem",
						width: "100%",
						fontSize: "1rem",
						color: (error && colors.red_pry) || color,
					}}
					className='dark:placeholder:text-gray_3 placeholder:text-gray_4'
					{...rest}
				/>
			</div>
			{error && (
				<div style={{ marginTop: "0.25rem", color: colors.red_pry }}>
					{error}
				</div>
			)}
		</div>
	);
};

export default CurrencyInput;
