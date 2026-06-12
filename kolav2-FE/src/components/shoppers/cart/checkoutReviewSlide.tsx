import { Typography } from "@material-tailwind/react";
import { useShopper } from "@/context/shopperContext";
import { useShopperSelector } from "@/Redux/selectors";

const CheckoutReviewSlide = () => {
  const { checkoutForm } = useShopper();
  const { cartItems } = useShopperSelector();

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
  const deliveryFee = 25.8;
  const total = subtotal + deliveryFee;

  const formatPaymentText = (text: string) => {
    const words = text.split("_");
    return words
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const renderPaymentOption = () => {
    switch (checkoutForm.payment_option) {
      case "pay_now":
        return "Pay Now";
      case "pay_on_delivery":
        return "Pay on Delivery";
      case "pay_later_2_weeks":
        return `Pay Later (2 Weeks) ${
          checkoutForm.pay_later_weekly_option
            ? `- ${formatPaymentText(checkoutForm.pay_later_weekly_option)}`
            : ""
        }`;
      case "pay_later_4_weeks":
        return `Pay Later (4 Weeks) ${
          checkoutForm.pay_later_weekly_option
            ? `- ${formatPaymentText(checkoutForm.pay_later_weekly_option)}`
            : ""
        }`;
      default:
        return formatPaymentText(checkoutForm.payment_option);
    }
  };

  const renderPaymentMethod = () => {
    switch (checkoutForm.payment_method) {
      case "visa_card":
        return "Visa Card";
      case "master_card":
        return "Master Card";
      case "bank_transfer":
        return "Bank Transfer";
      case "cash":
        return "Cash";
      default:
        return formatPaymentText(checkoutForm.payment_method);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pt-6 sm:pt-8">
        <Typography className="font-semibold text-base sm:text-lg">
          ORDER COST
        </Typography>
      </div>
      <hr className="border-[#D2D5DA] bg-[#D2D5DA] mt-2 sm:mt-3 mb-3 sm:mb-4" />
      <div className="flex flex-col gap-y-1 sm:gap-y-2">
        <div className="flex justify-between">
          <Typography className="font-inter text-xs sm:text-sm">
            Item subtotal
          </Typography>
          <Typography className="text-[#6D7280] font-semibold text-xs sm:text-sm">
            GHS {subtotal.toFixed(2)}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="font-inter text-xs sm:text-sm">
            Delivery Fee
          </Typography>
          <Typography className="text-[#6D7280] font-semibold text-xs sm:text-sm">
            GHS {deliveryFee.toFixed(2)}
          </Typography>
        </div>
        <div className="flex justify-between">
          <Typography className="font-inter text-xs sm:text-sm font-bold">
            Total
          </Typography>
          <Typography className="text-[#B87C16] text-base sm:text-lg font-bold">
            GHS {total.toFixed(2)}
          </Typography>
        </div>
      </div>

      <div className="flex justify-between items-center pt-6 sm:pt-8">
        <Typography className="font-semibold text-base sm:text-lg">
          DELIVERY ADDRESS
        </Typography>
      </div>
      <hr className="border-[#D2D5DA] bg-[#D2D5DA] mt-2 sm:mt-3 mb-3 sm:mb-4" />
      <Typography className="font-inter text-[#6D7280] text-xs sm:text-sm">
        {checkoutForm.delivery_address}
      </Typography>
      <Typography className="font-inter text-[#6D7280] text-xs sm:text-sm mt-1 sm:mt-2">
        Delivery Method:{" "}
        {checkoutForm.delivery_method === "standard_delivery"
          ? "Standard Delivery"
          : "Express Delivery"}
      </Typography>

      <div className="flex justify-between items-center pt-6 sm:pt-8">
        <Typography className="font-semibold text-base sm:text-lg">
          PAYMENT DETAILS
        </Typography>
      </div>
      <hr className="border-[#D2D5DA] bg-[#D2D5DA] mt-2 sm:mt-3 mb-3 sm:mb-4" />
      <Typography className="font-inter text-[#6D7280] text-xs sm:text-sm mb-3 sm:mb-4">
        Payment Option: {renderPaymentOption()}
      </Typography>
      <Typography className="font-inter text-[#6D7280] text-xs sm:text-sm mb-3 sm:mb-4">
        Payment Method: {renderPaymentMethod()}
      </Typography>
    </div>
  );
};

export default CheckoutReviewSlide;
