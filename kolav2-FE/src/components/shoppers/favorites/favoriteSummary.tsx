import { Typography, Button } from "@material-tailwind/react";
import { VendorCart } from "@/types/shopper";

interface FavoriteSummaryProps {
  updateActiveTabIndex: (value: number) => void;
  favoriteItems: VendorCart[];
}

const FavoriteSummary = ({
  updateActiveTabIndex,
  favoriteItems = [],
}: FavoriteSummaryProps) => {
  const calculateSubtotal = () => {
    return favoriteItems.reduce((total, vendor) => {
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
  const formattedSubtotal = subtotal.toFixed(2);

  return (
    <div className="border border-[#EDEEF0] p-4 sm:p-6 rounded-3xl w-full lg:w-[43%] h-auto min-h-[200px] max-h-[270px]">
      <Typography className="font-sans text-lg sm:text-xl font-semibold text-[#5A5555] pb-6 sm:pb-10">
        Item Summary
      </Typography>
      <div className="flex items-center justify-between mb-3">
        <Typography className="font-medium text-[#5A5555] text-sm sm:text-base">
          Sub-total
        </Typography>
        <Typography className="text-[#B87C16] text-lg sm:text-2xl font-semibold">
          GHS {formattedSubtotal}
        </Typography>
      </div>
      <div>
        <Typography className="font-medium text-[#5A5555] text-sm sm:text-base">
          Delivery Fees not included yet
        </Typography>
      </div>
      <Button
        className="bg-blue_pry w-full normal-case mt-4 sm:mt-6 font-semibold flex items-center justify-center gap-4 text-sm sm:text-base disabled:text-[#474A4E]"
        onClick={() => updateActiveTabIndex(3)}
      >
        <Typography className="normal-case font-semibold">
          Check Out <span>GHS {formattedSubtotal}</span>
        </Typography>
      </Button>
    </div>
  );
};

export default FavoriteSummary;
