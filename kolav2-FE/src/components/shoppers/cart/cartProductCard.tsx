import { Typography, IconButton } from "@material-tailwind/react";
import Image from "next/image";
import defaultImage from "@/assets/images/deal1.png";
import { Trash, Plus, Minus } from "@phosphor-icons/react";
import { useState, useEffect } from "react";
import { DeleteModal } from "@/components/General/deleteModal";
import { CartItem } from "@/types/shopper";
import { useShopper } from "@/context/shopperContext";

interface CartProductCardProps {
  product: CartItem;
}

const CartProductCard = ({ product }: CartProductCardProps) => {
  const [quantity, setQuantity] = useState(product.quantity);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const { updateCartQuantity, removeFromCart, isCartDeleting } = useShopper();
  const [isLoading, setIsLoading] = useState(false);
  // ...existing code...

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    setQuantity(product.quantity);
    setInputValue(product.quantity.toString());
  }, [product.quantity]);
  const handleInputConfirm = async () => {
    let val = parseInt(inputValue, 10);
    if (isNaN(val) || val < 1) val = 1;
    if (val > product.product_stock_level) val = product.product_stock_level;
    setInputValue(val.toString());
    if (val !== quantity) {
      setIsLoading(true);
      await updateCartQuantity(product.cart_item_id, "increment", val);
      setIsLoading(false);
    }
    setIsEditing(false);
  };
  const [isEditing, setIsEditing] = useState(false);
  const [inputValue, setInputValue] = useState(product.quantity.toString());
  const [isMobile, setIsMobile] = useState(false);

  // ...existing code...

  useEffect(() => {
    setQuantity(product.quantity);
  }, [product.quantity]);

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

  const handleDelete = async () => {
    try {
      await removeFromCart(product.cart_item_id);
      setIsDeleteModalOpen(false);
    } catch (error) {
      console.error("Failed to delete item:", error);
    }
  };

  const formatPrice = (price: string) => {
    return parseFloat(price).toFixed(2);
  };

  return (
    <>
      <div className="flex justify-between px-4 pb-4 border-b border-[#EDEEF0]  mb-4">
        <div className="flex gap-4 items-start">
          <div className="relative w-16 h-16">
            <Image
              src={product.product_image || defaultImage}
              alt={product.product_name}
              fill
              className="object-cover rounded-lg"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = defaultImage.src;
              }}
            />
          </div>
          <div className="flex flex-col">
            <Typography className="text-[#474A4E] text-lg font-semibold">
              {product.product_name}
            </Typography>
            <Typography className="text-sm font-normal text-gray-600 pb-1">
              {product.product_description}
            </Typography>
            <Typography className="font-semibold text-sm text-[#6D7280] pb-1">
              {product.product_weight}
              {product.product_weight_type}
              {product.product_package_type &&
                ` (${product.product_package_type})`}
            </Typography>
            <Typography className="text-[#B87C16] text-md font-bold">
              GHS {formatPrice(product.product_price_per_piece)}
            </Typography>
            {product.product_sale_discount_price !== "0.00" && (
              <Typography className="text-xs text-green-600">
                Save GHS {formatPrice(product.product_sale_discount_price)}
              </Typography>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-5 items-end justify-between h-full">
          <IconButton
            variant="text"
            onClick={() => setIsDeleteModalOpen(true)}
            className="hover:bg-red-50"
            disabled={isLoading}
          >
            <Trash size={24} color="#6D7280" />
          </IconButton>
          <div className="flex gap-x-2 items-center">
            <Typography className="text-[#6D7280]">Qty</Typography>
            <div className="flex items-center gap-x-2 border-2 border-[#F1F1F1] rounded-lg">
              <IconButton
                className="border-r-2 rounded-none border-[#F1F1F1] disabled:opacity-50"
                variant="text"
                onClick={decrement}
                disabled={isLoading || quantity <= 1}
              >
                <Minus stroke="2" />
              </IconButton>
              {isEditing ? (
                <input
                  type="number"
                  min={1}
                  max={product.product_stock_level}
                  className="w-12 px-2 py-1 text-center font-semibold text-[#474A4E] bg-transparent outline-none border-none"
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value.replace(/\D/g, ""))}
                  onBlur={handleInputConfirm}
                  onKeyDown={e => {
                    if (e.key === "Enter") handleInputConfirm();
                  }}
                  disabled={isLoading}
                  style={{ MozAppearance: 'textfield' }}
                />
              ) : (
                <Typography
                  className="px-2 font-semibold text-[#474A4E] min-w-[32px] text-center cursor-pointer select-none"
                  onDoubleClick={() => { if (!isMobile) setIsEditing(true); }}
                  onPointerDown={e => {
                    if (isMobile) {
                      let timer = setTimeout(() => setIsEditing(true), 500);
                      const clear = () => { clearTimeout(timer); window.removeEventListener('pointerup', clear); window.removeEventListener('pointerleave', clear); };
                      window.addEventListener('pointerup', clear);
                      window.addEventListener('pointerleave', clear);
                    }
                  }}
                  title="Double click (desktop) or long press (mobile) to edit"
                >
                  {isLoading ? "..." : quantity}
                </Typography>
              )}
              <IconButton
                className="border-l-2 rounded-none border-[#F1F1F1] disabled:opacity-50"
                variant="text"
                onClick={increment}
                disabled={isLoading || quantity >= product.product_stock_level}
              >
                <Plus stroke="2" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        open={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onDelete={handleDelete}
        loading={isCartDeleting}
        header="Delete Item?"
        message={`Are you sure you want to remove ${product.product_name} from your cart?`}
      />
    </>
  );
};

export default CartProductCard;
