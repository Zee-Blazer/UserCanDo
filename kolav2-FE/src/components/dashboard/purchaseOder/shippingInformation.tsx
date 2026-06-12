import { FormInput, PhoneInputComponent } from "@/components/General/form";
import React from "react";

interface ShippingInformationProps {
  shippingData: ShippingData;
  updateShippingInfo: (field: string, value: string) => void;
}

const ShippingInformation = ({
  shippingData,
  updateShippingInfo,
}: ShippingInformationProps) => {
  const handleInputChange = (field: string, value: string) => {
    updateShippingInfo(field, value);
  };

  return (
    <main>
      <div className="grid grid-cols-6 w-full gap-4 mt-5 mb-2">
        <div className="col-span-6 md:col-span-2">
          <FormInput
            label="Shipping Method"
            name="shipping_method"
            type="text"
            placeholder="Enter shipping method"
            className="w-full"
            value={shippingData.shipping_method}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("shipping_method", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-6 md:col-span-2">
          <FormInput
            label="Delivery Date"
            type="date"
            name="delivery_date"
            value={shippingData.delivery_date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("delivery_date", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-6 md:col-span-2">
          <FormInput
            label="Street Address"
            type="text"
            name="shipping_street_address"
            placeholder="Enter street address"
            value={shippingData.shipping_street_address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("shipping_street_address", e.target.value)
            }
            required
          />
        </div>

        <div className="col-span-6 md:col-span-2">
          <FormInput
            label="Zip Code"
            name="zip_code"
            placeholder="Enter Zip Code"
            value={shippingData.zip_code}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("zip_code", e.target.value)
            }
            required
          />
        </div>

        <div className="col-span-6 md:col-span-2">
          <FormInput
            label="City"
            name="city"
            placeholder="Enter city"
            value={shippingData.city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleInputChange("city", e.target.value)
            }
            required
          />
        </div>

        <div className="col-span-6 md:col-span-2">
          <PhoneInputComponent
            label="Phone Number"
            value={shippingData.shipping_phone_number}
            setValue={(value: string) =>
              handleInputChange("shipping_phone_number", value)
            }
            required
          />
        </div>
      </div>
    </main>
  );
};

export default ShippingInformation;
