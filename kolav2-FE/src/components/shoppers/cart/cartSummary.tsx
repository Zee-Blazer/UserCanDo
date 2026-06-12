import { Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import defaultImage from "@/assets/images/deal1.png";
import { VendorCart } from "@/types/shopper";

interface CartSummaryProps {
  updateActiveTabIndex: (value: number) => void;
  cartItems: VendorCart[];
}

const CartSummary = ({ updateActiveTabIndex, cartItems }: CartSummaryProps) => {
  const calculateSubtotal = () => {
    return cartItems.reduce((total, vendor) => {
      return (
        total +
        vendor.cart_items.reduce((vendorTotal, item) => {
          const price = parseFloat(item.product_price_per_piece) || 0;
          const quantity = item.quantity || 0;
          return vendorTotal + price * quantity;
        }, 0)
      );
    }, 0);
  };

  const subtotal = calculateSubtotal();
  const deliveryFee = 0;
  const total = subtotal + deliveryFee;

  return (
    <div className="border border-1 border-[#EDEEF0] p-4 sm:p-6 rounded-2xl w-full lg:w-[48%]">
      <div className="flex items-center justify-between pb-4 sm:pb-5">
        <Typography className="font-sans text-lg sm:text-xl font-medium text-[#5A5555]">
          Cart Summary
        </Typography>
      </div>

      {cartItems.map((vendor, vendorIndex) => (
        <div key={`vendor-${vendor.vendor_id}-${vendorIndex}`}>
          {vendor.cart_items.map((item, itemIndex) => (
            <div
              key={`item-${item.cart_item_id}-${vendorIndex}-${itemIndex}`}
              className="flex items-center gap-3 sm:gap-4 py-3 sm:py-4"
            >
              <Image
                src={item.product_image || defaultImage}
                width={48}
                height={48}
                alt={item.product_name}
                className="object-cover rounded-lg sm:w-16 sm:h-16"
              />
              <div className="flex flex-col flex-1">
                <Typography className="text-[#474A4E] font-semibold text-sm sm:text-base">
                  {item.product_name}{" "}
                  {item.product_description && (
                    <span className="font-normal text-xs sm:text-sm">
                      {item.product_description}
                    </span>
                  )}
                </Typography>
                <Typography className="text-xs sm:text-sm pb-0.5 sm:pb-1">
                  {item.product_category}
                </Typography>
                <Typography className="font-semibold text-[#6D7280] text-xs sm:text-sm pb-0.5 sm:pb-1">
                  {item.product_weight}
                  {item.product_weight_type}
                  {item.product_package_type &&
                    ` (${item.product_package_type})`}
                </Typography>
                <Typography className="text-[#B87C16] text-sm sm:text-md font-bold">
                  GHS {parseFloat(item.product_price_per_piece).toFixed(2)}
                </Typography>
              </div>
              <div className="border-l-2 px-2 sm:px-3 border-r-2 border-[#F1F1F1] self-end">
                <Typography className="font-semibold text-[#474A4E] text-xs sm:text-sm">
                  {item.quantity} {item.quantity > 1 ? "Pieces" : "Piece"}
                </Typography>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="flex flex-col gap-y-1 sm:gap-y-2 border border-1 border-[#E0F0FF] p-3 sm:p-4 rounded-xl mt-3 sm:mt-4">
        <div className="flex justify-between">
          <Typography className="font-normal text-[#474A4E] text-sm sm:text-md">
            Item subtotal
          </Typography>
          <Typography className="text-[#6D7280] font-semibold text-sm sm:text-md">
            GHS {subtotal.toFixed(2)}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="font-normal text-sm sm:text-md">
            Delivery Fee
          </Typography>
          <Typography className="text-[#6D7280] font-semibold text-sm sm:text-md">
            GHS {deliveryFee.toFixed(2)}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="text-xs sm:text-sm font-bold">
            Total
          </Typography>
          <Typography className="text-[#B87C16] text-base sm:text-lg font-bold">
            GHS {total.toFixed(2)}
          </Typography>
        </div>
      </div>
      <Button
        className="bg-blue_pry w-full normal-case mt-3 sm:mt-4 font-semibold flex items-center justify-center gap-2 sm:gap-4 text-sm sm:text-base py-3 sm:py-4"
        onClick={() => updateActiveTabIndex(3)}
      >
        <Typography className="normal-case font-semibold">
          Proceed to Checkout
        </Typography>
      </Button>
    </div>
  );
};

export default CartSummary;
