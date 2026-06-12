import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { AddPropertyProps } from "@/types";
import { Button, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
interface Step3Props {
	nextSlide: () => void;
	propertyDetails: AddPropertyProps | null;
	setPropertyDetails: (value: AddPropertyProps) => void;
}
const Step3 = ({
	nextSlide,
	propertyDetails,
	setPropertyDetails,
}: Step3Props) => {
	return (
		<div>
			<Typography className='text-black dark:text-white font-medium mb-4'>
				Uplaod photos/videos
			</Typography>
			<DragAndDropFileInput
				addBgGraphics
				size='lg'
				onFileSelect={(files) =>
					setPropertyDetails({ ...propertyDetails, photos_videos_url: files })
				}
				type='photos/videos'
				maxSize='2MB'
				id='add_property_upload'
				acceptedFormats={[".jpg", ".jpeg", ".png", ".mp4", ".mov"]}
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

export default Step3;
