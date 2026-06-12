import React from "react";
import CardCover from "../overview/cardCover";
import { Typography } from "@material-tailwind/react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";

const RenovationSummaryComp = () => {
	const { renovations } = useDashboardSelector();
	const { getRenovations } = useAppContext();
	return (
		<CardCover
			title='Total renovations'
			isGradient
			isFilterable
			handleSelect={getRenovations}
		>
			<Typography className='text-white font-bold text-[40px]'>
				{renovations?.length ?? 0}
			</Typography>
		</CardCover>
	);
};

export default RenovationSummaryComp;
