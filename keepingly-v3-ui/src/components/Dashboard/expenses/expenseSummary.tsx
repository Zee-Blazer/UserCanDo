import React from "react";
import CardCover from "../overview/cardCover";
import { Typography } from "@material-tailwind/react";
import { formatCurrency } from "@/utils/currencyFormatter";
import { getTotalExpense } from "@/utils/helpers";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";

const ExpenseSummaryComp = () => {
	const { expenses } = useDashboardSelector();
	const { getExpenses } = useAppContext();
	return (
		<CardCover
			title='Total Expenses'
			isGradient
			isFilterable
			handleSelect={getExpenses}
		>
			<Typography className='text-white font-bold text-[40px]'>
				{formatCurrency(getTotalExpense(expenses))}
			</Typography>
		</CardCover>
	);
};

export default ExpenseSummaryComp;
