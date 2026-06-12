"use client";

import React, { useEffect, useState } from "react";
import { Check, ChevronLeft, MapPin, Search } from "lucide-react";
import { useAuth } from "@/context/authContext";
import {  useAgentSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import Image, { StaticImageData } from "next/image";
import SearchComp from "@/components/General/TanTable/searchComp";
import { useAgent } from "@/context/agentContext";
import { usePageData } from "@/api/hooks/usePageData";

interface Product {
  id: string;
  image: StaticImageData | string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  weight?: string;
}

const Products = () => {
  const {
    prevSlide,
    nextAgentRequestSlide,
    shopperProfileSaleInputs,
    setShopperProfileSaleInputs,
  } = useAuth();

  const { loadAgentCustomersData, loadAgentProductsData } = useAgent();
  const { customers, products } = useAgentSelector();

  usePageData([loadAgentCustomersData, loadAgentProductsData]);

  const customer = customers?.find(
    (c) => c.id === shopperProfileSaleInputs?.customer_id
  );

  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [error, setError] = useState<string | null>(null);

  // Reset local state when global state is cleared
  useEffect(() => {
    if (shopperProfileSaleInputs.products.length === 0 && selectedProducts.length > 0) {
      setSelectedProducts([]);
      setSearchQuery("");
      setError(null);
    }
  }, [shopperProfileSaleInputs.products.length, selectedProducts.length]);

  const handleSelectProduct = (product: Product) => {
    const isSelected = selectedProducts.some((p) => p.id === product.id);

    if (isSelected) {
      setSelectedProducts(selectedProducts.filter((p) => p.id !== product.id));

      setShopperProfileSaleInputs((prevState) => ({
        ...prevState,
        products: prevState.products.filter((p) => p.product_id !== product.id),
      }));
    } else {
      setSelectedProducts([...selectedProducts, product]);

      const newProduct = {
        product_id: product.id,
        item_type: "pieces" as "case" | "pieces",
        quantity: product.quantity,
        unit_price: product.price,
        total_price: product.price * product.quantity,
        name: product.name,
        description: product.description,
        weight: product.weight,
        image: product.image,
      };

      setShopperProfileSaleInputs((prevState) => ({
        ...prevState,
        products: [...prevState.products, newProduct],
      }));
    }

    setError(null);
  };

  const handleContinue = () => {
    if (selectedProducts.length === 0) {
      setError("Please select at least one product before continuing.");
      setTimeout(() => setError(null), 3000);
      return;
    }
    nextAgentRequestSlide();
  };

  const filteredProducts =
    products?.filter(
      (product) =>
        product.product_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        product.product_category_name
          .toLowerCase()
          .includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <main className="flex flex-col h-full w-full">
      <header className="flex justify-between items-center mb-6">
        <Typography className="text-xl font-medium">Select Product</Typography>

        <div className="flex items-center">
          <span className="text-[#787486] text-sm">
            {selectedProducts.length} Items Selected
          </span>
          <SearchComp setSearchTerm={setSearchQuery} searchTerm={searchQuery} />
        </div>
      </header>

      <div
        className="flex items-center w-fit gap-2 cursor-pointer text-pry2 text-sm font-medium mb-4"
        onClick={prevSlide}
      >
        <ChevronLeft size={18} />
        <span>Back</span>
      </div>

      <section className="mt-10 w-full overflow-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 py-2.5">
        {filteredProducts?.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-lg shadow-sm border border-gray-100 w-full max-w-[200px] mx-auto cursor-pointer"
            onClick={() =>
              handleSelectProduct({
                id: item.id,
                image: item.product_image,
                name: item.product_name,
                price: item.product_retail_price,
                quantity: 1,
                description: item.product_description,
                weight: item.product_weight,
              })
            }
          >
            <div className="mb-3 py-2 bg-[#F9FAFB] relative">
              <div className="h-[120px] flex items-center justify-center">
                <Image
                  src={item.product_image}
                  alt={item.product_name}
                  className="max-h-full max-w-full object-contain"
                  width={100}
                  height={100}
                />
                <button className="absolute top-2 right-2 bg-[#F2F2F2] rounded-full p-1.5">
                  {selectedProducts.some((p) => p.id === item.id) ? (
                    <div className="w-4 h-4 bg-[#14BA74] rounded-full flex items-center justify-center">
                      <Check size={12} color="#F2F2F2" />
                    </div>
                  ) : (
                    <div className="w-4 h-4 border-2 border-[#8585856B] rounded-full"></div>
                  )}
                </button>
              </div>
            </div>
            <div className="space-y-1 p-3">
              <Typography className="text-md font-bold text-center line-clamp-2">
                {item?.product_name}
              </Typography>
              <Typography className="text-xs font-normal text-gray-700 line-clamp-1 text-center">
                {item?.product_category_name}
              </Typography>
              <Typography className="text-xl font-semibold text-[#B87C16] text-center">
                GHS {item?.product_retail_price}
              </Typography>
              <Typography className="text-sm text-gray-500 text-center">
                {item?.product_stock_level} in stock
              </Typography>
            </div>
          </div>
        ))}
      </section>

      <div className="mt-4 text-center">
        {error && <p className="text-sm text-red-500">{error}</p>}
      </div>

      <div className="mt-8 w-3/6 mx-auto">
        <Button
          className="bg-blue_pry w-full normal-case mt-4"
          onClick={handleContinue}
        >
          <Typography className="text-white font-normal">Continue</Typography>
        </Button>
      </div>
    </main>
  );
};

export default Products;
