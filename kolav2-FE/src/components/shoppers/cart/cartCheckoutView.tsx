import { useState } from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import { ArrowLeft } from "@phosphor-icons/react";
import FullCartSummary from "./FullCartSummary";
import CheckoutSlideWrapper from "./checkoutSlideWrapper";

const CartCheckoutView = ({
  updateActiveTabIndex,
}: {
  updateActiveTabIndex: (value: number) => void;
}) => {
  const [activeCheckoutSlideIndex, setActiveCheckoutSlideIndex] = useState(0);

  return (
    <div>
      <div className="flex items-center gap-x-2 border-b border-[#D2D5DA] pb-4">
        <IconButton variant="text" onClick={() => updateActiveTabIndex(1)}>
          <ArrowLeft size={20} />
        </IconButton>
        <Typography className="font-inter font-semibold text-lg sm:text-xl">
          Checkout
        </Typography>
      </div>
      <div className="w-full mt-4 flex flex-col lg:flex-row justify-between gap-4 px-4 sm:px-6">
        <CheckoutSlideWrapper
          activeCheckoutSlideIndex={activeCheckoutSlideIndex}
        />
        <FullCartSummary
          updateActiveTabIndex={updateActiveTabIndex}
          nextIndex={4}
          updateCheckoutSlide={(value: number) =>
            setActiveCheckoutSlideIndex(value)
          }
          activeCheckoutSlideIndex={activeCheckoutSlideIndex}
        />
      </div>
    </div>
  );
};

export default CartCheckoutView;
