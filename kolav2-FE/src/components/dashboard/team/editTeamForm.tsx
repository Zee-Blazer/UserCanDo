import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import React, { ChangeEvent } from "react";

interface EditTeamMemberFormProps {
  teamMemberDetails: TeamListProps;
  phoneValue: string;
  handlePhoneChange: (value: string) => void;
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const EditTeamForm = ({
  teamMemberDetails,
  onInputChange,
  phoneValue,
  handlePhoneChange,
}: EditTeamMemberFormProps) => {
  return (
    <main>
      <div className="grid grid-cols-2 gap-6">
        <FormInput
          label="First Name"
          type="text"
          placeholder="Credit Order"
          className="rounded-none bg-inherit"
          paddingY="3"
          name="first_name"
          value={teamMemberDetails?.first_name}
          onChange={onInputChange}
        />
        <FormInput
          label="Last Name"
          type="text"
          placeholder="e.g Doe"
          className="rounded-none bg-inherit"
          paddingY="3"
          name="last_name"
          value={teamMemberDetails?.last_name}
          onChange={onInputChange}
        />
        <FormInput
          label="Email"
          type="text"
          placeholder="email@email.com"
          className="rounded-none bg-inherit"
          paddingY="3"
          name="email"
          value={teamMemberDetails?.email}
          onChange={onInputChange}
        />
        <PhoneInputComponent
          value={phoneValue}
          setValue={handlePhoneChange}
          className="w-full"
        />
        <FormSelect
          label="Role"
          options={["Owner", "Manager", "Sales Agent"]}
          placeholder="Select Role"
          className="w-full rounded-none"
          paddingY="3"
          name="role"
          value={teamMemberDetails?.role}
          onChange={onInputChange}
        />
      </div>
    </main>
  );
};

export default EditTeamForm;
