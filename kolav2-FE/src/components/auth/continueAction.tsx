import { colors } from "@/constants/colors";
import { Button } from "@material-tailwind/react";
import { ArrowRight } from "lucide-react";
import React from "react";

interface ActionButtonProps {
	action?: () => void;
	label: string;
	icon?: React.ReactNode;
	disabled?: boolean;
	bgColor?: string;
	paddingY?: string;
	loading?: boolean;
}
const ActionButton = ({
	label,
	action,
	disabled,
	icon,
	bgColor,
	paddingY,
	loading,
}: ActionButtonProps) => {
	return (
		<div className={`py-${paddingY ? paddingY : "10"}`}>
			<Button
				className={`bg-blue_pry w-full normal-case mt-4 font-semibold flex items-center justify-center gap-4 disabled:text-[#474A4E]`}
				disabled={disabled || loading}
				onClick={action}
				loading={loading}
				style={{
					backgroundColor: disabled
						? colors.gray_2
						: bgColor || colors.blue_pry,
				}}
			>
				{label}
				{icon && <ArrowRight size={18} />}
			</Button>
		</div>
	);
};

export default ActionButton;
