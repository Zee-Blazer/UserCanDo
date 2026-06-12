import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import React, { ChangeEvent } from "react";

interface AddTeamMemberFormProps {
  teamMemberInputs: TeamListProps;
  phoneValue: string;
  onPhoneChange: (value: string) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const AddTeamForm = ({
  teamMemberInputs,
  phoneValue,
  onPhoneChange,
  onInputChange,
}: AddTeamMemberFormProps) => {
  return (
    <form>
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          type="text"
          placeholder="Jane"
          className="rounded-none bg-inherit"
          paddingY="3"
          name="first_name"
          value={teamMemberInputs.first_name}
          onChange={onInputChange}
        />
        <FormInput
          label="Last Name"
          type="text"
          placeholder="e.g Doe"
          className="rounded-none bg-inherit"
          paddingY="3"
          name="last_name"
          value={teamMemberInputs.last_name}
          onChange={onInputChange}
        />
        <FormInput
          label="Email"
          type="text"
          placeholder="email@email.com"
          className="rounded-none bg-inherit"
          paddingY="3"
          name="email"
          value={teamMemberInputs.email}
          onChange={onInputChange}
        />
        <PhoneInputComponent
          value={phoneValue}
          setValue={onPhoneChange}
          className="w-full"
        />
        <FormSelect
          label="Role"
          options={["Owner", "Manager", "Sales Agent"]}
          placeholder="Select Role"
          className="w-full rounded-none"
          paddingY="3"
          name="role"
          value={teamMemberInputs.role}
          onChange={onInputChange}
        />
      </div>
    </form>
  );
};

export default AddTeamForm;
