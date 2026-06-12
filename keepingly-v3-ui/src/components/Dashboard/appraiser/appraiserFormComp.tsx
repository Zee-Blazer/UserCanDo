import { FormInput } from "@/components/General/form";
import { AppraiserFormProps } from "@/types";
import React from "react";

interface ExpenseFormCompProps {
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	appraiserData: AppraiserFormProps | null;
	formErrors: AppraiserFormProps | null;
}
const AppraiserFormComp = ({
	appraiserData,
	formErrors,
	handleInputChange,
}: ExpenseFormCompProps) => {
	return (
		<div className='mt-4 flex flex-col gap-4'>
			<FormInput
				placeholder="Appraiser's name"
				required
				type='text'
				value={appraiserData?.name || ""}
				name='name'
				onChange={handleInputChange}
				error={formErrors?.name}
			/>
			<FormInput
				placeholder='Email address'
				required
				type='email'
				value={appraiserData?.email || ""}
				name='email'
				onChange={handleInputChange}
				error={formErrors?.email}
			/>
		</div>
	);
};

export default AppraiserFormComp;
