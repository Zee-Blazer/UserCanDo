import { EmailIcon, LicenceIcon, UserICon } from "@/assets/icons";
import { FormInput } from "@/components/General/form";
import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { FormSelect } from "@/components/General/form/select";
import { AgentProps } from "@/types";
import { brokerRoles, USAstates } from "@/types/mockData";
import React, { Dispatch } from "react";

interface FormCompProps {
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	agentData: AgentProps | null;
	formErrors: AgentProps | null;
	setFile?: Dispatch<React.SetStateAction<File | null>>;
}
const FormComp = ({
	agentData,
	formErrors,
	handleInputChange,
	setFile,
}: FormCompProps) => {
	const handleFileSelect = (files: File[]) => {
		setFile && setFile(files[0]);
	};

	return (
		<div className='mt-4 flex flex-col gap-4'>
			<FormInput
				placeholder='First name'
				required
				type='text'
				value={agentData?.first_name || ""}
				name='first_name'
				onChange={handleInputChange}
				error={formErrors?.first_name}
				icon={<UserICon />}
			/>
			<FormInput
				placeholder='Last name'
				required
				type='text'
				value={agentData?.last_name || ""}
				name='last_name'
				onChange={handleInputChange}
				error={formErrors?.last_name}
				icon={<UserICon />}
			/>

			<FormInput
				placeholder='Email address'
				required
				type='email'
				icon={<EmailIcon />}
				value={agentData?.email || ""}
				name='email'
				onChange={handleInputChange}
				error={formErrors?.email}
			/>
			<FormInput
				placeholder='License'
				required
				icon={<LicenceIcon />}
				value={agentData?.license_details || ""}
				name='license_details'
				onChange={handleInputChange}
				error={formErrors?.license_details}
			/>
			<FormSelect
				placeholder='Role'
				onSelect={() => {}}
				options={brokerRoles}
				required
				value={agentData?.role || ""}
				name='role'
				onChange={handleInputChange}
				error={formErrors?.role}
			/>
			<FormSelect
				placeholder='State'
				onSelect={() => {}}
				options={USAstates}
				required
				value={agentData?.state || ""}
				name='state'
				onChange={handleInputChange}
				error={formErrors?.state}
			/>
			<DragAndDropFileInput
				onFileSelect={handleFileSelect}
				singleFile
				id='broker_upload'
			/>
		</div>
	);
};

export default FormComp;
