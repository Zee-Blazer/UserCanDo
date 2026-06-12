import { Typography, IconButton } from "@material-tailwind/react";
import CartProductCard from "@/components/shoppers/cart/cartProductCard";
import CartSummary from "./cartSummary";
import { ArrowLeft } from "@phosphor-icons/react";
import { VendorCart } from "@/types/shopper";

interface VendorCartViewProps {
  updateActiveTabIndex: (value: number) => void;
  cartItems: VendorCart[];
}

const VendorCartView = ({
  updateActiveTabIndex,
  cartItems,
}: VendorCartViewProps) => {
  const vendor = cartItems[0];

  return (
    <div className="px-4 sm:px-0">
      <Typography className="font-sans text-xl sm:text-2xl font-medium pb-6 sm:pb-10">
        {vendor?.vendor_name}
      </Typography>
      <div className="flex items-center gap-x-2">
        <IconButton variant="text" onClick={() => updateActiveTabIndex(1)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Typography className="font-inter font-semibold text-lg sm:text-xl">
          {vendor?.cart_items.length} Items in cart
        </Typography>
      </div>
      <hr className="pb-6 sm:pb-8" />
      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-x-4">
        <div className="w-full lg:w-[48%]">
          {vendor?.cart_items.map((item) => (
            <CartProductCard key={item.cart_item_id} product={item} />
          ))}
        </div>
        <CartSummary
          updateActiveTabIndex={updateActiveTabIndex}
          cartItems={cartItems}
        />
      </div>
    </div>
  );
};

export default VendorCartView;
