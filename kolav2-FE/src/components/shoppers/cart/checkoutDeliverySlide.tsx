import { useState, ChangeEvent, useEffect } from "react";
import { Typography, IconButton } from "@material-tailwind/react";
import { PencilSimple, MapPin } from "@phosphor-icons/react";
import { Navigation } from "lucide-react";
import CheckoutRadioInput from "./checkoutRadioInput";
import { FormInput } from "@/components/General/form";
import { useShopper } from "@/context/shopperContext";

const CheckoutDeliverySlide = () => {
  const [selected, setSelected] = useState("standard_delivery");
  const { checkoutForm, setCheckoutForm } = useShopper();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setSelected(event.target.value);
  }

  useEffect(() => {
    setCheckoutForm({
      ...checkoutForm,
      delivery_method: selected,
    });
  }, [selected]);

  return (
    <div>
      <div>
        <div className="flex items-center justify-between mt-6 sm:mt-8">
          <Typography className="font-semibold text-base sm:text-lg">
            DELIVERY ADDRESS
          </Typography>
          <IconButton variant="text" className="w-4 h-4 sm:w-5 sm:h-5">
            <PencilSimple
              color="#007AF5"
              stroke="2"
              className="w-4 h-4 sm:w-5 sm:h-5"
            />
          </IconButton>
        </div>
        <hr className="border-[#D2D5DA] bg-[#D2D5DA] mt-2 sm:mt-3" />
        <div className="mt-3 sm:mt-4">
          <FormInput
            type="text"
            placeholder="Enter your address"
            className="w-full text-sm sm:text-base"
            icon={<MapPin color="#6D7280" className="w-4 h-4 sm:w-5 sm:h-5" />}
            iconPosition="left"
            value={checkoutForm.delivery_address}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCheckoutForm({
                ...checkoutForm,
                delivery_address: e.target.value,
              })
            }
            required
          />
        </div>
        <button className="flex items-center text-blue_pry text-xs sm:text-sm font-semibold gap-1 sm:gap-2 mt-2 sm:mt-3 pl-4 sm:pl-6">
          <span>Use my current location</span>
          <Navigation size={18} color="#007AF5" />
        </button>
      </div>

      <div className="pt-6 sm:pt-10">
        <Typography className="font-semibold text-base sm:text-lg">
          DELIVERY METHOD
        </Typography>
        <hr className="border-[#D2D5DA] bg-[#D2D5DA] mt-2 sm:mt-3" />
        <div className="mt-3 sm:mt-4 flex flex-col gap-y-3 sm:gap-y-4">
          <div>
            <label className="flex items-center cursor-pointer">
              <CheckoutRadioInput
                value="standard_delivery"
                selected={selected}
                onChange={handleChange}
              />
              <span className="ml-2 mb-[0.5px] text-[#474A4E] font-semibold text-xs sm:text-sm">
                Standard delivery
              </span>
              <span className="ml-2 text-[#A855F7] font-semibold text-xs">
                + GHS 0.00
              </span>
            </label>
            <Typography className="text-[#6D7280] ml-6 text-xs sm:text-sm">
              Your items are delivered between 10 to 15 days, after payment has
              been confirmed.
            </Typography>
          </div>

          <div>
            <label className="flex items-center cursor-pointer">
              <CheckoutRadioInput
                value="express_delivery"
                selected={selected}
                onChange={handleChange}
              />
              <span className="ml-2 mb-[0.5px] text-[#474A4E] font-semibold text-xs sm:text-sm">
                Express delivery
              </span>
              <span className="ml-2 text-[#A855F7] font-semibold text-xs">
                + GHS 0.00
              </span>
            </label>
            <Typography className="text-[#6D7280] ml-6 text-xs sm:text-sm">
              Your items are delivered between 10 to 15 days, after payment has
              been confirmed.
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutDeliverySlide;
