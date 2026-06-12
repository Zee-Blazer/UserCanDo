import { FormInput } from "@/components/General/form";

const ViewCustomerForm = ({ customerData }: { customerData?: any }) => {
  return (
    <div className="flex flex-col gap-5">
      <FormInput
        label="Name"
        value={customerData?.customer_name || ""}
        className="rounded-none"
        paddingX="6"
        paddingY="2"
        name="customer_name"
        readOnly
      />

      <FormInput
        label="Business Type"
        value={customerData?.customer_business_type || ""}
        name="customer_business_type"
        readOnly
      />

      <FormInput
        label="Phone Number"
        value={customerData?.customer_phone || ""}
        name="customer_phone"
        readOnly
      />

      <FormInput
        label="Country"
        value={customerData?.country || ""}
        name="country"
        readOnly
      />

      <FormInput
        label="Region"
        value={customerData?.region || ""}
        name="region"
        readOnly
      />

      <FormInput
        label="City"
        value={customerData?.city || ""}
        name="city"
        readOnly
      />

      <FormInput
        label="Address"
        value={customerData?.customer_address || ""}
        className="rounded-none"
        paddingX="6"
        paddingY="2"
        name="customer_address"
        readOnly
      />

      <FormInput
        label="Location"
        value={customerData?.location || ""}
        className="rounded-none"
        paddingX="6"
        paddingY="2"
        name="location"
        readOnly
      />
    </div>
  );
};

export default ViewCustomerForm;
