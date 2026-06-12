import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { Typography } from "@material-tailwind/react";
import React, { Dispatch, useEffect } from "react";
import { toast } from "react-toastify";

interface Step2Props {
	file: File | null;
	setFile: Dispatch<File | null>;
	setAllRows: Dispatch<any[]>;
	allRows: any[];
}
const Step2 = ({ setFile }: Step2Props) => {
	const handleFileChange = (file: File) => {
		if (file && !file.type.includes("zip")) {
			toast.error("The uploaded file is not a ZIP file.");
			setFile(null);
		} else {
			setFile(file);
		}
	};

	return (
		<div>
			<div className='flex flex-col gap-4'>
				<div className='flex justify-between items-center gap-4'>
					<Typography className='text-black dark:text-white font-medium'>
						Upload ZIP
					</Typography>
				</div>
				<DragAndDropFileInput
					addBgGraphics
					onFileSelect={(file) => handleFileChange(file[0])}
					type='ZIP'
					maxSize='2MB'
					singleFile
					size='lg'
					id='bulk_upload_2'
					acceptedFormats={[".zip"]}
				/>
			</div>
		</div>
	);
};

export default Step2;
