import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import React from "react";

const StepOne = () => {
  return (
    <main className="grid gap-5 grid-cols-2">
      <FormSelect
        options={creditLimitDropdownOptions.business_strategy}
        label="Business Strategy"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.business_governance}
        label="Business governance"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.key_man_risk}
        label="Key Man Risk"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.team_employee_engagement}
        label="Team/Employee Engagement & Management"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.knowledge_management}
        label="Knowledge Management"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.innovation_digitization}
        label="Innovation & Digitization"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.gender_considerations}
        label="Gender Considerations"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.financial_health}
        label="Financial Health Assessment"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.projections}
        label="Projections"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.sales_profitability}
        label="Sales & Profitability"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.asset_management}
        label="Asset Management"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.liquidity_capital_management}
        label="Liquidity & Capital Management"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.cash_flow_management}
        label="Cash Flow Management"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.operations_management}
        label="Operations Management Assessment"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.transport_logistics}
        label="Transport & Logistics"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.community_entry}
        label="Community Entry & Sensitization"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.warehousing_storage}
        label="Warehousing & Storage"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.market_access}
        label="Market Access"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
    </main>
  );
};

export default StepOne;
