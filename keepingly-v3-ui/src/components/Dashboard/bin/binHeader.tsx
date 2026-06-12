import { Button, Typography } from "@material-tailwind/react";
import React from "react";

interface BinHeaderProps {
	selectedItemsAction: () => void;
	allItemsAction: () => void;
	isDisabled: boolean;
}
const BinHeader = ({
	allItemsAction,
	selectedItemsAction,
	isDisabled,
}: BinHeaderProps) => {
	return (
		<div className='flex flex-col md:flex-row gap-4 md:items-center justify-between mb-4'>
			<Typography className='text-2xl text-black dark:text-white font-bold'>
				Deleted items
			</Typography>
			<div className='flex gap-2 '>
				<Button
					className='border-pry text-pry lowercase first-letter:capitalize'
					variant='outlined'
					onClick={allItemsAction}
				>
					Restore all
				</Button>

				<Button
					className='border-pry border-[1px] px-4 gap-2 lowercase first-letter:capitalize text-white bg-pry rounded-md cursor-pointer'
					onClick={selectedItemsAction}
					disabled={isDisabled}
				>
					Restore selected items
				</Button>
			</div>
		</div>
	);
};

export default BinHeader;
