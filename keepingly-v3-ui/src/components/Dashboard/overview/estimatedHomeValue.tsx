import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import { useAppContext } from "@/app/context";
import { useDashboardSelector } from "@/Redux/selectors";

// Icon
import { Logs } from "lucide-react";

// Components
import FinanceRecCont from "./financeRecCont";

const EstimatedHomeValue = () => {
	const { isHomeownerOverviewdFetching, getInventory } = useAppContext();
	const { inventories } = useDashboardSelector();
	return (
		<CardCover
			title='Estimated home value'
			icon={Logs}
			// isFilterable={true}
			handleSelect={getInventory}
			loadingText='Getting Inventory details'
			loadingState={isHomeownerOverviewdFetching}
			bottomComp={
				<div className='bg-lightBg dark:bg-darkBg mt-5 py-5 px-4'>
					<Typography className='flex justify-between'>
						Last updated: Apr 19, 2025
						<span className='underline text-[#A61D4A] font-medium cursor-pointer'>
							Refresh
						</span>
					</Typography>
				</div>
			}
		>
			<FinanceRecCont amount='$75,000' rate='+1.2% over 30 days' />
		</CardCover>
	);
};

export default EstimatedHomeValue;
