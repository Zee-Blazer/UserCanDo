import { formatCurrency } from "@/utils/currencyFormatter";
import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import { useDashboardSelector } from "@/Redux/selectors";

const TotalPropertiesCard = () => {
	const { overview } = useDashboardSelector();
	return (
		<CardCover title='Total properties' isGradient isFilterable={true}>
			<Typography className='text-white font-bold text-[40px]'>
				{overview?.property_count || 0}
			</Typography>
		</CardCover>
	);
};

export default TotalPropertiesCard;
