import React from "react";
import CardCover from "../overview/cardCover";
import { Typography } from "@material-tailwind/react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";

const AppraiserSummaryComp = () => {
	const { appraiserUsers } = useDashboardSelector();
	const { getAppraisalUsers, isAppraiserUserFetching } = useAppContext();
	return (
		<CardCover
			title='Total Appraisers'
			isGradient
			isFilterable
			handleSelect={getAppraisalUsers}
			loadingState={isAppraiserUserFetching}
		>
			<Typography className='text-white font-bold text-[40px]'>
				{appraiserUsers?.length ?? 0}
			</Typography>
		</CardCover>
	);
};

export default AppraiserSummaryComp;
