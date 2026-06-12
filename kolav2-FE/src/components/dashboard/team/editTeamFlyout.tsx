import FlyoutLayout from "@/components/General/flyoutLayout";
import EditTeamForm from "./editTeamForm";
import { useDash } from "@/context/dashboardContext";
import React, { useEffect, useState, ChangeEvent } from "react";
import { formatPhoneNumber } from "@/utils/helpers";
import { initialCreateTeam } from "@/utils/initialStates";

interface EditTeamFlyoutProps {
  isRightEditDrawerOpen: boolean;
  closeFlyout: () => void;
  initialData: TeamListProps;
}

function EditTeamFlyout({
  isRightEditDrawerOpen,
  closeFlyout,
  initialData,
}: EditTeamFlyoutProps) {
  const { handleUpdateTeamMember, isTeamUpdating } = useDash();
  const [teamMemberDetails, setTeamMemberDetails] =
    useState<TeamListProps>(initialData);
  const [phoneValue, setPhoneValue] = useState("");

  useEffect(() => {
    if (initialData) {
      setTeamMemberDetails(initialData);
      setPhoneValue(
        formatPhoneNumber(initialData.phone_number.toString()) || ""
      );
    }
  }, [initialData]);

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

    setTeamMemberDetails(
      (prev) =>
        ({
          ...prev,
          country_code: countryCode,
          phone_number: Number(phoneNumber),
        } as TeamListProps)
    );
  };
  function onInputChange(e: ChangeEvent<HTMLInputElement>) {
    setTeamMemberDetails(
      (prev) =>
        ({
          ...prev,
          [e?.target?.name]: e?.target?.value,
        } as TeamListProps)
    );
  }

  function handleSubmit() {
    const updatedDetails = {
      ...teamMemberDetails,
      phone_number: Number(teamMemberDetails.phone_number),
    };

    handleUpdateTeamMember(updatedDetails, () => {
      setTeamMemberDetails(initialCreateTeam);
      setPhoneValue("");
      closeFlyout();
    });
  }

  return (
    <FlyoutLayout
      isRightDrawerOpen={isRightEditDrawerOpen}
      closeFlyout={closeFlyout}
      onSave={handleSubmit}
      heading="Edit User"
      subheading="Edit the detais of the user."
      primaryBtnText="Save Changes"
      loading={isTeamUpdating}
    >
      <EditTeamForm
        teamMemberDetails={teamMemberDetails}
        phoneValue={phoneValue}
        handlePhoneChange={handlePhoneChange}
        onInputChange={onInputChange}
      />
    </FlyoutLayout>
  );
}

export default EditTeamFlyout;
