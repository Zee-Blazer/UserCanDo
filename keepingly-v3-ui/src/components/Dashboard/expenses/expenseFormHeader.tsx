import IconContainer from "@/components/General/iconContainer";
import { Button, Typography } from "@material-tailwind/react";
import { Money, Plus } from "@phosphor-icons/react";
import React from "react";

interface ExpenseFormHeaderProps {
	addExpense: () => void;
	loading: boolean;
}
const ExpenseFormHeader = ({ addExpense, loading }: ExpenseFormHeaderProps) => {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
			<div className='flex items-center gap-4'>
				<IconContainer icon={<Money size={20} />} />
				<Typography className='text-black dark:text-white font-medium text-2xl'>
					Add an expense
				</Typography>
			</div>
			{/* <Button
				onClick={addExpense}
				loading={loading}
				className='border-pry text-pry lowercase first-letter:capitalize text-base shadow-none font-medium w-fit'
				variant='outlined'
			>
				Add
			</Button> */}
		</div>
	);
};

export default ExpenseFormHeader;
