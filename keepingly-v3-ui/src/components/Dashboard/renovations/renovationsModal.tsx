import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { RenovationFormProps } from "@/types";
import RenovationFormComp from "./renovationFormComp";
import { validateEditRenovations } from "@/types/validate";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";

interface RenovationsModalProps {
	open: boolean;
	handleOpen: () => void;
	closeModal: () => void;
	renovationId: string | null;
	initialData?: RenovationFormProps | null;
	callback: () => void;
}

const RenovationsModal: React.FC<RenovationsModalProps> = ({
	open,
	handleOpen,
	closeModal,
	renovationId,
	initialData,
	callback,
}) => {
	const [renovationDetails, setRenovationDetails] =
		useState<RenovationFormProps | null>(initialData || null);
	const [formErrors, setFormErrors] = useState<RenovationFormProps | null>(
		null
	);
	const { loading, postRequest, isSuccess } = usePostRequest();

	const validate = () => {
		const errors = validateEditRenovations(renovationDetails);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const editRenovation = async () => {
		const isValid = validate();
		if (isValid && renovationId) {
			const payload = {
				...renovationDetails,
				renovation_id: renovationId,
			};
			await postRequest("/update_renovations", payload);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setRenovationDetails({ ...renovationDetails, [name]: value });
	};

	useEffect(() => {
		if (isSuccess) {
			setRenovationDetails(null);
			callback();
			closeModal();
		}
	}, [isSuccess]);

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='sm'
		>
			<Typography className='text-black dark:text-white text-2xl font-semibold'>
				Edit Renovation
			</Typography>
			<RenovationFormComp
				renovationData={renovationDetails}
				formErrors={formErrors}
				loading={loading}
				addRenovation={editRenovation}
				status='edit'
				handleInputChange={handleInputChange}
			/>
			<div className='flex justify-end gap-4 mt-6'>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize'
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					onClick={editRenovation}
					loading={loading}
					className='bg-pry lowercase first-letter:capitalize'
				>
					Save Changes
				</Button>
			</div>
		</Dialog>
	);
};

export default RenovationsModal;
