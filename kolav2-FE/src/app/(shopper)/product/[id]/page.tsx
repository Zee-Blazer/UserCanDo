"use client";
import React, { useEffect, useState } from "react";
import { Typography, Button, Spinner } from "@material-tailwind/react";
import { Heart, Minus, Plus, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useShopper } from "@/context/shopperContext";
import { BackIcon } from "@/assets/svg";
import { ROUTES } from "@/constants/routes";
import logo from "@/assets/images/logo.png";
import { useShopperSelector } from "@/Redux/selectors";

const ProductDetail = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const {
    getProductById,
    product,
    isProductLoading,
    addToCart,
    isAddingToCart,
  } = useShopper();
  const { favouriteItems } = useShopperSelector();
  const [quantity, setQuantity] = useState(1);
  const [isEditingQuantity, setIsEditingQuantity] = useState(false);
  const quantityInputRef = React.useRef<HTMLInputElement>(null);
  // Handle manual quantity input
  const handleQuantityInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value.replace(/\D/g, "");
    let num = parseInt(val, 10);
    if (isNaN(num)) num = 1;
    if (product?.product_stock_level) {
      num = Math.max(1, Math.min(num, product.product_stock_level));
    }
    setQuantity(num);
  };

  const handleQuantityInputBlur = () => {
    setIsEditingQuantity(false);
  };

  const handleQuantityInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditingQuantity(false);
    }
  };

  useEffect(() => {
    getProductById(params.id);
  }, [params.id]);

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase") {
      setQuantity((prev) =>
        Math.min(prev + 1, product?.product_stock_level || 1)
      );
    } else {
      setQuantity((prev) => Math.max(prev - 1, 1));
    }
  };

  const handleAddToCart = async () => {
    if (!product) return;

    try {
      await addToCart(product.id, quantity);
      router.push(ROUTES.shopperHome);
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  const handleAddToFavorite = async () => {
    if (!product) return;
    await addToCart(product.id, 1, "favourite");
  };

  const isFavorited = () => {
    return favouriteItems?.some((vendor) =>
      vendor.cart_items.some((item) => item.product_id === params.id)
    );
  };

  if (isProductLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spinner className="h-8 w-8" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Typography className="text-center text-xl">
          Product not found
        </Typography>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href={ROUTES.shopperHome} className="flex items-center gap-2 mb-6">
        <BackIcon />
        <Typography className="font-semibold text-xl">
          Product Details
        </Typography>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-[#F9FAFB] rounded-lg p-6 relative">
          <div className="h-[400px] flex items-center justify-center">
            <Image
              src={product.product_image || logo}
              alt={product.product_name}
              className="max-h-full object-contain"
              width={400}
              height={400}
            />
          </div>

          {product.product_wholesale_price && (
            <div className="absolute top-4 left-4 bg-[#474A4E] text-white text-sm font-semibold py-1 px-3 rounded flex items-center gap-2">
              <Tag className="h-5 w-5" />
              {Math.round(
                ((Number(product?.product_retail_price) -
                  Number(product?.product_wholesale_price)) /
                  Number(product?.product_retail_price)) *
                  100
              )}
              % OFF
            </div>
          )}
          <button
            className={`absolute top-4 right-4 h-12 w-12 ${
              isFavorited() ? "bg-[#E0F0FF]" : "bg-white"
            } rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-0`}
            onClick={handleAddToFavorite}
          >
            <Heart
              size={24}
              className={
                isFavorited()
                  ? "text-[#007AF5] fill-[#007AF5]"
                  : "text-[#b2b4bb] fill-[#b2b4bb]"
              }
              strokeWidth={0.5}
            />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <Typography variant="h4" className="font-bold mb-2">
              {product.product_name}
            </Typography>
            <Typography className="text-gray-700">
              {product.product_description}
            </Typography>
          </div>

          <div>
            <Typography variant="h3" className="text-[#B87C16] font-bold">
              GHS {product.product_retail_price}/
              {product?.product_package_type?.toLowerCase() || "unit"}
            </Typography>
            {/* {product.product_wholesale_price && (
                            <Typography className='text-gray-500 line-through'>
                                GHS {product.product_wholesale_price}
                            </Typography>
                        )} */}
          </div>

          <div className="space-y-2">
            <Typography className="font-semibold">Quantity</Typography>
            <div className="flex items-center gap-4">
              <button
                onClick={() => handleQuantityChange("decrease")}
                disabled={quantity === 1}
                className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
              >
                <Minus size={20} />
              </button>
              {isEditingQuantity ? (
                <input
                  ref={quantityInputRef}
                  type="text"
                  className="w-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-200 py-1"
                  value={quantity}
                  onChange={handleQuantityInputChange}
                  onBlur={handleQuantityInputBlur}
                  onKeyDown={handleQuantityInputKeyDown}
                  autoFocus
                />
              ) : (
                <Typography
                  className="w-12 text-center cursor-pointer select-none"
                  onDoubleClick={() => setIsEditingQuantity(true)}
                  title="Double click to edit"
                >
                  {quantity}
                </Typography>
              )}
              <button
                onClick={() => handleQuantityChange("increase")}
                disabled={quantity === product.product_stock_level}
                className="h-10 w-10 rounded-full border border-gray-300 flex items-center justify-center disabled:opacity-50"
              >
                <Plus size={20} />
              </button>
              <Typography className="text-gray-500">
                {product.product_stock_level}{" "}
                {product?.product_package_type?.toLowerCase() || "units"}{" "}
                available
              </Typography>
            </div>
          </div>

          <div className="space-y-2">
            <Typography className="font-semibold">
              Package Information
            </Typography>
            <Typography>
              {product.product_quantity_per_package} per{" "}
              {product?.product_package_type?.toLowerCase() || "package"}
            </Typography>
            <Typography>
              Price per piece: GHS {product.product_price_per_piece}
            </Typography>
          </div>

          <Button
            className="w-full py-4 bg-blue_pry text-white font-semibold rounded-lg flex items-center justify-center gap-2"
            onClick={handleAddToCart}
            disabled={isAddingToCart}
          >
            {isAddingToCart ? <Spinner className="h-5 w-5" /> : "Add to Cart"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
