import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import React from "react";
import PropertySelector from "../properties/propertySelector";
import { Typography } from "@material-tailwind/react";
import { DotsNine } from "@phosphor-icons/react";

interface TopBarProps {
	showPropertySelector?: boolean;
	pageTitle: string;
	pageSubTitle?: string
}
const TopBar = ({ pageTitle, pageSubTitle, showPropertySelector }: TopBarProps) => {
	return (
		<div className='flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4'>

			{/* Contains the additional subtitle in block style */}
			<div>
				<div className='flex items-center justify-between w-full md:w-fit'>
					<Typography className='text-black dark:text-white font-medium text-2xl'>
						{pageTitle}
					</Typography>
					<DotsNine className='md:hidden' size={18} />
				</div>

				{/* Ability to add optional subtitle */}
				<Typography className="text-xs mt-0.5 md:text-base">
					{ pageSubTitle }
				</Typography>
			</div>

			{showPropertySelector && (
				<div className='ml-auto'>
					<PropertySelector />
				</div>
			)}
		</div>
	);
};

export default TopBar;
