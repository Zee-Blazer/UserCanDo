import React, { useEffect, useState } from "react";
import { AppraiserFormProps } from "@/types";
import ExpenseFormHeader from "./appraiserFormHeader";
import { validateAddAppraiser } from "@/types/validate";
import usePostRequest from "@/api/hooks/usePost";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";
import AppraiserFormComp from "./appraiserFormComp";
import AppraiserFormHeader from "./appraiserFormHeader";

const AddAppraiser = () => {
	const [appraiserDetails, setAppraiserDetails] =
		useState<AppraiserFormProps | null>(null);
	const [formErrors, setFormErrors] = useState<AppraiserFormProps | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const { isSuccess, postRequest, loading } = usePostRequest();
	const { activeProperty } = useDashboardSelector();
	const { getAppraisalUsers } = useAppContext();

	const validate = () => {
		const errors = validateAddAppraiser(appraiserDetails);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const addAppraiser = async () => {
		const isValid = validate();
		if (!isValid) return;

		const payload: AppraiserFormProps = {
			email: appraiserDetails?.email,
			name: appraiserDetails?.name,
		};

		if (isValid) {
			await postRequest("/create_appraiser_user", payload);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setAppraiserDetails({ ...appraiserDetails, [name]: value });
	};

	useEffect(() => {
		if (isSuccess) {
			setAppraiserDetails(null);
			getAppraisalUsers();
		}
	}, [isSuccess]);

	return (
		<div className='mt-4 dark:bg-darkBg bg-lightBg p-4 rounded-xl h-full'>
			<AppraiserFormHeader addAppraiser={addAppraiser} loading={loading} />
			<AppraiserFormComp
				appraiserData={appraiserDetails}
				formErrors={formErrors}
				handleInputChange={handleInputChange}
			/>
		</div>
	);
};

export default AddAppraiser;
