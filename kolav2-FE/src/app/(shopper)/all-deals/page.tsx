"use client";
import React, { useState, useEffect } from "react";
import { useShopperSelector } from "@/Redux/selectors";
import { useShopper } from "@/context/shopperContext";
import ProductGrid from "@/components/shopperHome/ProductGrid";
import { ROUTES } from "@/constants/routes";

const AllDeals = () => {
  const { newDeals } = useShopperSelector();
  const { getNewDeals, isNewDealsLoading } = useShopper();
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredProducts, setFilteredProducts] = useState(newDeals.products);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProducts(newDeals.products);
    } else {
      const filtered = newDeals?.products?.filter((product) =>
        product?.product_name
          ?.toLowerCase()
          ?.includes(searchQuery?.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, newDeals?.products]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    getNewDeals(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <ProductGrid
      title="All New Deals"
      backLink={ROUTES.shopperHome}
      products={filteredProducts}
      isLoading={isNewDealsLoading}
      totalItems={newDeals.count}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      searchQuery={searchQuery}
      onSearch={setSearchQuery}
    />
  );
};

export default AllDeals;
