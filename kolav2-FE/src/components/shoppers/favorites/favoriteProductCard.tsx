import { Typography, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import defaultImage from "@/assets/images/deal1.png";
import { CartItem } from "@/types/shopper";
import { Heart, Check, Minus, Plus } from "@phosphor-icons/react";
import { useShopper } from "@/context/shopperContext";
import { useEffect, useState } from "react";

interface FavProductCardProps {
  product: CartItem;
  showSelect: boolean;
  isSelected?: boolean;
  onToggleSelect?: () => void;
}

const FavoriteProductCard = ({
  product,
  showSelect,
  isSelected = false,
  onToggleSelect = () => {},
}: FavProductCardProps) => {
  const formatPrice = (price: string) => {
    return parseFloat(price || "0").toFixed(2);
  };
  const { updateCartQuantity } = useShopper();
  const [quantity, setQuantity] = useState(product.quantity);
  const [isLoading, setIsLoading] = useState(false);

  const handleQuantityUpdate = async (type: "increment" | "decrement") => {
    if (isLoading) return;
    setIsLoading(true);
    await updateCartQuantity(product.cart_item_id, type);
    setIsLoading(false);
  };

  const increment = () => {
    if (quantity < product.product_stock_level) {
      handleQuantityUpdate("increment");
    }
  };

  const decrement = () => {
    handleQuantityUpdate("decrement");
  };

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

  return (
    <div
      className="flex flex-col sm:flex-row justify-between px-4 border-b pb-4 border-[#EDEEF0] mb-4 gap-4"
      onClick={() => showSelect && onToggleSelect()}
    >
      <div className="flex gap-4 items-start">
        <div className="flex items-center gap-2">
          {showSelect && (
            <div>
              <input type="radio" name="custom-radio" className="hidden" />
              <div
                className={`${
                  isSelected
                    ? "bg-[#F5AA29] p-1"
                    : "border border-gray-400 border-3 h-4 w-4"
                } flex items-center justify-center`}
              >
                {isSelected && <Check className="" color="white" size={12} />}
              </div>
            </div>
          )}
          <div className="relative w-16 h-12 sm:w-20 sm:h-16">
            <Image
              src={product.product_image || defaultImage}
              alt={product.product_name || "Product"}
              fill
              className="object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultImage.src;
              }}
            />
          </div>
        </div>

        <div className="flex flex-col w-full">
          <div className="flex flex-row justify-between items-start gap-2">
            <div className="flex flex-col">
              <Typography className="text-[#474A4E] font-semibold text-sm sm:text-base">
                {product.product_name || "Unnamed Product"}
              </Typography>
              <Typography className="text-xs sm:text-sm text-gray-600 pb-1">
                {product.product_description || "No description available"}
              </Typography>
              <Typography className="font-normal text-xs text-gray-500 pb-1">
                {product.product_weight || ""}
                {product.product_weight_type || ""}
                {product.product_package_type &&
                  ` (${product.product_package_type})`}
              </Typography>
              <Typography className="text-[#B87C16] text-sm font-bold">
                GHS {formatPrice(product.product_price_per_piece)}
              </Typography>
              {product.product_sale_discount_price !== "0.00" && (
                <Typography className="text-xs text-green-600">
                  Save GHS {formatPrice(product.product_sale_discount_price)}
                </Typography>
              )}
            </div>
            <div className="flex sm:hidden mt-auto">
              <IconButton
                variant="text"
                className="bg-powder_blue rounded-full p-1 w-8 h-8"
                onClick={(e) => {
                  e.stopPropagation();
                }}
              >
                <Heart size={14} weight="fill" color="#007AF5" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <div className="hidden sm:flex justify-end items-end mt-auto">
        <IconButton
          variant="text"
          className="bg-powder_blue rounded-full p-1 w-8 h-8"
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Heart size={14} weight="fill" color="#007AF5" />
        </IconButton>
      </div>
    </div>
  );
};

export default FavoriteProductCard;
