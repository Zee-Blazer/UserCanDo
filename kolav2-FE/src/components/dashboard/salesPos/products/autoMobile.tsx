import React, { useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useDashboardSelector } from "@/Redux/selectors";
import { useDash } from "@/context/dashboardContext";

const AutoMobile = ({ addToCart }: any) => {
  const { loadProductsByCategory } = useDash();
  const { automobileProducts } = useDashboardSelector();

  useEffect(() => {
    loadProductsByCategory();
  }, [loadProductsByCategory]);

  if (!Array.isArray(automobileProducts) || automobileProducts.length === 0) {
    return <div>No products available</div>;
  }

  return (
    <main>
      <div className="grid gap-4">
        {automobileProducts.map((product, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center py-2 border-b"
            >
              <div className="flex items-center gap-3">
                {product?.product_image ? (
                  <div className="w-10 h-10 overflow-hidden rounded-full">
                    <img
                      src={product?.product_image}
                      alt={product?.product_name || "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {product?.product_name?.charAt(0) || "P"}
                  </div>
                )}
                <Typography variant="small" className="text-gray_4 font-normal">
                  {product?.product_name}
                </Typography>
              </div>
              <div className="flex items-center gap-10">
                <Typography variant="small" className="text-gray_4 font-normal">
                  GHS {""}
                  {product?.product_retail_price || "0.00"}
                </Typography>
                <Button
                  variant="outlined"
                  onClick={() => addToCart(product)}
                  className="border py-1 px-2 rounded-md normal-case font-medium text-sm border-pry2 shadow-none text-pry2"
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
};

export default AutoMobile;
