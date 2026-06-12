import { Button, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React, { useEffect } from "react";
import sadImage from "@/assets/images/sad-circle.png";
import logo from "@/assets/images/crunch.png";
import { useAgentSelector, useAuthSelector } from "@/Redux/selectors";
import { useDashboardSelector } from "@/Redux/selectors";
import { USE_CASES, UseCase } from "@/types";
import { useAgent } from "@/context/agentContext";
import { useDash } from "@/context/dashboardContext";

interface AllProps {
  addNewStock: () => void;
  activeTabIndex: number;
}

const All: React.FC<AllProps> = ({ addNewStock, activeTabIndex }) => {
  const { loginData } = useAuthSelector();
  const useCase = loginData?.use_case?.toLowerCase() as UseCase;
  const isAgent = useCase === USE_CASES.AGENT;

  const { products, productCategories } = isAgent
    ? useAgentSelector()
    : useDashboardSelector();

  const loadData = isAgent
    ? useAgent().loadAgentProductsData
    : useDash().loadProductsData;

  useEffect(() => {
    loadData();
  }, [loadData]);

  const allCategories = [
    { category_name: "All" },
    ...(productCategories?.map((cat) => ({
      category_name: cat.category_name,
    })) || []),
    { category_name: "Uncategorized" },
  ];

  const selectedCategory = allCategories[activeTabIndex]?.category_name;
  const filteredProducts = products?.filter((item) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Uncategorized")
      return !item.product_category_name;
    return item.product_category_name === selectedCategory;
  });

  const totalValue = filteredProducts?.reduce(
    (sum, item) =>
      sum + (item.product_retail_price || 0) * (item.product_stock_level || 0),
    0
  );
  const totalItems = filteredProducts?.length || 0;

  return (
    <main className="px-4 md:px-0">
      <section className="flex flex-col md:flex-row md:gap-14 gap-6 mt-8 justify-center">
        <div className="flex flex-col w-full md:w-auto">
          <div className="flex px-6 md:px-10 rounded-xl py-6 gap-2 text-center bg-[#feebe9] flex-col">
            <Typography variant="h5" className="font-semibold">
              GHS {totalValue?.toFixed(2) || "0.00"}
            </Typography>
            <Typography className="text-[#898b8e]">
              Total value In Stock
            </Typography>
          </div>
          <span className="mt-6 md:mt-8 text-[#898b8e]">
            Available in stock
          </span>
        </div>

        <div className="flex flex-col w-full md:w-auto">
          <div className="flex px-6 md:px-10 py-6 text-center gap-2 rounded-xl flex-col bg-[#e4f3ed]">
            <Typography variant="h5" className="font-semibold">
              {totalItems}
            </Typography>
            <Typography className="text-[#898b8e]">Number of Items</Typography>
          </div>
          <button
            onClick={addNewStock}
            className="mt-6 md:mt-8 flex justify-end"
          >
            <span className="text-[#003366]">Add New Stock</span>
          </button>
        </div>
      </section>

      {filteredProducts?.length ? (
        <div className="grid grid-cols-1 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-9">
          {filteredProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm border border-gray-100 w-full max-w-[200px] mx-auto cursor-pointer"
            >
              <div className="mb-3 py-2 bg-[#F9FAFB] relative">
                <div className="h-[120px] flex items-center justify-center">
                  <Image
                    src={item.product_image || logo}
                    alt={item.product_name}
                    className="max-h-full max-w-full object-contain"
                    width={100}
                    height={100}
                  />
                </div>
              </div>
              <div className="space-y-1 p-3">
                <Typography className="text-md font-bold text-center line-clamp-2">
                  {item?.product_name}
                </Typography>
                <Typography className="text-xs font-normal text-gray-700 line-clamp-1 text-center">
                  {item?.product_category_name || "Uncategorized"}
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
        </div>
      ) : (
        <section className="flex justify-center items-center mt-8 flex-col">
          <div className="w-28 h-28 md:w-auto md:h-auto">
            <Image src={sadImage} alt="empty_image" layout="responsive" />
          </div>
          <div className="max-w-md m-auto px-3">
            <Typography variant="h5" className="font-bold text-center mt-3">
              Stock is empty
            </Typography>
            <article className="mt-2 text-center text-sm md:text-base">
              Looks like your stock is currently empty. Start by adding new
              products to keep your inventory up to date.
            </article>
            <Button
              className="normal-case w-full mt-4 bg-[#007AF5]"
              onClick={addNewStock}
            >
              <Typography className="text-white font-normal">
                Add Stock
              </Typography>
            </Button>
          </div>
        </section>
      )}
    </main>
  );
};

export default All;
