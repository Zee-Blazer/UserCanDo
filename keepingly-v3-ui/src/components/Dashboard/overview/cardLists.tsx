import React, { useState } from "react";
import TotalPropertiesCard from "./totalPropertiesCard";
import TotalBrokerCard from "./totalBrokerCard";
import QuickActionCard from "./quickActionCard";
import { useAuthSelector } from "@/Redux/selectors";
import TotalExpensesCard from "./totalExpensesCard"; // Changed
import TotalInventoryCard from "./totalInventory"; // Changed
import KeeptrackCard from "./keepTrackCard"; // Changed

import KeeptrackCardScore from "./keepTrackScoreCard"; // New
import ExpenseTrackCard from "./expensesTrackCard"; // New
import EstimatedHomeValue from "./estimatedHomeValue"; // New
import EstimatedEquity from "./setimatedEquity"; // New

const CardLists = () => {
	const { user } = useAuthSelector();

	const role = user?.role;
	return (
		<div>
			{role === "homeowner" && (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4'>
					{/* <KeeptrackCardScore /> */}
					<KeeptrackCard />
					<ExpenseTrackCard />
					{/* <TotalInventoryCard /> */}
					<EstimatedHomeValue />

					<EstimatedEquity />
					{/* <TotalExpensesCard /> */}
				</div>
			)}
			{role?.includes("broker") && (
				<div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
					<TotalPropertiesCard />
					<TotalBrokerCard />
					<QuickActionCard />
				</div>
			)}
		</div>
	);
};

export default CardLists;
