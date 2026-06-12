import { useState, ChangeEvent } from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import CheckoutRadioInput from "./checkoutRadioInput";
import { Info, CaretDown, CaretUp } from "@phosphor-icons/react";
import { useShopper } from "@/context/shopperContext";

const CheckoutPaymentSlide = () => {
  const { checkoutForm, setCheckoutForm } = useShopper();
  const [isTwoWeeksOpen, setIsTwoWeeksOpen] = useState(false);
  const [isFourWeeksOpen, setIsFourWeeksOpen] = useState(false);

  function handleChange(event: ChangeEvent<HTMLInputElement>, field?: string) {
    switch (field) {
      case "pay_now":
        setCheckoutForm({
          ...checkoutForm,
          payment_option: "pay_now",
          pay_later_weekly_option: "",
          payment_method: "pay_now",
        });
        break;
      case "twoWeeks":
        setCheckoutForm({
          ...checkoutForm,
          payment_option: "pay_later_2_weeks",
          pay_later_weekly_option: event.target.value,
          payment_method: "pay_later",
        });
        break;
      case "fourWeeks":
        setCheckoutForm({
          ...checkoutForm,
          payment_option: "pay_later_4_weeks",
          pay_later_weekly_option: event.target.value,
          payment_method: "pay_later",
        });
        break;
      case "pay_on_delivery":
        setCheckoutForm({
          ...checkoutForm,
          payment_option: "pay_on_delivery",
          pay_later_weekly_option: "",
          payment_method: "pay_on_delivery",
        });
        break;
      default:
        setCheckoutForm({
          ...checkoutForm,
          payment_option: event.target.value,
          pay_later_weekly_option: "",
          payment_method: "",
        });
    }
  }

  const pay_later_options = [
    {
      title: "Pay 50% instalment each week",
      slug: "pay_50_percent_each_week",
    },
  ];

  const pay_later_4_weeks_options = [
    {
      title: "Pay 25% instalment each week",
      slug: "pay_25_percent_each_week",
    },
  ];

  const isWeeklyOptionSelected = (
    optionValue: string,
    paymentDuration: string
  ): boolean => {
    return (
      checkoutForm.payment_option === paymentDuration &&
      checkoutForm.pay_later_weekly_option === optionValue
    );
  };

  return (
    <div className="mt-3 sm:mt-4 ">
      <Typography className="font-semibold text-base sm:text-lg">
        PAYMENT OPTIONS
      </Typography>
      <hr className="border-[#D2D5DA] bg-[#D2D5DA] mt-2 sm:mt-3 mb-3 sm:mb-4" />

      <div className="flex flex-col gap-y-2 sm:gap-y-3">
        <label
          className={`flex justify-between items-start p-2 sm:p-3 rounded-lg border border-1 ${
            checkoutForm.payment_option === "pay_now"
              ? "bg-[#FEFAF4] border-[#FFD68F]"
              : "bg-[#F9FAFB] border-[#F1F1F1]"
          }`}
        >
          <div>
            <Typography className="text-xs sm:text-sm font-semibold">
              Pay Now
              <span className="text-xs font-semibold text-[#A855F7] ml-1 sm:ml-2">
                1% discount per box
              </span>
            </Typography>
            <Typography className="text-[#6D7280] text-xs sm:text-sm">
              Guaranteed 3-day delivery
            </Typography>
          </div>
          <CheckoutRadioInput
            value="pay_now"
            selected={checkoutForm.payment_option}
            onChange={(event) => handleChange(event, "pay_now")}
          />
        </label>

        <label
          className={`flex justify-between items-start p-2 sm:p-3 rounded-lg border border-1 ${
            checkoutForm.payment_option === "pay_on_delivery"
              ? "bg-[#FEFAF4] border-[#FFD68F]"
              : "bg-[#F9FAFB] border-[#F1F1F1]"
          }`}
        >
          <div>
            <Typography className="text-xs sm:text-sm font-semibold">
              Pay on delivery
            </Typography>
            <Typography className="text-[#6D7280] text-xs sm:text-sm">
              Standard pricing
            </Typography>
          </div>
          <CheckoutRadioInput
            value="pay_on_delivery"
            selected={checkoutForm.payment_option}
            onChange={(event) => handleChange(event, "pay_on_delivery")}
          />
        </label>

        <div className="flex flex-col gap-y-2 sm:gap-y-3">
          <Typography className="text-xs sm:text-sm font-semibold text-[#474A4E]">
            PAY LATER
          </Typography>

          <div
            className={`${
              checkoutForm.payment_option === "pay_later_2_weeks"
                ? "bg-[#FEFAF4] border-[#FFD68F]"
                : "bg-[#F9FAFB]"
            } px-2 sm:px-3 py-4 sm:py-5 rounded-lg`}
          >
            <div
              className="flex items-center justify-between"
              onClick={() => {
                setIsTwoWeeksOpen(!isTwoWeeksOpen);
              }}
            >
              <div className="flex items-center gap-x-1 sm:gap-x-2">
                <Typography className="font-semibold text-xs sm:text-sm">
                  Pay over 2 weeks
                </Typography>
                <IconButton variant="text" className="p-1">
                  <Info size={17} color="#99CCFF" />
                </IconButton>
              </div>
              <IconButton variant="text" className="p-1">
                {isTwoWeeksOpen ? (
                  <CaretUp color="#6D7280" size={20} />
                ) : (
                  <CaretDown color="#6D7280" size={20} />
                )}
              </IconButton>
            </div>
            {isTwoWeeksOpen && (
              <div className="pt-3 sm:pt-4 flex flex-col gap-y-3 sm:gap-y-4">
                {pay_later_options.map((option, index) => (
                  <label
                    key={index}
                    className="flex justify-between pr-2 sm:pr-3"
                  >
                    <Typography className="font-semibold text-xs sm:text-sm text-[#474A4E]">
                      {option.title}
                    </Typography>
                    <CheckoutRadioInput
                      selected={
                        isWeeklyOptionSelected(option.slug, "pay_later_2_weeks")
                          ? option.slug
                          : ""
                      }
                      onChange={(event) => {
                        handleChange(event, "twoWeeks");
                      }}
                      value={option.slug}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>

          <div
            className={`${
              checkoutForm.payment_option === "pay_later_4_weeks"
                ? "bg-[#FEFAF4] border-[#FFD68F]"
                : "bg-[#F9FAFB]"
            } px-2 sm:px-3 py-4 sm:py-5 rounded-lg`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-1 sm:gap-x-2">
                <Typography className="font-semibold text-xs sm:text-sm">
                  Pay over 4 weeks
                </Typography>
                <IconButton variant="text" className="p-1">
                  <Info size={14} color="#99CCFF" />
                </IconButton>
              </div>
              <IconButton
                variant="text"
                className="p-1"
                onClick={() => {
                  setIsFourWeeksOpen(!isFourWeeksOpen);
                }}
              >
                {isFourWeeksOpen ? (
                  <CaretUp color="#6D7280" size={20} />
                ) : (
                  <CaretDown color="#6D7280" size={20} />
                )}
              </IconButton>
            </div>
            {isFourWeeksOpen && (
              <div className="pt-3 sm:pt-4 flex flex-col gap-y-3 sm:gap-y-4">
                {pay_later_4_weeks_options.map((option, index) => (
                  <label
                    key={index}
                    className="flex justify-between pr-2 sm:pr-3"
                  >
                    <Typography className="font-semibold text-xs sm:text-sm text-[#474A4E]">
                      {option.title}
                    </Typography>
                    <CheckoutRadioInput
                      selected={
                        isWeeklyOptionSelected(option.slug, "pay_later_4_weeks")
                          ? option.slug
                          : ""
                      }
                      onChange={(event) => {
                        handleChange(event, "fourWeeks");
                      }}
                      value={option.slug}
                    />
                  </label>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPaymentSlide;
