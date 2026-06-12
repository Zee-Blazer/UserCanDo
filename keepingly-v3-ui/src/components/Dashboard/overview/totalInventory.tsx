import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import { useAppContext } from "@/app/context";
import { useDashboardSelector } from "@/Redux/selectors";

const TotalInventoryCard = () => {
	const { isHomeownerOverviewdFetching, getInventory } = useAppContext();
	const { inventories } = useDashboardSelector();
	return (
		<CardCover
			title='Total Insurable Inventory'
			isFilterable={true}
			handleSelect={getInventory}
			loadingText='Getting Inventory details'
			loadingState={isHomeownerOverviewdFetching}
		>
			<Typography className='dark:text-white text-black font-bold text-[40px]'>
				{inventories?.length ?? 0}
			</Typography>
		</CardCover>
	);
};

export default TotalInventoryCard;
