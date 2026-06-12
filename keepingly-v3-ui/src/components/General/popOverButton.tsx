import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { Spinner } from "react-activity";

const PopoverButton = ({
	icon: Icon,
	label,
	onClick,
	color,
	disabled,
	loading,
}: {
	icon: React.ElementType;
	label: string;
	onClick?: () => void;
	color?: string;
	disabled?: boolean;
	loading?: boolean;
}) => (
	<Button
		variant='text'
		className='flex items-center gap-2 cursor-pointer lowercase first-letter:capitalize border-none text-left text-gray_5 dark:text-gray_3'
		onClick={onClick}
		style={{ color: color ? color : "" }}
		disabled={disabled}
	>
		{loading ? <Spinner /> : <Icon size={20} />}

		<Typography className='normal-case'>{label}</Typography>
	</Button>
);

export default PopoverButton;
