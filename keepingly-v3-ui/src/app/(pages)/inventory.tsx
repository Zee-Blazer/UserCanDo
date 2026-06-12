"use client";

import AddInventory from "@/components/Dashboard/inventory/addInventory";
import InventorySummaryComp from "@/components/Dashboard/inventory/inventorySummary";
import InventoryCard from "@/components/Dashboard/inventory/inventoryCard";
import React from "react";
import TopBar from "@/components/Dashboard/layout/topBar";

const InventoryPage = () => {
	return (
		<div className='p-4'>
			<TopBar pageTitle='Insurable Inventories' showPropertySelector />
			<div className='flex flex-col xl:flex-row gap-4 overflow-hidden'>
				<div className='w-full xl:max-w-[480px]'>
					<InventorySummaryComp />
					<AddInventory />
				</div>
				<div className='w-full'>
					<InventoryCard />
				</div>
			</div>
		</div>
	);
};

export default InventoryPage;
