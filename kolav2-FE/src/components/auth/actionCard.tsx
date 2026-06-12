import React from "react";
import Image from "next/image";
import { Typography } from "@material-tailwind/react";

interface ActionCardProps {
	active: boolean;
	title: string;
	activeIcon?: any;
	inactiveIcon?: any;
	action: () => void;
}

const ActionCard = ({
	active,
	title,
	activeIcon,
	inactiveIcon,
	action,
}: ActionCardProps) => {
	return (
		<div
			className={`flex items-center justify-between border-[2px] rounded-md p-2 ${
				active
					? "border-yellow_pry bg-[FEFAF4] bg-opacity-10"
					: "border-gray_2 bg-[F9FAFB]"
			} cursor-pointer`}
			onClick={action}
		>
			<div className='flex items-center gap-4'>
				<Image
					src={active ? activeIcon : inactiveIcon}
					className='w-[96px] h-[96px] object-contain'
					alt='icon'
				/>
				<Typography
					className={`font-semibold  text-lg ${
						!active && "opacity-50"
					} text-black`}
				>
					{title}
				</Typography>
			</div>
			<div
				className={`w-[24px] h-[24px] rounded-full ${
					active ? "bg-yellow_pry" : "bg-white"
				} flex items-center justify-center`}
			>
				{active && <div className='w-[10px] h-[10px] rounded-full bg-white' />}
			</div>
		</div>
	);
};

export default ActionCard;
