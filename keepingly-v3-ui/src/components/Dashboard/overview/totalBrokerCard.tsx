import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import { useDashboardSelector } from "@/Redux/selectors";

const TotalBrokerCard = () => {
	const { overview } = useDashboardSelector();
	return (
		<CardCover title='Total agents' isFilterable={true}>
			<Typography className='dark:text-white text-black font-bold text-[40px]'>
				{overview?.total_broker_user || 0}
			</Typography>
		</CardCover>
	);
};

export default TotalBrokerCard;
