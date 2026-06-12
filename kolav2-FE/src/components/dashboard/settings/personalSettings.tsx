import { useState } from "react";
import SecurityDetailsForm from "./securityDetailsForm";
import SettingsSection from "./settingsSection";
import ProfilePictureSection from "./profilePictureSection";
import ProfileDetails from "./profileDetails";
import LocationDetails from "./locationDetails";

const PersonalSettings = () => {
	const [personalDetailsOpen, setPersonalDetailsOpen] = useState(true);
	const [securityOpen, setSecurityOpen] = useState(false);

	const [pinForm, setPinForm] = useState({
		currentPin: "0000",
		newPin: "1234",
		confirmPin: "1234",
		loginAlert: true,
	});

	const formInputColors = {
		color: "#6F6F6F",
		borderColor: "#D5D8DC",
		bgColor: "#FFFFFF",
		activeBorderColor: "#FFD68F",
	};

	const handlePinChange = (field: string, value: string | boolean) => {
		setPinForm((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<>
			<SettingsSection
				title='Personal Details'
				isOpen={personalDetailsOpen}
				onToggle={() => setPersonalDetailsOpen(!personalDetailsOpen)}
			>
				<ProfilePictureSection />
				<ProfileDetails />
				<LocationDetails />
			</SettingsSection>

			<SettingsSection
				title='Security'
				isOpen={securityOpen}
				onToggle={() => setSecurityOpen(!securityOpen)}
			>
				<SecurityDetailsForm />
			</SettingsSection>
		</>
	);
};

export default PersonalSettings;
