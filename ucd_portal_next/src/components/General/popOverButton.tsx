import { Button, Typography } from "@material-tailwind/react";
import React from "react";

const PopoverButton = ({
	icon: Icon,
	label,
	onClick,
	color,
}: {
	icon: React.ElementType;
	label: string;
	onClick?: () => void;
	color?: string;
}) => (
	<Button
		variant='text'
		className='flex items-center gap-2 cursor-pointer lowercase first-letter:capitalize border-none text-left text-gray_5 dark:text-gray_3'
		onClick={onClick}
		style={{ color: color ? color : "" }}
	>
		<Icon size={20} />
		<Typography className='lowercase first-letter:capitalize'>
			{label}
		</Typography>
	</Button>
);

export default PopoverButton;
