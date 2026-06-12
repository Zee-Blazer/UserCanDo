import { COLORS } from "@/constants/colors";
import CurrencyInputNew from "react-currency-input-field";
import { iInputField } from "./formTypes";

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
	...rest
}: iInputField) => {
	const isLeftIcon = iconPosition === "left";
	return (
		<div style={{ fontSize: "1rem" }}>
			{label && (
				<label
					style={{
						color: (error && COLORS.primary) || color,
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
							// @ts-ignore
							onChange({ target: { name: name!, value: value! } });
						}
					}}
					decimalsLimit={2}
					readOnly={readOnly}
					required={required}
					prefix='$'
					style={{
						backgroundColor: readOnly
							? COLORS.primaryLight
							: bgColor || "transparent",
						padding: icon
							? isLeftIcon
								? "14px 14px 14px 36px"
								: "14px 36px 14px 14px"
							: "14px",
						borderWidth: borderWidth || "1px",
						borderColor:
							borderColor || (error ? COLORS.primary : COLORS.primaryLight),
						borderStyle: "solid",
						borderRadius: "0.375rem",
						width: "100%",
						fontSize: "1rem",
						color: (error && COLORS.primary) || color,
					}}
					className='dark:placeholder:text-gray_3 placeholder:text-gray_4'
					{...rest}
				/>
			</div>
			{error && (
				<div style={{ marginTop: "0.25rem", color: COLORS.primary }}>
					{error}
				</div>
			)}
		</div>
	);
};

export default CurrencyInput;
