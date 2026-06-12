import { FormSelect } from "@/components/General/form";
import { creditLimitDropdownOptions } from "@/constants";
import React from "react";

const StepTwo = () => {
  return (
    <main className="grid gap-5 grid-cols-2">
      <FormSelect
        options={creditLimitDropdownOptions.store_type}
        label="Store Type"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.storage_capacity}
        label="Storage Capacity"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.restocking_frequency}
        label="Restocking Frequency"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.average_sales_per_month}
        label="Average Sales Per Month"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.top_selling_product}
        label="Top Selling Product"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.has_market_association_permit}
        label="Has Market Association Permit"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.previous_loans_taken}
        label="Previous Loans Taken"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={creditLimitDropdownOptions.current_outstanding_debts}
        label="Current Outstanding Debts"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="Credit Bureau Check"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="MoMo Usage Frequency"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="POS/Tech Literacy"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="Number of Daily Transactions"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="Attended GWK Training"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="Willingness to Refer Kola"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="Product Category"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="Product Shelf Life"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="Inventory Turnover Rate"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
      <FormSelect
        options={["Select"]}
        label="Sales Mix (Cash vs Credit)"
        required
        paddingY="3"
        color="black"
        className="rounded-none"
      />
    </main>
  );
};

export default StepTwo;
