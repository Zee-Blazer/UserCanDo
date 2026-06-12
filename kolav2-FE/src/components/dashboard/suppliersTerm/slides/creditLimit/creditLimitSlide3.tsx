import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import { useAuth } from "@/context/authContext";
import React from "react";

const CreditLimitSlide3 = () => {
  const {
    prevCreditLimitSlide,
    creditLimitFormInputs,
    setCreditLimitFormInputs,
    handleCreditLimitFormInputChange,
  } = useAuth();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        {/* Sales Seasonality */}
        <div className="mb-4">
          <FormSelect
            label="Sales Seasonality"
            options={creditLimitDropdownOptions.sales_seasonality}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.sales_seasonality}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        {/* Supplier Payment Behavior */}
        <div className="mb-4">
          <FormSelect
            label="Supplier Payment Behavior"
            options={creditLimitDropdownOptions.supplier_payment_behavior}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.supplier_payment_behavior}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Shop Ownership */}
        <div className="mb-4">
          <FormSelect
            label="Shop Ownership"
            options={creditLimitDropdownOptions.shop_ownership}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.shop_ownership}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        {/* Length of Time in Current Location */}
        <div className="mb-4">
          <FormSelect
            label="Length of Time in Current Location"
            options={
              creditLimitDropdownOptions.length_of_time_in_current_location
            }
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.length_of_time_in_current_location}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Operating Days Per Week */}
        <div className="mb-4">
          <FormSelect
            label="Operating Days Per Week"
            options={creditLimitDropdownOptions.operating_days_per_week}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.operating_days_per_week}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        {/* Number of Dependents */}
        <div className="mb-4">
          <FormSelect
            label="Number of Dependents"
            options={creditLimitDropdownOptions.number_of_dependents}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.number_of_dependents}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 gap-8">
        <button
          type="button"
          onClick={prevCreditLimitSlide}
          className="bg-white text-pry2 normal-case font-normal text-sm px-8 py-3 rounded-lg border border-pry2 shadow-sm flex items-center gap-2"
        >
          Back
        </button>
        <button
          type="button"
          // onClick={handleNext}
          className="bg-pry2 normal-case text-white font-normal text-sm px-8 py-3 rounded-lg shadow-sm"
        >
          Check credit limit
        </button>
      </div>
    </>
  );
};

export default CreditLimitSlide3;
