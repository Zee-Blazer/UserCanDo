import AddSalesRequestHistory from "./slides/addSalesRequestHistory";
import SelectCustomerSalesTypeSlide from "../sales/slides/selectCutomerSalesType";
import SaleTypeSlideSelector from "../sales/slides/selectSalesType";
import SalePaymentMethodSlideSelector from "../sales/slides/selectPaymentMethodSlide";
import SalesProduct from "../sales/slides/salesProduct";
import SalesRequestCheckout from "../sales/slides/salesRequestCheckout";
import SalesConfirmationSlide from "../sales/slides/salesConfirmationSlide";

export const addSalesRequestSlides = [
  <AddSalesRequestHistory key="slide1" />,
  <SelectCustomerSalesTypeSlide key="slide2" />,
  <SaleTypeSlideSelector key="slide3" />,
  <SalePaymentMethodSlideSelector key="slide4" />,
  <SalesProduct key="slide5" />,
  <SalesRequestCheckout key="slide6" />,
  <SalesConfirmationSlide key="slide7" />,
];
