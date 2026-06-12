import { Typography, Button } from "@material-tailwind/react";
import Image from "next/image";
import defaultImage from "@/assets/images/deal1.png";
import { useShopper } from "@/context/shopperContext";
import { useAuthSelector, useShopperSelector } from "@/Redux/selectors";
import LoginDialog from "@/components/auth/LoginDialog";
import { useState } from "react";
import AuthProvider from "@/context/authContext";

const FavoriteCartSummary = ({
  updateActiveTabIndex,
  nextIndex,
  updateCheckoutSlide,
  activeCheckoutSlideIndex,
}: {
  updateActiveTabIndex: (value: number) => void;
  nextIndex: number;
  updateCheckoutSlide: (value: number) => void;
  activeCheckoutSlideIndex: number;
}) => {
  const { checkoutForm, checkout, isCheckingOut } = useShopper();
  const { favouriteItems } = useShopperSelector();
  const { isLoggedIn } = useAuthSelector();
  const [isLoginModalShown, setIsLoginModalShown] = useState(false);

  const handleContinue = async () => {
    if (activeCheckoutSlideIndex >= 2) {
      if (isLoggedIn) {
        const cartId = localStorage.getItem("favorite_id") || "";
        await checkout(cartId, (data) => {
          if (data.is_success && checkoutForm.payment_option === "pay_now") {
            const checkoutDirectUrl = data.payload.data.checkoutDirectUrl;
            if (checkoutDirectUrl) {
              window.location.href = checkoutDirectUrl;
            }
          } else if (data.is_success) {
            updateActiveTabIndex(nextIndex);
          }
        });
      } else {
        setIsLoginModalShown(true);
      }
    } else {
      updateCheckoutSlide(activeCheckoutSlideIndex + 1);
    }
  };

  const calculateSubtotal = () => {
    return favouriteItems.reduce((total, vendor) => {
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

  const isStepOneDisabled =
    activeCheckoutSlideIndex === 0 &&
    (checkoutForm.delivery_address === "" ||
      checkoutForm.delivery_method === "");

  const isStepTwoDisabled =
    activeCheckoutSlideIndex === 1 && checkoutForm.payment_method === "";

  const isStepThreeDisabled = false;

  return (
    <AuthProvider>
      <div className="border border-1 border-[#EDEEF0] p-6 rounded-2xl lg:w-[48%]">
        <div className="flex items-center justify-between pb-5 ">
          <Typography className="font-sans text-xl font-medium text-[#5A5555]">
            Item Summary{" "}
          </Typography>
          <Button
            variant="text"
            onClick={() => updateActiveTabIndex(1)}
            className="normal-case text-[#095ED5] font-semibold"
          >
            Edit
          </Button>
        </div>

        {favouriteItems.map((vendor, vendorIndex) => (
          <div key={`vendor-${vendor.vendor_id}-${vendorIndex}`}>
            {vendor.cart_items.map((item, itemIndex) => (
              <div
                key={`item-${item.cart_item_id}-${vendorIndex}-${itemIndex}`}
                className="flex items-center gap-4 py-4"
              >
                <Image
                  src={item.product_image || defaultImage}
                  width={64}
                  height={64}
                  alt={item.product_name}
                  className="object-cover rounded-lg"
                />
                <div className="flex flex-col">
                  <Typography className="text-[#474A4E] font-semibold">
                    {item.product_name}{" "}
                    {item.product_description && (
                      <span className="font-normal text-sm">
                        {item.product_description}
                      </span>
                    )}
                  </Typography>

                  <Typography className="text-sm pb-1">
                    {item.product_category}
                  </Typography>
                  <Typography className="font-semibold text-[#6D7280] text-sm pb-1">
                    {item.product_weight}
                    {item.product_weight_type}
                    {item.product_package_type &&
                      ` (${item.product_package_type})`}
                  </Typography>
                  <Typography className="text-[#B87C16] text-md font-bold">
                    GHS {parseFloat(item.product_price_per_piece).toFixed(2)}
                  </Typography>
                </div>
                <div className="gap-y-4 border-l-2 px-3 border-r-2 border-[#F1F1F1] self-end flex">
                  <Typography className="font-semibold text-[#474A4E]">
                    {item.quantity} {item.quantity > 1 ? "Pieces" : "Piece"}
                  </Typography>
                </div>
              </div>
            ))}
          </div>
        ))}

        <div className="flex flex-col gap-y-2 border border-1 border-[#E0F0FF] p-4 rounded-xl mt-4">
          <div className="flex justify-between">
            <Typography className="font-normal text-[#474A4E] text-md">
              Item subtotal
            </Typography>
            <Typography className="text-[#6D7280] font-semibold">
              GHS {subtotal.toFixed(2)}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography className="font-normal text-md">
              Delivery Fee
            </Typography>
            <Typography className="text-[#6D7280] font-semibold">
              GHS {deliveryFee.toFixed(2)}
            </Typography>
          </div>
          <div className="flex justify-between">
            <Typography className="text-sm font-bold">Total</Typography>
            <Typography className="text-[#B87C16] text-lg font-bold">
              GHS {total.toFixed(2)}
            </Typography>
          </div>
        </div>
        <Button
          className={`bg-blue_pry w-full normal-case mt-4 font-semibold flex items-center justify-center gap-4 disabled:text-[#474A4E]`}
          onClick={handleContinue}
          disabled={
            isStepOneDisabled ||
            isStepTwoDisabled ||
            isStepThreeDisabled ||
            isCheckingOut
          }
          loading={isCheckingOut}
        >
          <Typography className="normal-case font-semibold">
            Continue
          </Typography>
        </Button>

        <LoginDialog
          open={isLoginModalShown}
          onClose={() => setIsLoginModalShown(false)}
          callback={() => {
            checkout(localStorage.getItem("cart_id") || "");
          }}
        />
      </div>
    </AuthProvider>
  );
};

export default FavoriteCartSummary;
