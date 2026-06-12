import React from "react";
import CardCover from "../overview/cardCover";
import { Typography } from "@material-tailwind/react";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTotalInventory } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

const InventorySummaryComp = () => {
	const { inventories } = useDashboardSelector();
	const totalCost = getTotalInventory(inventories);
	const { getInventory } = useAppContext();
	return (
		<CardCover
			title='Total items'
			isGradient
			isFilterable
			handleSelect={getInventory}
			// bottomComp={
			// 	<>
			// 		<Typography className='text-xs text-gray_2'>
			// 			Total cost:{" "}
			// 			<span className='text-white'>{formatCurrency(totalCost)}</span>{" "}
			// 		</Typography>{" "}
			// 	</>
			// }
		>
			<Typography className='text-white font-bold text-[40px]'>
				{inventories?.length}
			</Typography>
		</CardCover>
	);
};

export default InventorySummaryComp;
