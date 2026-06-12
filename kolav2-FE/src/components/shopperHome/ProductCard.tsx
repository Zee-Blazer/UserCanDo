"use client";
import React, { useState } from "react";
import { Typography, Button, Spinner } from "@material-tailwind/react";
import { Heart, PlusIcon, Tag } from "lucide-react";
import Image from "next/image";
import { useShopper } from "@/context/shopperContext";
import logo from "@/assets/images/logo.png";
import { useShopperSelector } from "@/Redux/selectors";
import { inCart } from "@/utils/helpers";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useShopper();
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const { cartItems } = useShopperSelector();
  const isInCart = inCart(cartItems, product.id);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    await addToCart(product.id, 1);
    setIsAddingToCart(false);
  };

  return (
    <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-100 hover:shadow-lg transition-shadow duration-200">
      <div className="relative bg-[#F9FAFB] py-3 mb-3">
        <div className="h-[180px] flex items-center justify-center">
          <Image
            src={product.product_image || logo}
            alt={product.product_name}
            className="max-h-full object-contain"
            width={200}
            height={200}
          />
        </div>

        {product.product_wholesale_price && (
          <div className="absolute top-2 left-2 bg-[#474A4E] text-white text-xs font-semibold py-1 px-2 rounded flex items-center gap-1">
            <Tag className="h-4 w-4" />
            {Math.round(
              ((Number(product.product_retail_price) -
                Number(product.product_wholesale_price)) /
                Number(product.product_retail_price)) *
                100
            )}
            %
          </div>
        )}

        <button className="absolute top-2 right-2 h-10 w-10 bg-[#F1F1F1] rounded-full flex items-center justify-center shadow-sm border border-gray-100">
          <Heart size={20} color="#b2b4bb" strokeWidth={0.5} fill="#b2b4bb" />
        </button>
      </div>

      <div className="space-y-2">
        <Typography className="text-sm font-bold text-center">
          {product.product_name}
        </Typography>
        <Typography className="text-xs text-gray-700 line-clamp-2 text-center">
          {product.product_description}
        </Typography>
        <Typography className="text-base font-semibold text-[#B87C16] text-center">
          GHS {product.product_retail_price}
        </Typography>
        <Typography className="text-xs text-gray-500 text-center">
          {product.product_quantity_per_package} pieces
        </Typography>
      </div>

      <Button
        className="w-full mt-4 bg-blue_pry bg-opacity-10 text-pry2 py-2 flex items-center justify-center gap-2 rounded shadow-sm shadow-blue_pry font-semibold normal-case"
        onClick={handleAddToCart}
        disabled={isAddingToCart || isInCart}
      >
        {isAddingToCart ? (
          <Spinner className="h-4 w-4" />
        ) : (
          <>
            <PlusIcon className="h-4 w-4" />
            {isInCart ? "In Cart" : "Add to Cart"}
          </>
        )}
      </Button>
    </div>
  );
};

export default ProductCard;
