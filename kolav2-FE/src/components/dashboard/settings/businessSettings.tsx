import { useState } from "react";
import BusinessDetailsForm from "./businessDetailsForm";
import SettingsSection from "./settingsSection";

const BusinessSettings = () => {
	const [businessDetailsOpen, setBusinessDetailsOpen] = useState(true);

	const [businessForm, setBusinessForm] = useState({
		companyName: "Kola Market Ventures",
		bio: "Business owner",
		storeCount: "4",
		address: "eg., Achimota, near the police station",
		country: "Nigeria",
		email: "kolamarketventures@gmail.com",
	});

	const formInputColors = {
		color: "#6F6F6F",
		borderColor: "#D5D8DC",
		bgColor: "#FFFFFF",
		activeBorderColor: "#FFD68F",
	};

	const handleBusinessChange = (field: string, value: string) => {
		setBusinessForm((prev) => ({ ...prev, [field]: value }));
	};

	return (
		<>
			<SettingsSection
				title='Business Details'
				isOpen={businessDetailsOpen}
				onToggle={() => setBusinessDetailsOpen(!businessDetailsOpen)}
			>
				<BusinessDetailsForm
					formData={businessForm}
					onChange={handleBusinessChange}
					onSave={() => {}}
					onEditBusinessLogo={() => {}}
					formInputColors={formInputColors}
				/>
			</SettingsSection>
		</>
	);
};

export default BusinessSettings;
