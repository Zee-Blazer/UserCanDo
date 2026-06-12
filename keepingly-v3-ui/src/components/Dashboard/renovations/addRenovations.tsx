import React, { useEffect, useState } from "react";
import { RenovationFormProps } from "@/types";
import RenovationFormHeader from "./renovationFormHeader";
import RenovationFormComp from "./renovationFormComp";
import { validateAddRenovations } from "@/types/validate";
import usePostRequest from "@/api/hooks/usePost";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";

const AddRenovation = () => {
	const [renovationDetails, setRenovationDetails] =
		useState<RenovationFormProps | null>(null);
	const { activeProperty } = useDashboardSelector();
	const [formErrors, setFormErrors] = useState<RenovationFormProps | null>(
		null
	);
	const { loading, postRequest, isSuccess } = usePostRequest();
	const { getRenovations } = useAppContext();

	const validate = () => {
		const errors = validateAddRenovations(renovationDetails);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const addRenovation = async () => {
		const isValid = validate();
		if (isValid) {
			const payload = {
				...renovationDetails,
				property_id: activeProperty?.id,
			};
			await postRequest("/add_renovation", payload);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setRenovationDetails(null);
			getRenovations();
		}
	}, [isSuccess]);

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setRenovationDetails({ ...renovationDetails, [name]: value });
	};

	return (
		<div className='mt-4 dark:bg-darkBg bg-lightBg p-4 rounded-xl h-full'>
			<RenovationFormHeader />
			<RenovationFormComp
				renovationData={renovationDetails}
				formErrors={formErrors}
				handleInputChange={handleInputChange}
				loading={loading}
				addRenovation={addRenovation}
				status='add'
			/>
		</div>
	);
};

export default AddRenovation;
