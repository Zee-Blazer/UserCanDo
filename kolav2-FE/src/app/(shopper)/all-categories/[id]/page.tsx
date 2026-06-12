"use client";

import CategoryProduct from "@/components/shopperHome/categoryProduct";

const CategoryPage = ({ params }: { params: { id: string } }) => {
	return <CategoryProduct categoryId={params.id} />;
};

export default CategoryPage;
