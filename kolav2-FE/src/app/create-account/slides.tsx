import BrandInformationSlide from "@/components/auth/slides/brandInformationSlide";
import BusinessInformation from "@/components/auth/slides/businessInfoSlide";
import BuyerFormFinalSlide from "@/components/auth/slides/buyerFormFinalSlide";
import BuyerFormSlide from "@/components/auth/slides/buyerFormSlide";
import FinalSignUpSlide from "@/components/auth/slides/finalSignUpSlide";
import Slide1Onboard from "@/components/auth/slides/slide1Onboard";
import Slide2PhoneInput from "@/components/auth/slides/slide2PhoneInput";
import Slide3OtpInput from "@/components/auth/slides/slide3OtpInput";
import Slide4PasswordInput from "@/components/auth/slides/slide4PasswordInput";
import Slide5PinInput from "@/components/auth/slides/slide5PinInput";
import Slide6PersonalInformation from "@/components/auth/slides/slide6PersonalInformation";
import Slide7Final from "@/components/auth/slides/slide7Final";
import UploadBusinessLogoSlide from "@/components/auth/slides/uploadBusinessLogoSlide";
import YourLocationSlide from "@/components/auth/slides/yourLocationSlide";
import ConfirmationSlide from "@/components/shoppers/sales/slides/confirmationSlide";
import ReviewCartSlide from "@/components/shoppers/sales/slides/reviewCartSlide";
import SelectAgentSlide from "@/components/shoppers/sales/slides/selectAgentSlide";
import SelectCustomerSlide from "@/components/shoppers/sales/slides/selectCustomerSlide";
import SelectPaymentMethodSlide from "@/components/shoppers/sales/slides/selectPaymentMethodSlide";
import SelectProductsSlide from "@/components/shoppers/sales/slides/selectProductsSlide";
import SelectSaleTypeSlide from "@/components/shoppers/sales/slides/selectSaleTypeSlide";
import CreditLimitSlide1 from "@/components/dashboard/suppliersTerm/slides/creditLimit/creditLimitSlide1";
import CreditLimitSlide2 from "@/components/dashboard/suppliersTerm/slides/creditLimit/creditLimitSlide2";
import CreditLimitSlide3 from "@/components/dashboard/suppliersTerm/slides/creditLimit/creditLimitSlide3";

export const slides = [
  <Slide1Onboard key="slide1" />,
  <Slide2PhoneInput key="slide2" />,
  <Slide3OtpInput key="slide3" />,
  <Slide4PasswordInput key="slide4" />,
  <Slide5PinInput key="slide5" />,
  <Slide6PersonalInformation key="slide6" />,
  <Slide7Final key="slide7" />,
];

export const buyerSlides = [
  <Slide1Onboard key="slide1" />,
  <BuyerFormSlide key="slide2" />,
  <BuyerFormFinalSlide key="slide3" />,
];

export const slides2 = [
  <BusinessInformation key="slide1" />,
  <BrandInformationSlide key="slide2" />,
  <YourLocationSlide key="slide3" />,
  <UploadBusinessLogoSlide key="slide4" />,
  <FinalSignUpSlide key="slide5" />,
];

export const shopperSaleSlides = [
  <SelectAgentSlide key="slide1" />,
  <SelectSaleTypeSlide key="slide2" />,
  <SelectPaymentMethodSlide key="slide3" />,
  <SelectCustomerSlide key="slide4" />,
  <SelectProductsSlide key="slide5" />,
  <ReviewCartSlide key="slide6" />,
  <ConfirmationSlide key="slide7" />,
];

export const creditLimitAssessmentSlides = [
  <CreditLimitSlide1 key="slide1" />,
  <CreditLimitSlide2 key="slide2" />,
  <CreditLimitSlide3 key="slide3" />,
];
