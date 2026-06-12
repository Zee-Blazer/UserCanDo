"use client";
import InventoryPage from "@/app/(pages)/inventory";
import InventoryDetailsPage from "@/app/(pages)/inventoryDetails";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
	const query = useSearchParams();
	const inventoryId = query.get("id")?.trim();
	if (inventoryId && inventoryId.length > 0) {
		return <InventoryDetailsPage id={inventoryId} />;
	}
	return <InventoryPage />;
};

export default Page;
