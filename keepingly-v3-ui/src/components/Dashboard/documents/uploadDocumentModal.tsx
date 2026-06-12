import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import { ModalProps } from "@/types";
import { X } from "lucide-react";
import { FormSelect } from "@/components/General/form/select";
import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { useDashboardSelector } from "@/Redux/selectors";

interface UploadDocumentModalProps extends ModalProps {
	handleUpload?: () => void;
	type?: string;
	setFile?: (file: File) => void;
	file?: File | null;
	category: string;
	setCategory?: (category: string) => void;
	subCategory: string;
	setSubCategory?: (subCategory: string) => void;
	disabled?: boolean;
	disableSubCategory?: boolean;
	hideCategory?: boolean;
	disableUpload?: boolean;
}

const UploadDocumentModal = ({
	open,
	handleOpen,
	closeModal,
	handleUpload,
	type,
	loading,
	setFile,
	category,
	setCategory,
	subCategory,
	setSubCategory,
	disabled,
	file,
	disableSubCategory,
	hideCategory,
	disableUpload,
}: UploadDocumentModalProps) => {
	const { documentTypes, activeProperty } = useDashboardSelector();
	const [catError, setCatError] = useState("");
	const [fileError, setFileError] = useState("");
	const allCatgoeries = documentTypes?.map((item) => item.category);
	const subCategories =
		documentTypes?.find((item) => item.category === category)?.sub_categories ||
		[];

	const validate = () => {
		if (category === "" && !hideCategory) {
			setCatError("Category is required");
			return false;
		} else setCatError("");
		if (!file) {
			setFileError("You must upload a file");
			return false;
		} else {
			setFileError("");
		}
		return true;
	};

	const handleFileUpload = () => {
		const isValid = validate();
		if (isValid && handleUpload) {
			handleUpload();
		}
	};

	return (
		<Dialog
			open={open && !disableUpload}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black flex flex-col gap-4'
			size='sm'
		>
			<div className='flex items-center justify-between mb-6'>
				<Typography
					className='text-black dark:text-white  font-medium text-center'
					variant='h5'
				>
					Upload {type}
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			{!hideCategory && (
				<>
					<FormSelect
						options={allCatgoeries}
						value={category || ""}
						// label='Category'
						onChange={(e) => setCategory && setCategory(e.target.value)}
						placeholder='Category'
						readOnly={disabled}
						required
						error={catError}
					/>
					<FormSelect
						options={subCategories}
						value={subCategory}
						onChange={(e) => setSubCategory && setSubCategory(e.target.value)}
						// label='Sub category'
						placeholder='Subcategory'
						readOnly={disableSubCategory}
					/>
				</>
			)}

			<DragAndDropFileInput
				id='modal-upload'
				onFileSelect={(files) => {
					setFile && setFile(files[0]);
				}}
				singleFile
				type={type}
				acceptedFormats={
					type === "document"
						? [".pdf", ".doc", ".docx", "xls"]
						: type === "file"
						? [
								".mp4",
								".pdf",
								".doc",
								".docx",
								"xls",
								".jpg",
								".jpeg",
								".png",
								".mov",
						  ]
						: [".jpg, .jpeg, .png"]
				}
				// disableUpload={true}
			/>
			<Typography className='text-pry text-sm'>{fileError}</Typography>

			<div className='flex justify-end gap-4'>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize mt-4'
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					onClick={handleFileUpload}
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md'
					loading={loading}
				>
					Upload
				</Button>
			</div>
		</Dialog>
	);
};

export default UploadDocumentModal;
