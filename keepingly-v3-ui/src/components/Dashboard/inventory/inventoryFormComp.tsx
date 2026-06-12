import { FormCheckbox, FormInput } from "@/components/General/form";
import { CalendarBlank } from "@phosphor-icons/react";
import CurrencyInput from "@/components/General/form/currencyInput";
import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { InventoryFormProps } from "@/types";

import React, { Dispatch, useEffect, useState, useRef } from "react";

interface ExpenseFormCompProps {
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	inventoryData: InventoryFormProps | null;
	formErrors: InventoryFormProps | null;
	setInventoryDetails: Dispatch<InventoryFormProps | null>;
}
const InventoryFormComp = ({
	inventoryData,
	formErrors,
	handleInputChange,
	setInventoryDetails,
}: ExpenseFormCompProps) => {
	const [isExpenseChecked, setIsExpenseChecked] = useState(false);
	const [isItemAppliance, setIsItemAppliance] = useState(false);
	const purchaseDateRef = useRef<HTMLInputElement>(null);
	const warrantyDateRef = useRef<HTMLInputElement>(null);

	const handleIconClick = (ref: React.RefObject<HTMLInputElement>) => {
		if (ref.current) {
			ref.current.showPicker();
		}
	};

	useEffect(() => {
		if (isExpenseChecked) {
			setInventoryDetails({ ...inventoryData, is_expense_item: true });
		} else {
			setInventoryDetails({ ...inventoryData, is_expense_item: false });
		}
	}, [isExpenseChecked]);

	useEffect(() => {
		if (isItemAppliance) {
			setInventoryDetails({ ...inventoryData, is_appliance: true });
		} else {
			setInventoryDetails({ ...inventoryData, is_appliance: false });
		}
	}, [isItemAppliance]);

	return (
		<div className='mt-4 flex flex-col gap-4'>
			<FormInput
				placeholder='Name'
				required
				type='text'
				value={inventoryData?.name || ""}
				name='name'
				onChange={handleInputChange}
				error={formErrors?.name}
			/>
			<FormInput
				placeholder='Description'
				required
				value={inventoryData?.description || ""}
				name='description'
				onChange={handleInputChange}
				error={formErrors?.description}
			/>
			<FormInput
				placeholder='Purchase date'
				required
				value={inventoryData?.purchase_date || ""}
				name='purchase_date'
				label='Purchase date'
				type='date'
				onChange={handleInputChange}
				error={formErrors?.purchase_date}
				icon={<CalendarBlank />}
				iconClick={() => handleIconClick(purchaseDateRef)}
				inputRef={purchaseDateRef}
			/>
			<CurrencyInput
				placeholder='Purchase price'
				required
				value={inventoryData?.purchase_price || ""}
				name='purchase_price'
				onChange={handleInputChange}
				error={formErrors?.purchase_price}
			/>
			<FormInput
				placeholder='Quantity'
				required
				value={inventoryData?.quantity || ""}
				name='quantity'
				type='number'
				onChange={handleInputChange}
				error={formErrors?.quantity}
			/>
			{/* <FormCheckbox
				checked={isItemAppliance}
				setChecked={setIsItemAppliance}
				label='item is an appliance'
			/> */}

			<>
				<FormInput
					placeholder='Brand'
					required
					value={inventoryData?.brand || ""}
					name='brand'
					onChange={handleInputChange}
					error={formErrors?.brand}
				/>
				<FormInput
					placeholder='Model number'
					required
					value={inventoryData?.model_number || ""}
					name='model_number'
					onChange={handleInputChange}
					error={formErrors?.model_number}
				/>
				<FormInput
					placeholder='Serial number'
					required
					value={inventoryData?.serial_number || ""}
					name='serial_number'
					type='text'
					onChange={handleInputChange}
					error={formErrors?.serial_number}
				/>
				<FormInput
					placeholder='Warranty end date'
					required
					value={inventoryData?.warranty_end_date || ""}
					name='warranty_end_date'
					label='Warranty end date'
					type='date'
					onChange={handleInputChange}
					error={formErrors?.warranty_end_date}
					icon={<CalendarBlank />}
					iconClick={() => handleIconClick(warrantyDateRef)}
					inputRef={warrantyDateRef}
				/>
			</>

			<FormCheckbox
				checked={isExpenseChecked}
				setChecked={setIsExpenseChecked}
				label='Add item to expense'
				name='add_item_to_expense'
			/>
			<DragAndDropFileInput
				onFileSelect={(files) =>
					setInventoryDetails({
						...inventoryData,
						upload_receipt_url: files[0],
					})
				}
				singleFile
				type='receipt'
				id='reciept_upload'
			/>
			<DragAndDropFileInput
				onFileSelect={(files) =>
					setInventoryDetails({
						...inventoryData,
						upload_warranty_url: files[0],
					})
				}
				singleFile
				type='warranty'
				id='warranty_upload'
			/>
			<DragAndDropFileInput
				onFileSelect={(files) =>
					setInventoryDetails({
						...inventoryData,
						manual: files[0],
					})
				}
				singleFile
				type='manual'
				id='manual'
			/>
			<DragAndDropFileInput
				onFileSelect={(files) =>
					setInventoryDetails({
						...inventoryData,
						inventory_upload_photo_video_url: files[0],
					})
				}
				singleFile
				type='photo/video'
				id='photo/video_id'
			/>
		</div>
	);
};

export default InventoryFormComp;
