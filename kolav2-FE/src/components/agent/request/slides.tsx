import ConfirmationSlide from "./slides/confirmationSlide";
import Products from "./slides/products";
import RequestCheckout from "./slides/requestCheckout";
import RequestHistory from "./slides/requestHistory";

export const requestSlides = [
  <RequestHistory key="slide1" />,
  <Products key="slide2" />,
  <RequestCheckout key="slide3" />,
  <ConfirmationSlide key="slide4" />,
];
