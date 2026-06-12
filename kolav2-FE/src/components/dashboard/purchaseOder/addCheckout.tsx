"use client";

import React, { useState } from "react";
import CheckoutCashOrder from "./checkoutCashOrder";
import CheckoutCreditOrder from "./checkoutCreditOrder";

interface CheckoutProps {
  checkoutData: {
    payment_method: string;
    po_type: string;
    due_date: string;
  };
  updateCheckoutInfo: (field: string, value: string) => void;
}

const tabsData = [{ name: "Cash Order" }, { name: "Credit Order" }];

const AddCheckout = ({ checkoutData, updateCheckoutInfo }: CheckoutProps) => {
  const [activeTab, setActiveTab] = useState("Cash Order");

  return (
    <div className="mt-10 mb-2">
      <div className="border-b border-gray-200">
        <div className="overflow-x-auto pb-1">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            {tabsData.map((tab) => (
              <button
                key={tab.name}
                onClick={() => setActiveTab(tab.name)}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium focus:outline-none text-sm ${
                  activeTab === tab.name
                    ? "border-[#F5AA29]"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {activeTab === "Cash Order" && (
        <CheckoutCashOrder
          checkoutData={checkoutData}
          updateCheckoutInfo={updateCheckoutInfo}
        />
      )}

      {activeTab === "Credit Order" && (
        <CheckoutCreditOrder
          checkoutData={checkoutData}
          updateCheckoutInfo={updateCheckoutInfo}
        />
      )}
    </div>
  );
};

export default AddCheckout;
