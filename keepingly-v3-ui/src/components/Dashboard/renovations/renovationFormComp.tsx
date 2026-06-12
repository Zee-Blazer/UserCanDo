import { FormInput } from "@/components/General/form";
import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { FormSelect } from "@/components/General/form/select";
import { RenovationFormProps } from "@/types";
import { renovationOptions } from "@/types/mockData";
import { CalendarBlank } from "@phosphor-icons/react";
import { toast } from "react-toastify";

import React, { useRef } from "react";
import { Button } from "@material-tailwind/react";

interface RenovationFormCompProps {
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	renovationData: RenovationFormProps | null;
	formErrors: RenovationFormProps | null;
	addRenovation: () => void;
	loading: boolean;
	status?: "add" | "edit";
}

const RenovationFormComp = ({
	renovationData,
	formErrors,
	handleInputChange,
	addRenovation,
	loading,
	status = "add",
}: RenovationFormCompProps) => {
	const isValidDateString = (dateStr: string): boolean => {
		return /^\d{4}-\d{2}-\d{2}$/.test(dateStr);
	};

	const validateDates = (): boolean => {
		if (!renovationData?.start_date || !renovationData?.close_date) {
			return true;
		}

		if (
			!isValidDateString(renovationData.start_date) ||
			!isValidDateString(renovationData.close_date)
		) {
			return true;
		}

		if (
			new Date(renovationData.close_date) < new Date(renovationData.start_date)
		) {
			toast.error("Completion date cannot be earlier than the start date.");
			return false;
		}

		if (
			new Date(renovationData.start_date) > new Date(renovationData.close_date)
		) {
			toast.error("Start date cannot be later than the completion date.");
			return false;
		}

		return true;
	};

	const handleSubmit = () => {
		if (validateDates()) {
			addRenovation();
		}
	};

	const startDateRef = useRef<HTMLInputElement>(null);
	const closeDateRef = useRef<HTMLInputElement>(null);

	const handleIconClick = (ref: React.RefObject<HTMLInputElement>) => {
		if (ref.current) {
			ref.current.showPicker();
		}
	};

	return (
		<div className='mt-4 flex flex-col gap-4'>
			<FormSelect
				options={renovationOptions}
				placeholder='Section'
				required
				value={renovationData?.renovation_name || ""}
				name='renovation_name'
				onChange={handleInputChange}
				error={formErrors?.renovation_name}
			/>
			<FormInput
				placeholder='Start date'
				label='Start date'
				required
				value={renovationData?.start_date || ""}
				name='start_date'
				type='date'
				onChange={handleInputChange}
				error={formErrors?.start_date}
				icon={<CalendarBlank />}
				iconClick={() => handleIconClick(startDateRef)}
				inputRef={startDateRef}
			/>
			<FormInput
				placeholder='Completion date'
				label='Completion date'
				required
				value={renovationData?.close_date || ""}
				name='close_date'
				type='date'
				onChange={handleInputChange}
				error={formErrors?.close_date}
				icon={<CalendarBlank />}
				iconClick={() => handleIconClick(closeDateRef)}
				inputRef={closeDateRef}
			/>

			{/* <DragAndDropFileInput
				onFileSelect={handleFileSelect}
				singleFile
				id='renovation_upload'
			/> */}
			{status === "add" && (
				<Button
					className='border-pry text-pry normal-case text-base shadow-none font-medium w-full flex items-center justify-center'
					variant='outlined'
					onClick={handleSubmit}
					loading={loading}
				>
					Add Renovation
				</Button>
			)}
		</div>
	);
};

export default RenovationFormComp;
