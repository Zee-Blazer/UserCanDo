import IconContainer from "@/components/General/iconContainer";
import { Typography } from "@material-tailwind/react";
import { Empty } from "@phosphor-icons/react";
import React from "react";
import { Sentry } from "react-activity";
interface ListCardProps {
	title: string;
	icon?: React.ReactNode;
	list?: any[];
	children?: React.ReactNode;
	emptyStateText?: string;
	headerRight?: React.ReactNode;
	hideEmptyState?: boolean;
	loadingStateText?: string;
	loadingState?: boolean;
	bgWhite?: boolean
}
const ListCard = ({
	emptyStateText,
	icon,
	list,
	title,
	children,
	headerRight,
	hideEmptyState,
	loadingState,
	bgWhite,
}: ListCardProps) => {
	return (
		<div 
			className={`
				rounded-xl ${ bgWhite ? "bg-white dark:bg-black" : "bg-lightBg dark:bg-black" } 
				min-h-[524px] h-full p-4 flex flex-col gap-4 w-full
			`}
		>
			<div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
				<div className='flex items-center gap-4'>
					{ icon && <IconContainer icon={icon} /> }
					<Typography className='text-black dark:text-white text-xl font-medium'>
						{title}
					</Typography>
				</div>
				<div>{headerRight}</div>
			</div>
			{loadingState ? (
				<div className='flex items-center justify-center h-full'>
					<Sentry />
				</div>
			) : (
				((list && list.length > 0) || hideEmptyState) && children
			)}

			<div className='flex-1' />
			{!hideEmptyState && (!list || list.length < 1) && (
				<>
					<Empty size={32} />
					<Typography>{emptyStateText}</Typography>
				</>
			)}
		</div>
	);
};

export default ListCard;
