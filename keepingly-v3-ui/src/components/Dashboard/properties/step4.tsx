import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { AddPropertyProps } from "@/types";
import { Button, Typography } from "@material-tailwind/react";
import React from "react";
interface Step4Props {
	nextSlide: () => void;
	propertyDetails: AddPropertyProps | null;
	setPropertyDetails: (value: AddPropertyProps) => void;
}
const Step4 = ({
	nextSlide,
	propertyDetails,
	setPropertyDetails,
}: Step4Props) => {
	return (
		<div>
			<Typography className='text-black dark:text-white font-medium mb-4'>
				Upload documents
			</Typography>
			<DragAndDropFileInput
				addBgGraphics
				onFileSelect={(files) =>
					setPropertyDetails({ ...propertyDetails, document_url: files })
				}
				type='documents'
				maxSize='2MB'
				size='lg'
				id='add_property_2'
				acceptedFormats={[".pdf", ".doc", ".docx", '.xls", ".xlsx']}
			/>
			<div className='flex justify-end gap-4'>
				<Button
					className='text-pry lowercase first-letter:capitalize p-0 mt-4'
					variant='text'
					onClick={nextSlide}
				>
					Skip for now
				</Button>
			</div>
		</div>
	);
};

export default Step4;
