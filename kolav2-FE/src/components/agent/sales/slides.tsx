import SalesRequestHistory from "./slides/requestHistory";
import SelectCustomerSalesTypeSlide from "./slides/selectCutomerSalesType";
import SaleTypeSlideSelector from "./slides/selectSalesType";
import SalePaymentMethodSlideSelector from "./slides/selectPaymentMethodSlide";
import SalesProduct from "./slides/salesProduct";
import SalesRequestCheckout from "./slides/salesRequestCheckout";
import SalesConfirmationSlide from "./slides/salesConfirmationSlide";

export const salesRequestSlides = [
  <SalesRequestHistory key="slide1" />,
  <SelectCustomerSalesTypeSlide key="slide2" />,
  <SaleTypeSlideSelector key="slide3" />,
  <SalePaymentMethodSlideSelector key="slide4" />,
  <SalesProduct key="slide5" />,
  <SalesRequestCheckout key="slide6" />,
  <SalesConfirmationSlide key="slide7" />,
];
