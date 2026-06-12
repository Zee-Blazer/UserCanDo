"use client";
import PropertyDetails from "@/app/(pages)/propertyDetails";
import TopBar from "@/components/Dashboard/layout/topBar";
import GetStartedModal from "@/components/Dashboard/overview/onboardingModal";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import React from "react";

const Page = () => {
	const { activeProperty } = useDashboardSelector();
	const [open, setOpen] = React.useState(true);
	const handleOpen = () => setOpen(true);
	const closeModal = () => setOpen(false);
	const { user } = useAuthSelector();
	const propId = activeProperty?.id;

	if (propId && propId.length > 0) {
		return <PropertyDetails id={propId} />;
	} else
		return (
			<div className='p-4'>
				<TopBar pageTitle='Add Property' showPropertySelector />
				<GetStartedModal
					open={open}
					handleOpen={handleOpen}
					closeModal={closeModal}
					role={user?.role || ""}
				/>
			</div>
		);
};

export default Page;
