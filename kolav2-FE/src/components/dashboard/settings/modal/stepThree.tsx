import { FormSelect } from "@/components/General/form";
import React from "react";

const StepThree = () => {
  return (
    <main className="flex flex-col">
      <div className="grid gap-5 grid-cols-2 mb-8">
        <FormSelect
          options={["Select"]}
          label="Sales Seasonality"
          required
          paddingY="3"
          color="black"
          className="rounded-none"
        />
        <FormSelect
          options={["Select"]}
          label="Supplier Payment Behavior"
          required
          paddingY="3"
          color="black"
          className="rounded-none"
        />
        <FormSelect
          options={["Select"]}
          label="Shop Ownership"
          required
          paddingY="3"
          color="black"
          className="rounded-none"
        />
        <FormSelect
          options={["Select"]}
          label="Length of Time in Current Location"
          required
          paddingY="3"
          color="black"
          className="rounded-none"
        />
        <FormSelect
          options={["Select"]}
          label="Operating Days Per Week"
          required
          paddingY="3"
          color="black"
          className="rounded-none"
        />
        <FormSelect
          options={["Select"]}
          label="Number of Dependents"
          required
          paddingY="3"
          color="black"
          className="rounded-none"
        />
      </div>
    </main>
  );
};

export default StepThree;
