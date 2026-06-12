"use client";

import React, { useEffect, useState } from "react";
import { FormSelect, FormInput } from "@/components/General/form";

interface CreditOrderData {
  mark_up: string;
  due_date: string;
  penalty_rate: string;
  region: string;
  town: string;
  street_address: string;
  nearest_landmark: string;
}

interface CheckoutCreditOrderProps {
  checkoutData: CreditOrderData;
  updateCheckoutInfo: (field: string, value: string) => void;
}

const CheckoutCreditOrder = ({
  checkoutData,
  updateCheckoutInfo,
}: CheckoutCreditOrderProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setIsVisible(true), 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div
      className={`transition-all duration-500 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
      }`}
    >
      <section className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-12 md:col-span-4">
          <FormInput
            label="Payment Due Date"
            name="due_date"
            type="date"
            value={checkoutData.due_date}
            onChange={(e: any) =>
              updateCheckoutInfo("due_date", e.target.value)
            }
            required
          />
        </div>

        <div className="col-span-12 md:col-span-4">
          <FormSelect
            label="Mark up"
            type="text"
            placeholder="Select payment option"
            options={["cash", "transfer"]}
            required
            name="mark_up"
            value={checkoutData.mark_up}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheckoutInfo("mark_up", e.target.value)
            }
          />
        </div>

        <div className="col-span-12 md:col-span-4">
          <FormInput
            label="Penalty Rate"
            type="text"
            placeholder="Specify Penalty Rate"
            required
            name="penalty_rate"
            value={checkoutData.penalty_rate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheckoutInfo("penalty_rate", e.target.value)
            }
          />
        </div>
      </section>

      <section className="grid grid-cols-12 gap-4 mt-6">
        <div className="col-span-12 md:col-span-3">
          <FormInput
            label="Region"
            placeholder="Enter Region"
            value={checkoutData.region}
            name="region"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheckoutInfo("region", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <FormInput
            label="Town"
            name="town"
            placeholder="e.g Kumasi"
            value={checkoutData.town}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheckoutInfo("town", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <FormInput
            label="Street Address"
            name="street_address"
            placeholder="Enter Street Address"
            value={checkoutData.street_address}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheckoutInfo("street_address", e.target.value)
            }
            required
          />
        </div>
        <div className="col-span-12 md:col-span-3">
          <FormInput
            label="Nearest Landmark"
            name="nearest_landmark"
            placeholder="Enter nearest landmark"
            value={checkoutData.nearest_landmark}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheckoutInfo("nearest_landmark", e.target.value)
            }
            required
          />
        </div>
      </section>
    </div>
  );
};

export default CheckoutCreditOrder;
