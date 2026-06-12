import { formatCurrency } from "@/utils/currencyFormatter";
import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTotalExpense } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

// Icon
import { HandCoins, ArrowRight } from "lucide-react";

// Components
import FinanceRecCont from "./financeRecCont";

const EstimatedEquity = () => {
	const { expenses } = useDashboardSelector();
	const { getExpenses, isExpensesFetching } = useAppContext();

	return (
		<CardCover
			title='Estimated equity'
			icon={HandCoins}
			// isFilterable={true}
			handleSelect={getExpenses}
			loadingText='Getting Inventory details'
			loadingState={isExpensesFetching}
            bottomComp={
                <div className="bg-[#A61D4A0A] mt-5 py-5 px-4">
					<Typography 
						className="text-base text-[#A61D4A] font-medium underline cursor-pointer text-right"
					>
						Edit
					</Typography> 
                </div>
            }
		>
			<FinanceRecCont amount={ "$75,000" } rate="+1.2% over 30 days" />
		</CardCover>
	);
};

export default EstimatedEquity;
