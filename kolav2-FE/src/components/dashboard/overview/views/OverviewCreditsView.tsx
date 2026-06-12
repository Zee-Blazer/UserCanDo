import React from "react";
import OverviewCreditsStats from "@/components/dashboard/overview/overviewCreditsStats";
import OverviewCreditAnalytics from "../overviewCreditAnalytics";
import OverviewCreditsTableSection from "../overviewCreditsTable";

const OverviewCreditsView = () => {
	return (
		<div className='flex flex-col gap-y-4'>
			<OverviewCreditsStats />
			<OverviewCreditAnalytics />
			<OverviewCreditsTableSection />
		</div>
	);
};

export default OverviewCreditsView;
