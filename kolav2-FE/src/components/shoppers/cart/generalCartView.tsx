import { Typography } from "@material-tailwind/react";
import { VendorCart } from "@/types/shopper";
import CartSummary from "./cartSummary";
import CartProductCard from "./cartProductCard";

interface GeneralCartViewProps {
  updateActiveTabIndex: (value: number) => void;
  cartItems: VendorCart[];
  onSelectVendor?: (vendorName: string) => void;
}

const GeneralCartView = ({
  updateActiveTabIndex,
  cartItems,
}: GeneralCartViewProps) => {
  const totalItems = cartItems.reduce(
    (total, vendor) => total + vendor.cart_items?.length,
    0
  );

  return (
    <div className="px-4 sm:px-0">
      <Typography className="font-sans text-xl sm:text-2xl font-medium pb-6 sm:pb-10">
        Shopping Cart
      </Typography>
      <div className="flex items-center gap-x-2">
        <Typography className="font-inter font-semibold text-lg sm:text-xl">
          {totalItems} Items in cart
        </Typography>
      </div>
      <hr className="pb-6 sm:pb-8" />

      <div className="w-full flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-x-4">
        <div className="w-full lg:w-[48%]">
          {cartItems?.map((vendor) => (
            <div key={vendor?.vendor_name} className="mb-8">
              <Typography className="font-sans text-lg font-semibold mb-4 text-[#474A4E] border-b pb-2">
                {vendor.vendor_name}
              </Typography>

              {vendor.cart_items?.map((item) => (
                <CartProductCard key={item?.cart_item_id} product={item} />
              ))}
            </div>
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

export default GeneralCartView;
