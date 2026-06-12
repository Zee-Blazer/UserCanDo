import { useState } from "react";
import { Typography } from "@material-tailwind/react";
import { CloudArrowUp, FileDoc, FileText, Image } from "@phosphor-icons/react";
import React from "react";

interface DragAndDropFileInputProps {
	onFileSelect: (files: File[], id: string) => void;
	maxSize?: string;
	singleFile?: boolean;
	addBgGraphics?: boolean;
	type?: string;
	size?: "lg" | "sm";
	id: string;
	acceptedFormats?: string[];
	clickFunction?: () => void;
}

const DragAndDropFileInput: React.FC<DragAndDropFileInputProps> = ({
	onFileSelect,
	maxSize,
	singleFile,
	addBgGraphics,
	type,
	size = "sm",
	id,
	acceptedFormats = [".jpeg", ".jpg", ".png"],
	clickFunction,
}) => {
	const [dragging, setDragging] = useState(false);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(true);
	};

	const handleDragLeave = () => {
		setDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setDragging(false);
		let files = Array.from(e.dataTransfer.files);
		if (singleFile) {
			files = files.slice(0, 1);
		}
		setSelectedFiles(files);
		onFileSelect(files, id);
	};

	const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
		let files = Array.from(e.target.files || []);
		if (singleFile) {
			files = files.slice(0, 1);
		}
		setSelectedFiles(files);
		onFileSelect(files, id);
	};

	const handleClick = () => {
		if (clickFunction) {
			clickFunction();
		}
	};

	return (
		<div
			onDragOver={handleDragOver}
			onDragLeave={handleDragLeave}
			onDrop={handleDrop}
			onClick={handleClick}
			className={`cursor-pointer ${
				dragging ? "border-pry border-[1px] border-dashed p-2 rounded-md" : ""
			} transition ${
				addBgGraphics
					? "dark:bg-darkBg bg-lightBg border-dashed border-[1px] rounded-md border-borderLight dark:border-borderDark p-8"
					: ""
			} ${
				size === "lg" && "h-[336px] flex flex-col items-center justify-center"
			}`}
		>
			{!clickFunction && (
				<input
					type='file'
					multiple={!singleFile}
					onChange={handleFileSelect}
					className='hidden'
					id={`file-input-${id}`}
					accept={acceptedFormats.join(",")}
				/>
			)}

			<label htmlFor={`file-input-${id}`} className='flex gap-4 items-center'>
				{size === "sm" && (
					<div className='dark:bg-darkBg bg-lightBg h-20 w-20 items-center justify-center rounded-md hidden md:flex'>
						<Image size={32} alt='alt' />
					</div>
				)}
				<div className={`${size === "lg" && "flex flex-col items-center"}`}>
					{size === "lg" && (
						<div className='flex gap-4 items-center mb-4'>
							<FileText size={32} />
							<FileDoc size={32} />
							<CloudArrowUp size={32} />
						</div>
					)}

					{selectedFiles && selectedFiles.length > 0 ? (
						<Typography className='font-medium dark:text-white text-base'>
							{selectedFiles.length} file(s) selected
						</Typography>
					) : (
						<Typography className='font-medium dark:text-white text-base'>
							{clickFunction
								? "Click to upload"
								: "Drag here or click to upload"}{" "}
							{type || "photo"}
						</Typography>
					)}
					<Typography className='text-xs mt-2'>
						Maximum file size is {maxSize || "1 MB"}
					</Typography>
					<Typography className='text-xs'>
						File must be in {acceptedFormats.join(", ").toUpperCase()} formats.
					</Typography>
				</div>
			</label>
		</div>
	);
};

export default DragAndDropFileInput;
