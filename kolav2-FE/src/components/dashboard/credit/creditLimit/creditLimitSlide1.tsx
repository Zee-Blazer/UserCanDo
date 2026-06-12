import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import React from "react";
import { ChangeEvent } from "react";

export interface CreditLimitSlideProps {
  isEditing: boolean;
  nextSlide: () => void;
  prevSlide?: () => void;
  formData: CreditLimitFormProps;
  setFormData: React.Dispatch<React.SetStateAction<CreditLimitFormProps>>;
}

const CreditLimitSlide1 = ({
  isEditing,
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
      formData.business_strategy &&
      formData.business_governance &&
      formData.key_man_risk &&
      formData.team_employee_engagement &&
      formData.knowledge_management &&
      formData.innovation_digitization &&
      formData.gender_considerations &&
      formData.financial_health &&
      formData.projections &&
      formData.sales_profitability &&
      formData.asset_management &&
      formData.liquidity_capital_management &&
      formData.cash_flow_management &&
      formData.operations_management &&
      formData.transport_logistics &&
      formData.community_entry &&
      formData.warehousing_storage &&
      formData.market_access
    );
  };

  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.business_strategy}
            placeholder="Select"
            label="Business Strategy"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.business_strategy || ""}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="business_strategy"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.business_governance}
            placeholder="Select"
            label="Business governance"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.business_governance || ""}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="business_governance"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.key_man_risk}
            placeholder="Select"
            label="Key Man Risk"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.key_man_risk || ""}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="key_man_risk"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.team_employee_engagement}
            placeholder="Select"
            label="Team/Employee Engagement & Management"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.team_employee_engagement || ""}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="team_employee_engagement"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.knowledge_management}
            placeholder="Select"
            label="Knowledge Management"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.knowledge_management}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="knowledge_management"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.innovation_digitization}
            placeholder="Select"
            label="Innovation & Digitization"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.innovation_digitization}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="innovation_digitization"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.gender_considerations}
            placeholder="Select"
            label="Gender Considerations"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.gender_considerations}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="gender_considerations"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.financial_health}
            placeholder="Select"
            label="Financial Health Assessment"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.financial_health}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="financial_health"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.projections}
            placeholder="Select"
            label="Projections"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.projections}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="projections"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.sales_profitability}
            placeholder="Select"
            label="Sales & Profitability"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.sales_profitability}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="sales_profitability"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.asset_management}
            placeholder="Select"
            label="Asset Management"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.asset_management}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="asset_management"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.liquidity_capital_management}
            placeholder="Select"
            label="Liquidity & Capital Management"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.liquidity_capital_management}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="liquidity_capital_management"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.cash_flow_management}
            placeholder="Select"
            label="Cash Flow Management"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.cash_flow_management}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="cash_flow_management"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.operations_management}
            placeholder="Select"
            label="Operations Management Assessment"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.operations_management}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="operations_management"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.transport_logistics}
            placeholder="Select"
            label="Transport & Logistics"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.transport_logistics}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="transport_logistics"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.community_entry}
            placeholder="Select"
            label="Community Entry & Sensitization"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.community_entry}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="community_entry"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.warehousing_storage}
            placeholder="Select"
            label="Warehousing & Storage"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.warehousing_storage}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="warehousing_storage"
          />
        </div>

        <div className="mb-4">
          <FormSelect
            options={creditLimitDropdownOptions.market_access}
            placeholder="Select"
            label="Market Access"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={formData.market_access}
            onChange={isEditing ? handleInputChange : undefined}
            readOnly={!isEditing}
            name="market_access"
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

export default CreditLimitSlide1;
