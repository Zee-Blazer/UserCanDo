import React, { useEffect, useState } from "react";
import { InventoryFormProps } from "@/types";
import InventoryFormComp from "./inventoryFormComp";
import InventoryFormHeader from "./inventoryFormHeader";
import { validateAddInventory } from "@/types/validate";
import usePostRequest from "@/api/hooks/usePost";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";

const AddInventory = () => {
	const [inventoryDetails, setInventoryDetails] =
		useState<InventoryFormProps | null>(null);
	const [formErrors, setFormErrors] = useState<InventoryFormProps | null>(null);
	const { isSuccess, loading, postRequest } = usePostRequest();
	const { activeProperty } = useDashboardSelector();
	const { getInventory } = useAppContext();
	const validate = () => {
		const errors = validateAddInventory(inventoryDetails);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setInventoryDetails({ ...inventoryDetails, [name]: value });
	};

	const addInventory = async () => {
		const isValid = validate();
		if (isValid) {
			const formData = new FormData();
			const payload: InventoryFormProps = {
				...inventoryDetails,
				property: activeProperty?.id,
			};
			for (const name in payload) {
				//@ts-ignore
				formData.append(name, payload[name]);
			}
			await postRequest("/add_inventory", formData);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setInventoryDetails(null);
			getInventory();
		}
	}, [isSuccess]);

	return (
		<div className='mt-4 dark:bg-darkBg bg-lightBg p-4 rounded-xl h-full'>
			<InventoryFormHeader addItem={addInventory} loading={loading} />
			<InventoryFormComp
				inventoryData={inventoryDetails}
				formErrors={formErrors}
				handleInputChange={handleInputChange}
				setInventoryDetails={setInventoryDetails}
			/>
		</div>
	);
};

export default AddInventory;
