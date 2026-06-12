"use client";

import React from "react";
import CheckoutCashOrder from "./checkoutCashOrder";
import CheckoutCreditOrder from "./checkoutCreditOrder";

interface CashOrderData {
  payment_method: string;
  due_date: string;
  region: string;
  town: string;
  street_address: string;
  nearest_landmark: string;
  po_type: string;
}

interface CreditOrderData {
  mark_up: string;
  due_date: string;
  penalty_rate: string;
  region: string;
  town: string;
  street_address: string;
  nearest_landmark: string;
}

interface CheckoutProps {
  cashOrderData: CashOrderData;
  creditOrderData: CreditOrderData;
  updateCashOrderInfo: (field: string, value: string) => void;
  updateCreditOrderInfo: (field: string, value: string) => void;
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<string>>;
}

const tabsData = [{ name: "Cash Order" }, { name: "Credit Order" }];

const AddCheckout = ({
  cashOrderData,
  creditOrderData,
  updateCashOrderInfo,
  updateCreditOrderInfo,
  activeTab,
  setActiveTab,
}: CheckoutProps) => {
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
          checkoutData={cashOrderData}
          updateCheckoutInfo={updateCashOrderInfo}
        />
      )}

      {activeTab === "Credit Order" && (
        <CheckoutCreditOrder
          checkoutData={creditOrderData}
          updateCheckoutInfo={updateCreditOrderInfo}
        />
      )}
    </div>
  );
};

export default AddCheckout;
