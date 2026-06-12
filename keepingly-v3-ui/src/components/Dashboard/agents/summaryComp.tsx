import React from "react";
import CardCover from "../overview/cardCover";
import { Typography } from "@material-tailwind/react";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useDashboardSelector } from "@/Redux/selectors";

const SummaryComp = () => {
	const { agents } = useDashboardSelector();
	return (
		<CardCover title='Total agents' isGradient isFilterable>
			<Typography className='text-white font-bold text-[40px]'>
				{agents?.length || 0}
			</Typography>
		</CardCover>
	);
};

export default SummaryComp;
