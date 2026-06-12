"use client";
import { BackIcon } from "@/assets/svg";
import { ROUTES } from "@/constants/routes";
import { Button, Typography, Spinner } from "@material-tailwind/react";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Heart, PlusIcon, Search, Tag } from "lucide-react";
import Image from "next/image";
import { FormInput } from "../General/form";
import { useShopper } from "@/context/shopperContext";
import logo from "@/assets/images/logo.png";
import { inCart } from "@/utils/helpers";
import { useShopperSelector } from "@/Redux/selectors";

interface CategoryProductProps {
  categoryId: string;
}

const CategoryProduct: React.FC<CategoryProductProps> = ({ categoryId }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [quantity] = useState(1);
  const [loadingProducts, setLoadingProducts] = useState<{
    [key: string]: boolean;
  }>({});
  const {
    getCategoryProducts,
    trendingProducts,
    popularProducts,
    isTrendingLoading,
    isPopularLoading,
    addToCart,
  } = useShopper();
  const { cartItems, favouriteItems } = useShopperSelector();

  const handleAddToCart = async (product: any) => {
    if (!product) return;
    const isItemInCart = inCart(cartItems, product.id);
    if (isItemInCart) return;

    setLoadingProducts((prev) => ({ ...prev, [product.id]: true }));
    try {
      await addToCart(product.id, quantity);
    } finally {
      setLoadingProducts((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  useEffect(() => {
    getCategoryProducts(categoryId);
  }, [categoryId]);

  const isFavorited = (productId: string) => {
    return favouriteItems?.some((vendor) =>
      vendor.cart_items.some((item) => item.product_id === productId)
    );
  };

  const filterProducts = (products: any[]) => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(
      (product) =>
        product?.product_name?.toLowerCase().includes(query) ||
        product?.product_description?.toLowerCase().includes(query)
    );
  };

  const renderProducts = (products: any[], loading: boolean) => {
    if (loading) {
      return (
        <div className="flex justify-center items-center min-h-[200px]">
          <Spinner className="h-8 w-8" />
        </div>
      );
    }

    if (products.length === 0 && searchQuery.trim()) {
      return (
        <Typography className="text-center font-semibold text-gray-700">
          No products found for "{searchQuery}"
        </Typography>
      );
    }

    return (
      <div className="flex overflow-x-auto gap-4 pb-9 no-scrollbar">
        {products?.map((product) => {
          const isItemInCart = inCart(cartItems, product.id);
          const favorited = isFavorited(product.id);
          const isProductLoading = loadingProducts[product.id] || false;
          return (
            <div
              key={product?.id}
              className="min-w-[300px] flex-shrink-0 bg-white rounded-lg shadow-sm border border-gray-100"
            >
              <div className="relative bg-[#F9FAFB] py-3 mb-3">
                <div className="h-[180px] flex items-center justify-center">
                  <Image
                    src={product?.product_image || logo}
                    alt={product?.product_name}
                    className="max-h-full object-contain"
                    width={200}
                    height={200}
                  />
                </div>

                {product.product_wholesale_price && (
                  <div className="absolute top-2 left-2 bg-[#474A4E] text-white text-xs font-semibold py-1 px-2 rounded flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    0%
                  </div>
                )}

                <button
                  onClick={() => addToCart(product?.id, 1, "favourite")}
                  className={`absolute top-2 right-2 h-10 w-10 ${
                    favorited ? "bg-[#E0F0FF]" : "bg-[#F1F1F1]"
                  } rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-0`}
                >
                  <Heart
                    size={20}
                    className={
                      favorited
                        ? "text-[#007AF5] fill-[#007AF5]"
                        : "text-[#b2b4bb] fill-[#b2b4bb]"
                    }
                    strokeWidth={0.5}
                  />
                </button>
              </div>
              <div className="p-4">
                <div className="space-y-1">
                  <Typography className="text-md font-bold text-center">
                    {product.product_name}
                  </Typography>
                  <Typography className="text-sm text-gray-700 line-clamp-2 font-normal text-center">
                    {product.product_description}
                  </Typography>
                  <Typography className="text-xl font-semibold text-[#B87C16] text-center">
                    GHS {product.product_retail_price}
                  </Typography>
                  <Typography className="text-sm text-[#6D7280] text-center">
                    {product.product_quantity_per_package} pieces
                  </Typography>
                </div>

                <Button
                  variant="text"
                  onClick={() => handleAddToCart(product)}
                  disabled={isProductLoading || isItemInCart}
                  loading={isProductLoading}
                  className={`w-full mt-3 py-3 flex items-center justify-center gap-2 normal-case rounded shadow-sm ${
                    isItemInCart
                      ? "bg-gray-100 cursor-not-allowed opacity-60"
                      : "bg-blue_pry bg-opacity-10 shadow-blue_pry"
                  }`}
                >
                  <PlusIcon className="h-5 w-5" />
                  <Typography className="text-sm font-semibold">
                    {isItemInCart ? "In Cart" : "Add to Cart"}
                  </Typography>
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <main>
      <header className="flex justify-between items-center">
        <div>
          <Link
            href={ROUTES.allCategories}
            className="flex items-center gap-2 mb-6"
          >
            <BackIcon />
            <Typography className="font-semibold text-xl">
              {trendingProducts?.products[0]?.product_category_name ||
                "Category Products"}
            </Typography>
          </Link>
        </div>
        <FormInput
          placeholder="Search..."
          icon={<Search color="#A6ADB6" />}
          iconPosition="left"
          value={searchQuery}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setSearchQuery(e.target.value)
          }
          paddingY="3"
          className="max-w-40 md:max-w-96 shadow-[0px_8px_16px_0px_#00000014,0px_0px_4px_0px_#0000000A] rounded-xl bg-white"
        />
      </header>

      <section className="mt-7">
        <div className="flex justify-between items-center mb-4">
          <Typography className="font-semibold text-lg">Trending</Typography>
          <Link
            href={`/trending-products/${categoryId}`}
            className="normal-case text-blue-500 p-0 font-semibold text-md"
          >
            View all
          </Link>
        </div>
        {renderProducts(
          filterProducts(trendingProducts?.products || []),
          isTrendingLoading
        )}
      </section>

      <section className="mt-7">
        <div className="flex justify-between items-center mb-4">
          <Typography className="font-semibold text-lg">Popular</Typography>
          <Link
            href={`/popular-products/${categoryId}`}
            className="normal-case text-blue-500 p-0 font-semibold text-md"
          >
            View all
          </Link>
        </div>
        {renderProducts(
          filterProducts(popularProducts?.products || []),
          isPopularLoading
        )}
      </section>
    </main>
  );
};

export default CategoryProduct;
