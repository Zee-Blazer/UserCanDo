import { FormInput } from "@/components/General/form";
import { Typography } from "@material-tailwind/react";
import React from "react";
import DocumentListCard from "../../documents/documentListCard";
import { InvDetailsContainerProps } from "./invDetailsContainer";

const InvFormDetails = ({
	isEditable,
	inventoryData,
	handleChange,
}: InvDetailsContainerProps) => {
	return (
		<div className='flex flex-col gap-4'>
			<Typography className='text-black font-semibold dark:text-white'>
				Inventory details
			</Typography>
			<FormInput
				readOnly={!isEditable}
				value={inventoryData?.description || "nil"}
				onChange={handleChange}
				label='Description'
				name='description'
			/>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
				<FormInput
					readOnly={!isEditable}
					value={inventoryData?.purchase_date || "nil"}
					onChange={handleChange}
					type='date'
					label='Purchase date'
					name='purchase_date'
				/>
				<FormInput
					readOnly={!isEditable}
					value={inventoryData?.brand || "nil"}
					onChange={handleChange}
					label='Brand'
					name='brand'
				/>
				<FormInput
					readOnly={!isEditable}
					value={inventoryData?.model_number || "nil"}
					onChange={handleChange}
					label='Model'
					name='model_number'
				/>
			</div>
			<FormInput
				readOnly={!isEditable}
				value={inventoryData?.serial_number || "nil"}
				onChange={handleChange}
				label='Serial number'
				name='serial_number'
			/>
		</div>
	);
};

export default InvFormDetails;
