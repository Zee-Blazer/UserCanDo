"use client";
import RenovationsPage from "@/app/(pages)/renovations";
import RenovationsDetailsPage from "@/app/(pages)/renovationsDetailsPage";
import { useSearchParams } from "next/navigation";
import React from "react";

const Page = () => {
	const query = useSearchParams();
	const renId = query.get("id")?.trim();
	if (renId && renId.length > 0) {
		return <RenovationsDetailsPage id={renId} />;
	}
	return <RenovationsPage />;
};

export default Page;
