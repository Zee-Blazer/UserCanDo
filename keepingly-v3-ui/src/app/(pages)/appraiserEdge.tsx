"use client";
import AddAppraiser from "@/components/Dashboard/appraiser/addAppraiser";
import AppraiserCard from "@/components/Dashboard/appraiser/appraiserCard";
import AppraiserDocumentsList from "@/components/Dashboard/appraiser/appraiserDocumentsList";
import AppraiserInformation from "@/components/Dashboard/appraiser/appraiserInformation";
import AppraiserNavigator from "@/components/Dashboard/appraiser/appraiserNavigator";
import AppraiserSummaryComp from "@/components/Dashboard/appraiser/appraiserSummary";
import TopBar from "@/components/Dashboard/layout/topBar";
import RenovationsCard from "@/components/Dashboard/renovations/renovationsCard";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import React, { useState } from "react";

const AppraiserEdge = () => {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const { appraiserRenovations } = useDashboardSelector();
	const { user } = useAuthSelector();
	const role = user?.role;
	const otherSlides = [
		<AppraiserCard key={1} />,
		<AppraiserDocumentsList key={2} />,
		<RenovationsCard renovations={appraiserRenovations} key={3} isAppraiser />,
		<AppraiserInformation key={3} />,
	];
	const appraiserSlides = [
		<AppraiserDocumentsList key={1} />,
		<RenovationsCard renovations={appraiserRenovations} key={2} isAppraiser />,
		<AppraiserInformation key={3} />,
	];

	const slides = role === "appraiser" ? appraiserSlides : otherSlides;

	return (
		<div className='p-4'>
			<TopBar showPropertySelector pageTitle='Appraisals Edge' />
			<div className='flex flex-col xl:flex-row gap-4 overflow-hidden'>
				{role !== "appraiser" && (
					<div className='w-full xl:max-w-[480px]'>
						<AppraiserSummaryComp />
						<AddAppraiser />
					</div>
				)}

				<div className='w-full'>
					<AppraiserNavigator
						activeSlideIndex={activeSlideIndex}
						setActiveSlideIndex={setActiveSlideIndex}
						role={role!}
					/>
					{slides[activeSlideIndex]}
				</div>
			</div>
		</div>
	);
};

export default AppraiserEdge;
