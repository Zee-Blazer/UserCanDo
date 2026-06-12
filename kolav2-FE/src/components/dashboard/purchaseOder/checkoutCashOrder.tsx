"use client";

import React, { useEffect, useState } from "react";
import { FormSelect, FormInput } from "@/components/General/form";

interface CheckoutCashOrderProps {
  checkoutData: {
    payment_method: string;
    due_date: string;
  };
  updateCheckoutInfo: (field: string, value: string) => void;
}

const CheckoutCashOrder = ({
  checkoutData,
  updateCheckoutInfo,
}: CheckoutCashOrderProps) => {
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
      <div className="grid grid-cols-8 gap-4 mt-6">
        <div className="col-span-8 md:col-span-4">
          <FormSelect
            label="Payment Method"
            name="payment_method"
            options={["cash", "transfer", "credit"]}
            placeholder="Please select"
            value={checkoutData?.payment_method}
            onSelect={(e: any) =>
              updateCheckoutInfo("payment_method", e.target.value)
            }
            required
          />
        </div>

        <div className="col-span-8 md:col-span-4">
          <FormInput
            label="Order Due Date"
            type="date"
            required
            name="due_date"
            value={checkoutData?.due_date}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              updateCheckoutInfo("due_date", e.target.value)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default CheckoutCashOrder;
