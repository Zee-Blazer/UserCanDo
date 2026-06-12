interface iOTP {
	OTP: string;
	setOTP: Dispatch<string>;
	length?: number;
}

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

interface iInputField extends iFormProps {
	icon?: ReactNode;
	iconPosition?: "right" | "left";
	iconClick?: () => void;
}

interface iCheckForm extends iFormProps {
	checked?: boolean;
	setChecked?: any;
	callback?: () => void;
}

interface iSelect extends iFormProps {
	onSelect?: ChangeEventHandler<HTMLSelectElement>;
	options: string[];
	icon?: ReactNode;
}
