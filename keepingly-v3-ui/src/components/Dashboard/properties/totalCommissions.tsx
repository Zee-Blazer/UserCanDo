import React from "react";
import CardCover from "../overview/cardCover";
import { Typography } from "@material-tailwind/react";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useDashboardSelector } from "@/Redux/selectors";

const TotalCommissions = () => {
	const { overview } = useDashboardSelector();
	return (
		<CardCover
			title='Total commissions'
			isFilterable={true}
			// bottomComp={
			// 	<>
			// 		<Typography className='text-xs dark:text-gray_2'>
			// 			You:{" "}
			// 			<span className='dark:text-white text-black'>
			// 				{formatCurrency(0)}
			// 			</span>{" "}
			// 		</Typography>{" "}
			// 		<Typography className='text-xs dark:text-gray_2'>
			// 			Company:{" "}
			// 			<span className='dark:text-white text-black'>
			// 				{formatCurrency(0)}
			// 			</span>{" "}
			// 		</Typography>
			// 	</>
			// }
		>
			<Typography className='dark:text-white text-black font-bold text-[40px]'>
				{formatCurrency(overview?.total_commission || 0)}
			</Typography>
		</CardCover>
	);
};

export default TotalCommissions;
