import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import { useAuth } from "@/context/authContext";
import React from "react";

const CreditLimitSlide1 = () => {
  const {
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
            options={creditLimitDropdownOptions.business_strategy}
            placeholder="Select"
            label="Business Strategy"
            className="rounded-none w-full"
            paddingY="2"
            color="#000000"
            fontSize="sm"
            required
            value={creditLimitFormInputs.business_strategy}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Business Governance */}
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
            value={creditLimitFormInputs.business_governance}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Key Man Risk */}
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
            value={creditLimitFormInputs.key_man_risk}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Team/Employee Engagement */}
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
            value={creditLimitFormInputs.team_employee_engagement}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Knowledge Management */}
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
            value={creditLimitFormInputs.knowledge_management}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Innovation & Digitization */}
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
            value={creditLimitFormInputs.innovation_digitization}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Gender Considerations */}
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
            value={creditLimitFormInputs.gender_considerations}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Financial Health Assessment */}
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
            value={creditLimitFormInputs.financial_health}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Projections */}
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
            value={creditLimitFormInputs.projections}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Sales & Profitability */}
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
            value={creditLimitFormInputs.sales_profitability}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Asset Management */}
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
            value={creditLimitFormInputs.asset_management}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Liquidity & Capital Management */}
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
            value={creditLimitFormInputs.liquidity_capital_management}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Cash Flow Management */}
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
            value={creditLimitFormInputs.cash_flow_management}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Operations Management Assessment */}
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
            value={creditLimitFormInputs.operations_management}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Transport & Logistics */}
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
            value={creditLimitFormInputs.transport_logistics}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Community Entry & Sensitization */}
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
            value={creditLimitFormInputs.community_entry}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Warehousing & Storage */}
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
            value={creditLimitFormInputs.warehousing_storage}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>

        {/* Market Access */}
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
            value={creditLimitFormInputs.market_access}
            onChange={handleCreditLimitFormInputChange}
          />
        </div>
      </div>
      <div className="flex justify-end mt-8 gap-8">
        <button
          type="button"
          // onClick={prevSlide}
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

export default CreditLimitSlide1;
