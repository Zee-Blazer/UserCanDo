"use client";
import React, { useEffect, useState } from "react";
import { useShopper } from "@/context/shopperContext";
import ProductGrid from "@/components/shopperHome/ProductGrid";

const PopularProducts = ({ params }: { params: { id: string } }) => {
	const { getCategoryProducts, popularProducts, isPopularLoading } =
		useShopper();
	const [searchQuery, setSearchQuery] = useState("");
	const [currentPage, setCurrentPage] = useState(1);

	useEffect(() => {
		getCategoryProducts(params.id);
	}, [params.id]);

	const handlePageChange = (page: number) => {
		setCurrentPage(page);
		getCategoryProducts(params.id, page);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<ProductGrid
			title='Popular Products'
			backLink={`/all-categories/${params.id}`}
			products={popularProducts.products}
			isLoading={isPopularLoading}
			totalItems={popularProducts.count}
			currentPage={currentPage}
			onPageChange={handlePageChange}
			searchQuery={searchQuery}
			onSearch={setSearchQuery}
		/>
	);
};

export default PopularProducts;
