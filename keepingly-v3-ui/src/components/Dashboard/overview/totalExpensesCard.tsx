import { formatCurrency } from "@/utils/currencyFormatter";
import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTotalExpense } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

const TotalExpensesCard = () => {
	const { expenses } = useDashboardSelector();
	const { getExpenses, isExpensesFetching } = useAppContext();
	return (
		<CardCover
			title='Total Expenses'
			isGradient
			isFilterable={true}
			handleSelect={getExpenses}
			loadingText='Getting Expenses Overview'
			loadingState={isExpensesFetching}
		>
			<Typography className='text-white font-bold text-[40px]'>
				{formatCurrency(getTotalExpense(expenses) || 0)}
			</Typography>
		</CardCover>
	);
};

export default TotalExpensesCard;
