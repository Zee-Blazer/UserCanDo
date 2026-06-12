import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";

interface StockProductsProps {
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const StockProducts = ({ activeIndex, setActiveIndex }: StockProductsProps) => {
  const { productCategories } = useDashboardSelector();
  const allCategories = [
    { label: "All", category_name: "All" },
    ...(productCategories?.map((cat) => ({
      label: cat.category_name,
      category_name: cat.category_name,
    })) || []),
    { label: "Uncategorized", category_name: "Uncategorized" },
  ];

  return (
    <div className="mt-4 w-full overflow-hidden">
      <div className="flex justify-center py-3 overflow-x-auto pb-4 scrollbar-hide gap-4">
        {allCategories?.map((category, index) => (
          <Button
            key={index}
            className={`normal-case bg-transparent rounded-full px-4 py-3 shadow-none hover:shadow-none flex-shrink-0 ${
              activeIndex === index
                ? "text-[#0052A3] bg-[#E0F0FF]"
                : "text-[#898b8e] bg-[#F1F1F1]"
            }`}
            onClick={() => setActiveIndex(index)}
          >
            <Typography className="flex text-sm font-semibold items-center whitespace-nowrap">
              {category.label}
            </Typography>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default StockProducts;
