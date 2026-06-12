import { FormSelect } from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button, Typography } from "@material-tailwind/react";
import React, { ChangeEvent, useState } from "react";

const SelectBusinessForm = ({ closeFlyout }: { closeFlyout: () => void }) => {
  const { isPlatformBusinessesLoading } = useDash();
  const { platformBusiness } = useDashboardSelector();
  const [selectedBusinessName, setSelectedBusinessName] = useState("");
  const { handleAddCustomer, isCustomerAdding } = useDash();

  const selectedBusiness = platformBusiness?.find(
    (business) => business?.business_name === selectedBusinessName
  );

  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedBusinessName(e.target.value);
  };

  const handleSubmit = () => {
    if (selectedBusiness) {
      handleAddCustomer(
        {
          customer_entity_id: selectedBusiness.id,
        },
        () => {
          setSelectedBusinessName("");
          closeFlyout();
        }
      );
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Typography variant="small">
        Select Business(es) To Associate As Customers
      </Typography>
      <div className="grid md:grid-cols-[auto_1fr] grid-cols-1 gap-y-4 gap-x-16 items-center">
        <label className="text-sm text-[#101828]">Business</label>
        <FormSelect
          options={platformBusiness?.map((type) => type.business_name) || []}
          placeholder={isPlatformBusinessesLoading ? "Loading..." : "Select"}
          className="rounded-none"
          paddingY="3"
          value={selectedBusinessName}
          onChange={handleSelectChange}
          name="selectedBusiness"
          readOnly={isPlatformBusinessesLoading}
        />
      </div>
      <div className="flex justify-between gap-4 mt-10">
        <Button
          onClick={closeFlyout}
          className="px-8 normal-case font-medium bg-gray-50 text-pry2 text-sm"
        >
          Cancel
        </Button>
        <Button
          loading={isCustomerAdding}
          disabled={isCustomerAdding || !selectedBusinessName}
          onClick={handleSubmit}
          className="px-8 normal-case font-medium bg-pry2 text-sm"
        >
          Add Customer
        </Button>
      </div>
    </div>
  );
};

export default SelectBusinessForm;
