"use client";
import TopBar from "@/components/Dashboard/layout/topBar";
import AddRenovation from "@/components/Dashboard/renovations/addRenovations";
import RenovationsCard from "@/components/Dashboard/renovations/renovationsCard";
import RenovationSummaryComp from "@/components/Dashboard/renovations/renovationSummary";
import { useDashboardSelector } from "@/Redux/selectors";
import React from "react";

const RenovationsPage = () => {
	const { renovations } = useDashboardSelector();
	return (
		<div className='p-4'>
			<TopBar showPropertySelector pageTitle='Renovations' />
			<div className='flex flex-col xl:flex-row gap-4 overflow-hidden'>
				<div className='w-full xl:max-w-[480px]'>
					<RenovationSummaryComp />
					<AddRenovation />
				</div>
				<div className='w-full'>
					<RenovationsCard renovations={renovations} isAppraiser={false} />
				</div>
			</div>
		</div>
	);
};

export default RenovationsPage;
