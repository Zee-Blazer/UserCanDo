"use client";
import { FormInput } from "@/components/General/form";
import { Button, Typography } from "@material-tailwind/react";
import { Check, Search } from "lucide-react";
import React, { useEffect, useState } from "react";
import logo from "@/assets/images/crunch.png";
import Image from "next/image";
import { useAuth } from "@/context/authContext";
import { useAgentSelector } from "@/Redux/selectors";
import { useAgent } from "@/context/agentContext";

const SalesProduct = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const { nextAgentRequestSlide, selectedProducts, toggleProduct } = useAuth();
  const { loadAgentProductsData } = useAgent();

  const { products } = useAgentSelector();

  useEffect(() => {
    loadAgentProductsData();
  }, [loadAgentProductsData]);

  // Reset local state when global state is cleared
  useEffect(() => {
    if (selectedProducts.length === 0 && searchQuery) {
      setSearchQuery("");
    }
  }, [selectedProducts.length, searchQuery]);

  const filteredProducts =
    products?.filter(
      (product) =>
        product?.product_name
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase()) ||
        product?.product_category_name
          ?.toLowerCase()
          ?.includes(searchQuery.toLowerCase())
    ) || [];

  return (
    <main className="w-full">
      <header className="flex justify-between items-center mb-6">
        <Typography className="text-xl font-medium">Select Product</Typography>
        <div className="flex gap-4 items-center">
          <span className="text-[#787486] text-sm">
            {selectedProducts?.length || 0} Items Selected
          </span>
          <FormInput
            placeholder="Search..."
            icon={<Search color="#A6ADB6" />}
            iconPosition="left"
            value={searchQuery}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSearchQuery(e.target.value)
            }
            paddingY="3"
            className="w-96 rounded-xl bg-white"
          />
        </div>
      </header>

      <section className="mt-10 w-full">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-9">
          {filteredProducts?.map((item) => (
            <div
              key={item?.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 w-full max-w-[200px] mx-auto cursor-pointer"
              onClick={() => toggleProduct(item)}
            >
              <div className="mb-3 py-2 bg-[#F9FAFB] relative">
                <div className="h-[120px] flex items-center justify-center">
                  <Image
                    src={item?.product_image || logo}
                    alt={item?.product_name || "Product"}
                    className="max-h-full max-w-full object-contain"
                    width={100}
                    height={100}
                  />
                  <button className="absolute top-2 right-2 bg-[#F2F2F2] rounded-full p-1.5">
                    {selectedProducts?.some((p) => p?.id === item?.id) ? (
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
                  {item?.product_name || "Unnamed Product"}
                </Typography>
                <Typography className="text-xs font-normal text-gray-700 line-clamp-1 text-center">
                  {item?.product_category_name || "No Category"}
                </Typography>
                <Typography className="text-xl font-semibold text-[#B87C16] text-center">
                  GHS {item?.product_retail_price || "0"}
                </Typography>
                <Typography className="text-sm text-gray-500 text-center">
                  {item?.product_stock_level || 0} in stock
                </Typography>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Button
        variant="text"
        onClick={nextAgentRequestSlide}
        className="w-full max-w-2xl mx-auto mt-10 text-white bg-blue_pry py-3 flex items-center justify-center text-sm gap-2 normal-case rounded shadow-sm shadow-blue_pry font-semibold"
        disabled={(selectedProducts?.length || 0) === 0}
      >
        Continue ({selectedProducts?.length || 0} selected)
      </Button>
    </main>
  );
};

export default SalesProduct;
