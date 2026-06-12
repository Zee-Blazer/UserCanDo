import {
  FormInput,
  FormSelect,
  PhoneInputComponent,
} from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { ALL_ROLES, USER_ROLES } from "@/types";
import { initialStaffState } from "@/utils/initialStates";
import { Button } from "@material-tailwind/react";
import { ChangeEvent, useEffect, useState } from "react";

const AddStaffForm = ({
  isEdit,
  initialData,
  onClose,
}: {
  isEdit?: boolean;
  initialData?: CreateStaffProps;
  onClose: () => void;
}) => {
  const [phoneValue, setPhoneValue] = useState("");
  const [staffInputs, setStaffInputs] = useState<CreateStaffProps>(
    initialData || initialStaffState
  );

  const {
    isStaffCreating,
    handleCreateStaff,
    handleUpdateStaff,
    isStaffUpdating,
  } = useDash();

  const handleStaffInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStaffInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setStaffInputs((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (isEdit && initialData) {
      setStaffInputs(initialData);
      setPhoneValue(
        (initialData.country_code || "") + (initialData.phone_number || "")
      );
    }
  }, [isEdit, initialData]);

  useEffect(() => {
    if (!phoneValue) return;
    const code = phoneValue.trim().slice(0, 4);
    const phone = phoneValue.trim().slice(4, phoneValue.length);
    setStaffInputs((prev) => ({
      ...prev,
      country_code: code,
      phone_number: phone,
    }));
  }, [phoneValue]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isEdit) {
      handleUpdateStaff(staffInputs, () => {
        setStaffInputs(initialStaffState);
        setPhoneValue("");
        onClose();
      });
    } else {
      handleCreateStaff(staffInputs, () => {
        setStaffInputs(initialStaffState);
        setPhoneValue("");
        onClose();
      });
    }
  };

  const formatRoleForDisplay = (role: string) => {
    return role
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  const findOriginalRole = (displayValue: string) => {
    return ALL_ROLES.find(
      (role) => formatRoleForDisplay(role) === displayValue
    );
  };

  return (
    <form onSubmit={handleSubmit} className="flex mb-10 flex-col gap-6 w-full">
      <FormInput
        label="First Name"
        type="text"
        placeholder="Enter first name"
        name="first_name"
        value={staffInputs.first_name}
        required
        className="w-full rounded-none bg-inherit"
        onChange={handleStaffInputChange}
      />

      <FormInput
        label="Last Name"
        type="text"
        placeholder="Enter last name"
        name="last_name"
        value={staffInputs.last_name}
        required
        className="w-full rounded-none bg-inherit"
        onChange={handleStaffInputChange}
      />

      <FormInput
        label="Email"
        type="email"
        placeholder="email@example.com"
        name="email"
        value={staffInputs.email}
        required
        className="w-full rounded-none bg-inherit"
        onChange={handleStaffInputChange}
      />

      <PhoneInputComponent
        value={phoneValue}
        setValue={setPhoneValue}
        className="w-full"
      />

      {!isEdit && (
        <FormInput
          label="Password"
          type="text"
          placeholder="Enter password"
          name="password"
          value={staffInputs.password}
          required
          className="w-full rounded-none bg-inherit"
          onChange={handleStaffInputChange}
        />
      )}

      <FormSelect
        label="Staff Role"
        placeholder="Select Role"
        options={ALL_ROLES.filter((role) => role !== USER_ROLES.SUPER_ADMIN)
          .map(formatRoleForDisplay)
          .sort()}
        value={formatRoleForDisplay(staffInputs.role)}
        name="role"
        required
        className="rounded-none w-full"
        paddingY="3"
        paddingX="2"
        onChange={(e: ChangeEvent<HTMLSelectElement>) => {
          const originalRole = findOriginalRole(e.target.value);
          handleSelectChange("role", originalRole || e.target.value);
        }}
      />

      <div className="flex justify-between gap-4 mt-10">
        <Button
          onClick={onClose}
          className="px-8 normal-case font-medium bg-gray-50 text-pry2 text-sm"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          className="px-8 normal-case font-medium bg-pry2 text-sm"
          loading={isStaffCreating || isStaffUpdating}
          disabled={isStaffCreating || isStaffUpdating}
        >
          {isEdit ? "Save changes" : "Add Team"}
        </Button>
      </div>
    </form>
  );
};

export default AddStaffForm;
