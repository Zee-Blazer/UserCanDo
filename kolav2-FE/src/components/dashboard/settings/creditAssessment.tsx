import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import React, { ChangeEvent } from "react";

interface CreditAssessmentProps {
  isEditing: boolean;
  formData: any;
  setFormData: (data: any) => void;
}

const CreditAssessment: React.FC<CreditAssessmentProps> = ({
  isEditing,
  formData,
  setFormData,
}) => {
  const handleInputChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-5xl">
      <div className="grid grid-cols-2 gap-4 py-8">
        <FormSelect
          options={creditLimitDropdownOptions.business_strategy}
          placeholder="Select"
          label="Business Strategy"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="business_strategy"
          value={formData.business_strategy || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.business_governance}
          placeholder="Select"
          label="Business Governance"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="business_governance"
          value={formData.business_governance || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.key_man_risk}
          placeholder="Select"
          label="Key Man Risk"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="key_man_risk"
          value={formData.key_man_risk || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.team_employee_engagement}
          placeholder="Select"
          label="Team/Employee Engagement & Management"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="team_employee_engagement"
          value={formData.team_employee_engagement || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.knowledge_management}
          placeholder="Select"
          label="Knowledge Management"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="knowledge_management"
          value={formData.knowledge_management || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.innovation_digitization}
          placeholder="Select"
          label="Innovation & Digitization"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="innovation_digitization"
          value={formData.innovation_digitization || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.gender_considerations}
          placeholder="Select"
          label="Gender Considerations"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="gender_considerations"
          value={formData.gender_considerations || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.financial_health}
          placeholder="Select"
          label="Financial Health Assessment"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="financial_health"
          value={formData.financial_health || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.projections}
          placeholder="Select"
          label="Projections"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="projections"
          value={formData.projections || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.sales_profitability}
          placeholder="Select"
          label="Sales & Profitability"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="sales_profitability"
          value={formData.sales_profitability || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.asset_management}
          placeholder="Select"
          label="Asset Management"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="asset_management"
          value={formData.asset_management || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.liquidity_capital_management}
          placeholder="Select"
          label="Liquidity & Capital Management"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="liquidity_capital_management"
          value={formData.liquidity_capital_management || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.cash_flow_management}
          placeholder="Select"
          label="Cash Flow Management"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="cash_flow_management"
          value={formData.cash_flow_management || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.operations_management}
          placeholder="Select"
          label="Operations Management Assessment"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="operations_management"
          value={formData.operations_management || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.transport_logistics}
          placeholder="Select"
          label="Transport & Logistics"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="transport_logistics"
          value={formData.transport_logistics || ""}
          onChange={isEditing ? handleInputChange : undefined}
        />
        <FormSelect
          options={creditLimitDropdownOptions.community_entry}
          placeholder="Select"
          label="Community Entry & Sensitization"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="community_entry"
          value={formData.community_entry || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.warehousing_storage}
          placeholder="Select"
          label="Warehousing & Storage"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="warehousing_storage"
          value={formData.warehousing_storage || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          options={creditLimitDropdownOptions.market_access}
          placeholder="Select"
          label="Market Access"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          color="#000000"
          fontSize="sm"
          required
          name="market_access"
          value={formData.market_access || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="store_type"
          label="Store Type"
          options={creditLimitDropdownOptions.store_type}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.store_type || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="storage_capacity"
          label="Storage Capacity"
          options={creditLimitDropdownOptions.storage_capacity}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.storage_capacity || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="restocking_frequency"
          label="Restocking Frequency"
          options={creditLimitDropdownOptions.restocking_frequency}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.restocking_frequency || ""}
          onChange={isEditing ? handleInputChange : undefined}
        />
        <FormSelect
          name="average_sales_per_month"
          label="Average Sales Per Month"
          options={creditLimitDropdownOptions.average_sales_per_month}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.average_sales_per_month || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="top_selling_product"
          label="Top Selling Product"
          options={creditLimitDropdownOptions.top_selling_product}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.top_selling_product || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="has_market_association_permit"
          label="Has Market Association Permit"
          options={creditLimitDropdownOptions.has_market_association_permit}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.has_market_association_permit || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="previous_loans_taken"
          label="Previous Loans Taken"
          options={creditLimitDropdownOptions.previous_loans_taken}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.previous_loans_taken || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="current_outstanding_debts"
          label="Current Outstanding Debts"
          options={creditLimitDropdownOptions.current_outstanding_debts}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.current_outstanding_debts || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="credit_bureau_check"
          label="Credit Bureau Check"
          options={creditLimitDropdownOptions.credit_bureau_check}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.credit_bureau_check || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="momo_usage_frequency"
          label="MoMo Usage Frequency"
          options={creditLimitDropdownOptions.momo_usage_frequency}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.momo_usage_frequency || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="pos_tech_literacy"
          label="POS/Tech Literacy"
          options={creditLimitDropdownOptions.pos_tech_literacy}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.pos_tech_literacy || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="number_of_daily_transactions"
          label="Number of Daily Transactions"
          options={creditLimitDropdownOptions.number_of_daily_transactions}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.number_of_daily_transactions || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="attended_gwk_training"
          label="Attended GWK Training"
          options={creditLimitDropdownOptions.attended_gwk_training}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.attended_gwk_training || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="willingness_to_refer_kola"
          label="Willingness to Refer Kola"
          options={creditLimitDropdownOptions.willingness_to_refer_kola}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.willingness_to_refer_kola || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="product_category"
          label="Product Category"
          options={creditLimitDropdownOptions.product_category}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.product_category || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="product_shelf_life"
          label="Product Shelf Life"
          options={creditLimitDropdownOptions.product_shelf_life}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.product_shelf_life || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="inventory_turnover_rate"
          label="Inventory Turnover Rate"
          options={creditLimitDropdownOptions.inventory_turnover_rate}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.inventory_turnover_rate || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          name="sales_mix"
          label="Sales Mix (Cash vs Credit)"
          options={creditLimitDropdownOptions.sales_mix}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          required
          color="#000000"
          fontSize="sm"
          value={formData.sales_mix || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          label="Sales Seasonality"
          options={creditLimitDropdownOptions.sales_seasonality}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          name="sales_seasonality"
          required
          color="#000000"
          fontSize="sm"
          value={formData.sales_seasonality || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          label="Supplier Payment Behavior"
          options={creditLimitDropdownOptions.supplier_payment_behavior}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          name="supplier_payment_behavior"
          required
          color="#000000"
          fontSize="sm"
          value={formData.supplier_payment_behavior || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          label="Shop Ownership"
          options={creditLimitDropdownOptions.shop_ownership}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          name="shop_ownership"
          required
          color="#000000"
          fontSize="sm"
          value={formData.shop_ownership || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          label="Length of Time in Current Location"
          options={
            creditLimitDropdownOptions.length_of_time_in_current_location
          }
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          name="length_of_time_in_current_location"
          required
          color="#000000"
          fontSize="sm"
          value={formData.length_of_time_in_current_location || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          label="Operating Days Per Week"
          options={creditLimitDropdownOptions.operating_days_per_week}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          name="operating_days_per_week"
          required
          color="#000000"
          fontSize="sm"
          value={formData.operating_days_per_week || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
        <FormSelect
          label="Number of Dependents"
          options={creditLimitDropdownOptions.number_of_dependents}
          placeholder="Select"
          className="rounded-none w-full"
          bgColor="white"
          paddingY="3"
          name="number_of_dependents"
          required
          color="#000000"
          fontSize="sm"
          value={formData.number_of_dependents || ""}
          onChange={isEditing ? handleInputChange : undefined}
          readOnly={!isEditing}
        />
      </div>
    </div>
  );
};

export default CreditAssessment;
