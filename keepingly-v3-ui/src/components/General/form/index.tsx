import {
	ChangeEventHandler,
	Dispatch,
	HTMLInputTypeAttribute,
	ReactNode,
} from "react";
import FormInput from "../form/input";
import FormCheckbox from "./check";
import OTP from "./OTP";

interface iFormProps {
	label?: string;
	value?: string | number;
	onChange?: ChangeEventHandler<HTMLInputElement>;
	error?: any;
	placeholder?: string;
	type?: HTMLInputTypeAttribute;
	required?: boolean;
	name?: string;
	readOnly?: boolean;
	bgColor?: string;
	borderWidth?: number;
	borderColor?: string;
	className?: string;
	color?: string;
	inputRef?: any;
}

export interface iInputField extends iFormProps {
	icon?: ReactNode;
	iconPosition?: "right" | "left";
	iconClick?: () => void;
}

export interface iCheckForm extends iFormProps {
	checked?: boolean;
	setChecked?: any;
	callback?: () => void;
}

export interface iSelect extends iFormProps {
	onSelect?: ChangeEventHandler<HTMLSelectElement>;
	options: string[];
	icon?: ReactNode;
}

export { FormInput, FormCheckbox, OTP };
