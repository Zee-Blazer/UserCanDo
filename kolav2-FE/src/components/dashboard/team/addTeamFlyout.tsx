import FlyoutLayout from "@/components/General/flyoutLayout";
import AddTeamForm from "./addTeamForm";
import { useDash } from "@/context/dashboardContext";
import { useState } from "react";
import { initialCreateTeam } from "@/utils/initialStates";

interface AddTeamFlyoutProps {
  isRightDrawerOpen: boolean;
  closeFlyout: () => void;
}

function AddTeamFlyout({ isRightDrawerOpen, closeFlyout }: AddTeamFlyoutProps) {
  const { handleCreateTeamMember, isTeamCreating } = useDash();
  const [teamInputs, setTeamInputs] = useState(initialCreateTeam);
  const [phoneValue, setPhoneValue] = useState("");

  const handlePhoneChange = (value: string) => {
    setPhoneValue(value);

    let countryCode = "";
    let phoneNumber = value;

    if (value?.startsWith("+")) {
      const countryCodeMatch = value?.match(/^\+\d{1,3}/);
      if (countryCodeMatch) {
        countryCode = countryCodeMatch[0];
        phoneNumber = value?.replace(/\D/g, "");
      }
    } else {
      countryCode = `+${value?.substring(0, 3)}`;
      phoneNumber = value?.replace(/\D/g, "");
    }

    setTeamInputs((prev) => ({
      ...prev,
      country_code: countryCode,
      phone_number: Number(phoneNumber),
    }));
  };

  const handleSubmit = () => {
    handleCreateTeamMember(teamInputs, () => {
      setTeamInputs(initialCreateTeam);
      setPhoneValue("");
      closeFlyout();
    });
  };

  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={handleSubmit}
      heading="Add User"
      subheading="Enter the detais of the user."
      primaryBtnText="Add User"
      buttonWidth="w-36"
      loading={isTeamCreating}
    >
      <AddTeamForm
        teamMemberInputs={teamInputs}
        phoneValue={phoneValue}
        onPhoneChange={handlePhoneChange}
        onInputChange={(e) => {
          setTeamInputs((prev) => ({
            ...prev,
            [e?.target?.name]: e?.target?.value,
          }));
        }}
      />
    </FlyoutLayout>
  );
}

export default AddTeamFlyout;
