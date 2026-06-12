import { Button, Typography } from "@material-tailwind/react";
import React from "react";
import { PlusIcon, HeartIcon, Tag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useShopperSelector } from "@/Redux/selectors";
import logo from "@/assets/images/logo.png";
import { ROUTES } from "@/constants/routes";
import { inCart } from "@/utils/helpers";
import { useShopper } from "@/context/shopperContext";

const NewDeals = () => {
  const { newDeals, cartItems, favouriteItems } = useShopperSelector();
  const { addToCart } = useShopper();

  const isFavorited = (productId: string) => {
    return favouriteItems?.some((vendor) =>
      vendor.cart_items.some((item) => item.product_id === productId)
    );
  };

  return (
    <div className="mb-8">
      <div className="flex justify-between items-center mb-4">
        <Typography className="font-semibold text-xl">New Deals</Typography>
        <Link href={ROUTES.allDeals}>
          <Button
            className="normal-case text-blue-500 p-0 font-medium"
            variant="text"
          >
            View all
          </Button>
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-4 pb-6 no-scrollbar">
        {newDeals?.products.map((deal: Product) => {
          const isInCart = inCart(cartItems, deal.id);
          const favorited = isFavorited(deal.id);
          return (
            <div
              key={deal.id}
              className="min-w-[220px] flex-shrink-0 bg-white rounded-lg p-3 shadow-sm border border-gray-100"
            >
              <div className="relative mb-3">
                <div className="h-[180px] flex items-center justify-center">
                  <Image
                    src={deal?.product_image || logo}
                    alt={deal?.product_name || ""}
                    className="max-h-full object-contain"
                    width={200}
                    height={200}
                  />
                </div>

                {deal?.product_wholesale_price && (
                  <div className="absolute top-2 left-2 bg-gray-800 text-white text-xs font-semibold py-1 px-2 rounded flex items-center gap-1">
                    <Tag className="h-4 w-4" />
                    {Math.round(
                      ((Number(deal?.product_retail_price) -
                        Number(deal?.product_wholesale_price)) /
                        Number(deal?.product_retail_price)) *
                        100
                    )}
                    %
                  </div>
                )}

                <button
                  className={`absolute top-2 right-2 h-8 w-8 ${
                    favorited ? "bg-[#E0F0FF]" : "bg-white"
                  } rounded-full flex items-center justify-center shadow-sm border border-gray-100 p-0`}
                  onClick={() => addToCart(deal.id, 1, "favourite")}
                >
                  <HeartIcon
                    className={`h-5 w-5 ${
                      favorited
                        ? "text-[#007AF5] fill-[#007AF5]"
                        : "text-gray-400"
                    }`}
                  />
                </button>
              </div>

              <div className="space-y-1">
                <Typography className="text-sm font-semibold text-center">
                  {deal?.product_name || ""}
                </Typography>
                <Typography className="text-xs text-gray-700 line-clamp-2 text-center">
                  {deal?.product_description || ""}
                </Typography>
                <Typography className="text-base font-bold text-[#B87C16] text-center">
                  GHS {deal?.product_retail_price || ""}/
                  {deal?.product_package_type?.toLowerCase() || "unit"}
                </Typography>
                <Typography className="text-xs text-gray-500 text-center">
                  {deal?.product_quantity_per_package || ""} per{" "}
                  {deal?.product_package_type?.toLowerCase() || "package"}
                </Typography>
              </div>

              {isInCart ? (
                <Button
                  variant="text"
                  disabled
                  className="w-full mt-3 bg-gray-100 text-gray-500 py-2 flex items-center justify-center gap-2 normal-case rounded cursor-not-allowed opacity-60 font-semibold"
                >
                  <PlusIcon className="h-4 w-4" />
                  In Cart
                </Button>
              ) : (
                <Link href={`/product/${deal?.id}`}>
                  <Button
                    variant="text"
                    className="w-full mt-3 bg-blue_pry bg-opacity-10 text-pry2 py-2 flex items-center justify-center gap-2 normal-case rounded shadow-sm shadow-blue_pry font-semibold"
                  >
                    <PlusIcon className="h-4 w-4" />
                    Shop Now
                  </Button>
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default NewDeals;
