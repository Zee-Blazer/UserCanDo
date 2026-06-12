import SelectCustomerSlide from "./slides/selectCustomerSlide";
import SelectSaleTypeSlide from "./slides/selectSaleTypeSlide";
import SelectProductsSlide from "./slides/selectProductsSlide";
import ReviewCartSlide from "./slides/reviewCartSlide";
import OrderInformationSlide from "./slides/orderInformationSlide";
import ConfirmationSlide from "./slides/confirmationSlide";
import SelectOrderType from "./slides/selectOrderType";
import SelecteSupplierType from "./slides/selectSupplierType";
import OrderHistory from "./orderHistory";

export const agentOrderSlides = [
  <OrderHistory key="slide1" />,
  <SelectCustomerSlide key="slide2" />,
  <SelectSaleTypeSlide key="slide3" />,
  <SelectOrderType key="slide4" />,
  <SelecteSupplierType key="slide5" />,
  <SelectProductsSlide key="slide6" />,
  <ReviewCartSlide key="slide7" />,
  <OrderInformationSlide key="slide8" />,
  <ConfirmationSlide key="slide9" />,
];
