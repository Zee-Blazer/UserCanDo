import CheckoutStageView from "./checkoutStageView";
import CheckoutDeliverySlide from "./checkoutDeliverySlide";
import CheckoutPaymentSlide from "./checkoutPaymentSlide";
import CheckoutReviewSlide from "./checkoutReviewSlide";

const CheckoutSlideWrapper = ({
  activeCheckoutSlideIndex,
}: {
  activeCheckoutSlideIndex: number;
}) => {
  return (
    <div className="w-full lg:w-[48%]">
      <CheckoutStageView activeCheckoutSlideIndex={activeCheckoutSlideIndex} />
      <div>
        {activeCheckoutSlideIndex === 0 && <CheckoutDeliverySlide />}
        {activeCheckoutSlideIndex === 1 && <CheckoutPaymentSlide />}
        {activeCheckoutSlideIndex === 2 && <CheckoutReviewSlide />}
      </div>
    </div>
  );
};

export default CheckoutSlideWrapper;
