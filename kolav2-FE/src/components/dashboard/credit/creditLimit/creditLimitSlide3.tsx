import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import React, { ChangeEvent } from "react";
import { CreditLimitSlideProps } from "./creditLimitSlide1";
import { useDash } from "@/context/dashboardContext";
import { Button } from "@material-tailwind/react";

const CreditLimitSlide3 = ({
  nextSlide,
  prevSlide,
  formData,
  setFormData,
}: CreditLimitSlideProps) => {
  const { isCreditApplicationCreating } = useDash();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.sales_seasonality &&
      formData.supplier_payment_behavior &&
      formData.shop_ownership &&
      formData.length_of_time_in_current_location &&
      formData.operating_days_per_week &&
      formData.number_of_dependents
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Sales Seasonality"
            options={creditLimitDropdownOptions.sales_seasonality}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.sales_seasonality}
            onChange={handleInputChange}
            name="sales_seasonality"
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Supplier Payment Behavior"
            options={creditLimitDropdownOptions.supplier_payment_behavior}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.supplier_payment_behavior}
            onChange={handleInputChange}
            name="supplier_payment_behavior"
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Shop Ownership"
            options={creditLimitDropdownOptions.shop_ownership}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.shop_ownership}
            onChange={handleInputChange}
            name="shop_ownership"
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Length of Time in Current Location"
            options={
              creditLimitDropdownOptions.length_of_time_in_current_location
            }
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.length_of_time_in_current_location}
            onChange={handleInputChange}
            name="length_of_time_in_current_location"
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Operating Days Per Week"
            options={creditLimitDropdownOptions.operating_days_per_week}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.operating_days_per_week}
            onChange={handleInputChange}
            name="operating_days_per_week"
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Number of Dependents"
            options={creditLimitDropdownOptions.number_of_dependents}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.number_of_dependents}
            onChange={handleInputChange}
            name="number_of_dependents"
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="flex justify-end mt-8 gap-8">
        <button
          type="button"
          onClick={prevSlide}
          className="bg-white text-pry2 normal-case font-normal text-sm px-8 py-3 rounded-lg border border-pry2 shadow-sm flex items-center gap-2"
        >
          Back
        </button>
        <Button
          loading={isCreditApplicationCreating}
          type="button"
          onClick={nextSlide}
          disabled={!isFormValid()}
          className={`bg-pry2 normal-case text-white font-normal text-sm px-8 py-3 rounded-lg shadow-sm ${
            !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Check credit limit
        </Button>
      </div>
    </>
  );
};

export default CreditLimitSlide3;
