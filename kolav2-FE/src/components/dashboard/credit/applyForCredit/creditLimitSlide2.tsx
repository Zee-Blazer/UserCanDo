import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import React, { ChangeEvent } from "react";
import { CreditLimitSlideProps } from "./creditLimitSlide1";

const CreditLimitSlide2 = ({
  nextSlide,
  prevSlide,
  formData,
  setFormData,
}: CreditLimitSlideProps) => {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isFormValid = () => {
    return (
      formData.store_type &&
      formData.storage_capacity &&
      formData.restocking_frequency &&
      formData.average_sales_per_month &&
      formData.top_selling_product &&
      formData.has_market_association_permit &&
      formData.previous_loans_taken &&
      formData.current_outstanding_debts &&
      formData.credit_bureau_check &&
      formData.momo_usage_frequency &&
      formData.pos_tech_literacy &&
      formData.number_of_daily_transactions &&
      formData.attended_gwk_training &&
      formData.willingness_to_refer_kola &&
      formData.product_category &&
      formData.product_shelf_life &&
      formData.inventory_turnover_rate &&
      formData.sales_mix
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="store_type"
            label="Store Type"
            options={creditLimitDropdownOptions.store_type}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.store_type}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="storage_capacity"
            label="Storage Capacity"
            options={creditLimitDropdownOptions.storage_capacity}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.storage_capacity}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="restocking_frequency"
            label="Restocking Frequency"
            options={creditLimitDropdownOptions.restocking_frequency}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.restocking_frequency}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="average_sales_per_month"
            label="Average Sales Per Month"
            options={creditLimitDropdownOptions.average_sales_per_month}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.average_sales_per_month}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="top_selling_product"
            label="Top Selling Product"
            options={creditLimitDropdownOptions.top_selling_product}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.top_selling_product}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="has_market_association_permit"
            label="Has Market Association Permit"
            options={creditLimitDropdownOptions.has_market_association_permit}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.has_market_association_permit}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="previous_loans_taken"
            label="Previous Loans Taken"
            options={creditLimitDropdownOptions.previous_loans_taken}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.previous_loans_taken}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="current_outstanding_debts"
            label="Current Outstanding Debts"
            options={creditLimitDropdownOptions.current_outstanding_debts}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.current_outstanding_debts}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="credit_bureau_check"
            label="Credit Bureau Check"
            options={creditLimitDropdownOptions.credit_bureau_check}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.credit_bureau_check}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="momo_usage_frequency"
            label="MoMo Usage Frequency"
            options={creditLimitDropdownOptions.momo_usage_frequency}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.momo_usage_frequency}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="pos_tech_literacy"
            label="POS/Tech Literacy"
            options={creditLimitDropdownOptions.pos_tech_literacy}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.pos_tech_literacy}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="number_of_daily_transactions"
            label="Number of Daily Transactions"
            options={creditLimitDropdownOptions.number_of_daily_transactions}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.number_of_daily_transactions}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="attended_gwk_training"
            label="Attended GWK Training"
            options={creditLimitDropdownOptions.attended_gwk_training}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.attended_gwk_training}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="willingness_to_refer_kola"
            label="Willingness to Refer Kola"
            options={creditLimitDropdownOptions.willingness_to_refer_kola}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.willingness_to_refer_kola}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="product_category"
            label="Product Category"
            options={creditLimitDropdownOptions.product_category}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.product_category}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="product_shelf_life"
            label="Product Shelf Life"
            options={creditLimitDropdownOptions.product_shelf_life}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.product_shelf_life}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            name="inventory_turnover_rate"
            label="Inventory Turnover Rate"
            options={creditLimitDropdownOptions.inventory_turnover_rate}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.inventory_turnover_rate}
            onChange={handleInputChange}
            required
            color="#000000"
            fontSize="sm"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            name="sales_mix"
            label="Sales Mix (Cash vs Credit)"
            options={creditLimitDropdownOptions.sales_mix}
            placeholder="Select"
            className="rounded-none w-full"
            paddingY="2"
            value={formData.sales_mix}
            onChange={handleInputChange}
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
        <button
          type="button"
          onClick={nextSlide}
          disabled={!isFormValid()}
          className={`bg-pry2 normal-case text-white font-normal text-sm px-8 py-3 rounded-lg shadow-sm ${
            !isFormValid() ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default CreditLimitSlide2;
