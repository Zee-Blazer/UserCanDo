import { X, CreditCard, Wallet, Plus } from "@phosphor-icons/react";
import { useState, ChangeEvent } from "react";
import Image from "next/image";
import visaIcon from "@/assets/images/visaIcon.png";
import phoneOutline from "@/assets/images/phone_outline.svg";
import CheckoutRadioInput from "@/components/shoppers/cart/checkoutRadioInput";
import { Typography, Button } from "@material-tailwind/react";

interface PaymentMethodListProps {
  nextSlide: () => void;
}

const PaymentMethodList = ({ nextSlide }: PaymentMethodListProps) => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelectedPaymentMethod(event.target.value);
  }

  return (
    <div className="mx-5 border border-1 border-[#F1F1F1] rounded-lg">
      <Typography className="p-4 font-semibold text-[#0D121D]">
        SELECT METHOD/CARD
      </Typography>
      <hr className="border border-1 border-[#F1F1F1] border-opacity-40 mb-4" />
      <div className="px-4 pb-4">
        <Typography className="font-semibold text sm pb-2 text-[#474A4E]">
          Pay with card
        </Typography>
        <div className="flex flex-col gap-y-3">
          <label
            className={`flex justify-between items-start  p-3 rounded-lg border border-1 ${
              selectedPaymentMethod === "visa_card_one"
                ? "bg-[#FEFAF4] border-[#FFD68F]"
                : "bg-[#F9FAFB] border-[#F1F1F1]"
            }`}
          >
            <div>
              <div className="flex gap-x-2 items-start pb-2">
                <CreditCard />
                <Typography className="text-sm font-semibold text-[#0D121D]">
                  Visa card
                </Typography>
                <Image src={visaIcon} alt="Visa Icon" width={20} height={16} />
              </div>
              <Typography className="text-[#6D7280]  text-sm ml-6">
                **** **** **** 1234
              </Typography>
            </div>
            <CheckoutRadioInput
              value="visa_card_one"
              selected={selectedPaymentMethod}
              onChange={handleChange}
            />
          </label>
          <Button
            variant="text"
            className="px-0 normal-case flex items-center gap-x-2"
            onClick={nextSlide}
          >
            <Plus color="#007AF5" size={20} />{" "}
            <Typography className="text-[#007AF5] font-semibold text-sm">
              Add new card
            </Typography>
          </Button>
        </div>

        <Typography className="font-semibold text sm pb-2 pt-4">
          Others
        </Typography>
        <div className="flex flex-col gap-y-3">
          <label
            className={`flex justify-between items-start  p-3 rounded-lg border border-1 ${
              selectedPaymentMethod === "mobile_money"
                ? "bg-[#FEFAF4] border-[#FFD68F]"
                : "bg-[#F9FAFB] border-[#F1F1F1]"
            }`}
          >
            <div>
              <div className="flex gap-x-2 items-start pb-2">
                <Image
                  src={phoneOutline}
                  alt="phone outine"
                  width={12}
                  height={17}
                />
                <Typography className="text-sm font-semibold text-[#0D121D] ">
                  Mobile Money
                </Typography>
              </div>
              <Typography className="text-[#6D7280]  text-xs font-semibold ml-5">
                Pay with mobile money
              </Typography>
            </div>
            <CheckoutRadioInput
              value="mobile_money"
              selected={selectedPaymentMethod}
              onChange={handleChange}
            />
          </label>

          <label
            className={`flex justify-between items-start  p-3 rounded-lg border border-1 ${
              selectedPaymentMethod === "pay_cash"
                ? "bg-[#FEFAF4] border-[#FFD68F]"
                : "bg-[#F9FAFB] border-[#F1F1F1]"
            }`}
          >
            <div>
              <div className="flex gap-x-2 items-start pb-2">
                <Wallet size={20} />
                <Typography className="text-sm font-semibold ">Cash</Typography>
              </div>
              <Typography className="text-[#6D7280]  text-xs font-semibold ml-7">
                Pay cash on delivery
              </Typography>
            </div>
            <CheckoutRadioInput
              value="pay_cash"
              selected={selectedPaymentMethod}
              onChange={handleChange}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodList;
