import {
  FormInput,
  FormSelect,
  FormTextArea,
  PhoneInputComponent,
} from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { initialSalesAgent } from "@/utils/initialStates";
import { Button } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";

function AddAgentForm({
  isEdit,
  initialData,
  closeFlyout,
}: {
  isEdit?: boolean;
  initialData?: CreateSalesAgentProps;
  closeFlyout: () => void;
}) {
  const [value, setValue] = useState("");
  const [agentDetails, setAgentDetails] = useState<CreateSalesAgentProps>(
    initialData || initialSalesAgent
  );

  const {
    handleCreateSalesAgent,
    isSalesAgentCreating,
    handleUpdateSaleAgent,
    isSalesAgentUpdating,
  } = useDash();

  useEffect(() => {
    if (isEdit && initialData) {
      setAgentDetails(initialData);
      setValue(
        (initialData.country_code || "") + (initialData.phone_number || "")
      );
    }
  }, [isEdit, initialData]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setAgentDetails({
      ...agentDetails,
      [name]: name === "latest_target" ? Number(value) : value,
    });
  };

  useEffect(() => {
    if (!value) return;
    const code = value.trim().slice(0, 4);
    const phone = value.trim().slice(4, value.length);
    setAgentDetails((prev) => ({
      ...prev,
      country_code: code,
      phone_number: phone,
    }));
  }, [value]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      handleUpdateSaleAgent(agentDetails, () => {
        closeFlyout();
        setAgentDetails(initialSalesAgent);
        setValue("");
      });
    } else {
      handleCreateSalesAgent(agentDetails, () => {
        closeFlyout();
        setAgentDetails(initialSalesAgent);
        setValue("");
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-10 flex-col gap-6 w-full">
      <FormInput
        label="First Name"
        type="text"
        placeholder="first name"
        className="w-full rounded-none bg-inherit"
        value={agentDetails.first_name}
        name="first_name"
        onChange={handleChange}
      />
      <FormInput
        label="Last Name"
        type="text"
        placeholder="last name"
        className="w-full rounded-none bg-inherit"
        value={agentDetails.last_name}
        name="last_name"
        onChange={handleChange}
      />
      <FormInput
        label="Latest Target"
        type="number"
        placeholder="latest target"
        className="w-full rounded-none bg-inherit"
        value={agentDetails.latest_target}
        name="latest_target"
        onChange={handleChange}
      />
      <div className="flex flex-col gap-3">
        <FormTextArea
          label="Description"
          name="description"
          value={agentDetails.description}
          onChange={handleChange}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <FormSelect
          label="Agent Role"
          placeholder="Select Agent Role"
          options={["Owner", "Manager", "Sales Agent"]}
          className="w-full rounded-none"
          paddingY="4"
          paddingX="2"
          name="agent_role"
          value={agentDetails.agent_role}
          onChange={handleChange}
        />
        <PhoneInputComponent
          value={value}
          setValue={setValue}
          className="w-full"
        />
      </div>
      <div className="flex gap-4">
        <FormInput
          label="Email"
          type="email"
          placeholder="owner@gmail.com"
          className="w-full rounded-none bg-inherit"
          name="email"
          value={agentDetails.email}
          onChange={handleChange}
        />
        <FormInput
          label="Location"
          type="location"
          placeholder="Location"
          className="w-full rounded-none bg-inherit"
          name="location"
          value={agentDetails.location}
          onChange={handleChange}
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
          type="submit"
          className="px-8 normal-case font-medium bg-pry2 text-sm"
          loading={isSalesAgentCreating || isSalesAgentUpdating}
          disabled={isSalesAgentCreating || isSalesAgentUpdating}
        >
          {isEdit ? "Save changes" : "Add Sales Agent"}
        </Button>
      </div>
    </form>
  );
}

export default AddAgentForm;
