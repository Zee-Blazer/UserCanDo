import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import { useAuth } from "@/context/authContext";
import React from "react";

const CreditLimitSlide2 = () => {
  const {
    prevCreditLimitSlide,
    nextCreditLimitAssessmentSlide,
    creditLimitFormInputs,
    setCreditLimitFormInputs,
    handleCreditLimitFormInputChange,
  } = useAuth();

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Store Type"
            options={creditLimitDropdownOptions.store_type}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.store_type}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Storage Capacity"
            options={creditLimitDropdownOptions.storage_capacity}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.storage_capacity}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Restocking Frequency"
            options={creditLimitDropdownOptions.restocking_frequency}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.restocking_frequency}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Average Sales Per Month"
            options={creditLimitDropdownOptions.average_sales_per_month}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.average_sales_per_month}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Top Selling Product"
            options={creditLimitDropdownOptions.top_selling_product}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.top_selling_product}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Has Market Association Permit"
            options={creditLimitDropdownOptions.has_market_association_permit}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.has_market_association_permit}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Previous Loans Taken"
            options={creditLimitDropdownOptions.previous_loans_taken}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.previous_loans_taken}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Current Outstanding Debts"
            options={creditLimitDropdownOptions.current_outstanding_debts}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.current_outstanding_debts}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Credit Bureau Check"
            options={creditLimitDropdownOptions.credit_bureau_check}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.credit_bureau_check}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="MoMo Usage Frequency"
            options={creditLimitDropdownOptions.momo_usage_frequency}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.momo_usage_frequency}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="POS/Tech Literacy"
            options={creditLimitDropdownOptions.pos_tech_literacy}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.pos_tech_literacy}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Number of Daily Transactions"
            options={creditLimitDropdownOptions.number_of_daily_transactions}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.number_of_daily_transactions}
            onChange={handleCreditLimitFormInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Attended GWK Training"
            required
            options={creditLimitDropdownOptions.attended_gwk_training}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.attended_gwk_training}
            onChange={handleCreditLimitFormInputChange}
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Willingness to Refer Kola"
            required
            options={creditLimitDropdownOptions.willingness_to_refer_kola}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.willingness_to_refer_kola}
            onChange={handleCreditLimitFormInputChange}
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Product Category"
            required
            options={creditLimitDropdownOptions.product_category}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.product_category}
            onChange={handleCreditLimitFormInputChange}
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Product Shelf Life"
            required
            options={creditLimitDropdownOptions.product_shelf_life}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.product_shelf_life}
            onChange={handleCreditLimitFormInputChange}
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            label="Inventory Turnover Rate"
            required
            options={creditLimitDropdownOptions.inventory_turnover_rate}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.inventory_turnover_rate}
            onChange={handleCreditLimitFormInputChange}
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            label="Sales Mix (Cash vs Credit)"
            required
            options={creditLimitDropdownOptions.sales_mix}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={creditLimitFormInputs.sales_mix}
            onChange={handleCreditLimitFormInputChange}
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
          onClick={nextCreditLimitAssessmentSlide}
          className="bg-pry2 normal-case text-white font-normal text-sm px-8 py-3 rounded-lg shadow-sm"
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CreditLimitSlide2;
