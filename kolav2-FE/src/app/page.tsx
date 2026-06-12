"use client";
import React from "react";
import ShopperIndexPage from "./(shopper)/page";
import ShopperLayout from "./(shopper)/layout";

const Page = () => {
	return (
		<ShopperLayout>
			<ShopperIndexPage />
		</ShopperLayout>
	);
};

export default Page;
