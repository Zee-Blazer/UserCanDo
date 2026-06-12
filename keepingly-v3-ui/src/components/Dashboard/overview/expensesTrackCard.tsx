import { formatCurrency } from "@/utils/currencyFormatter";
import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTotalExpense } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

// Icon
import { Banknote } from "lucide-react";

// Components
import FinanceRecCont from "./financeRecCont";

const ExpenseTrackCard = () => {
	const { expenses } = useDashboardSelector();
	const { getExpenses, isExpensesFetching } = useAppContext();
	
	return (
		<CardCover
			title='Expenses'
			icon={Banknote}
			// isFilterable={true}
			handleSelect={getExpenses}
			loadingText='Getting Inventory details'
			loadingState={isExpensesFetching}
            bottomComp={
                <div className="bg-[#A61D4A0A] mt-5 py-2 px-4">
                    <Typography>
                        $1,850 may have contributed to increased home value
                    </Typography>
                </div>
            }
		>
			<FinanceRecCont 
                amount={ formatCurrency(getTotalExpense(expenses) || 0) }
            />
		</CardCover>
	);
};

export default ExpenseTrackCard;
