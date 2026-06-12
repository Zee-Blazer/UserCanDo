import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { Button, Typography } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import Papa from "papaparse";
import { toast } from "react-toastify";
interface Step1Props {
	setAllRows: Dispatch<SetStateAction<any[]>>;
	allRows: any[];
	file: any;
	setFile: Dispatch<SetStateAction<any>>;
}
const Step1 = ({ setAllRows, allRows, file, setFile }: Step1Props) => {
	const parseCSV = () => {
		return new Promise((resolve, reject) => {
			//@ts-ignore
			Papa.parse(file, {
				header: true,
				dynamicTyping: true,
				complete: function (results) {
					resolve(results.data);
				},
				error: function (error) {
					reject(error);
				},
			});
		});
	};

	useEffect(() => {
		if (file) {
			parseCSV()
				.then((data: any) => {
					const filteredData = data.filter((row: any, index: number) => {
						// Filter out the last item if it's empty
						const isEmptyRow = Object.values(row).every(
							(value) => value === null || value === ""
						);
						return !isEmptyRow;
					});
					setAllRows(filteredData);
				})
				.catch((error) => {
					console.error("Error parsing CSV:", error);
				});
		}
	}, [file]);

	const handleFileChange = (file: any) => {
		if (file && file.type !== "text/csv") {
			toast.error("The uploaded file is not a CSV file.");
			setFile(null);
		} else {
			setFile(file);
		}
	};

	const downloadCSV = () => {
		const csvContent =
			"address,city,state,zipcode,first_name,middle_name,last_name,phone_number,mobile_number, email\n" +
			"123 Main St,Springfield,Oklahoma,12345,John,Joe,Doe,+233813474923,+233813474923,john.doe@example.com\n";

		const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
		const link = document.createElement("a");
		if (link.download !== undefined) {
			const url = URL.createObjectURL(blob);
			link.setAttribute("href", url);
			link.setAttribute("download", "sample-data.csv");
			link.style.visibility = "hidden";
			document.body.appendChild(link);
			link.click();
			document.body.removeChild(link);
		}
	};

	return (
		<div className='flex flex-col gap-4'>
			<div className='flex justify-between items-center gap-4'>
				<Typography className='text-black dark:text-white font-medium'>
					Upload CSV/XLS
				</Typography>
				<Button
					variant='text'
					className='p-0 text-pry lowercase first-letter:capitalize '
					onClick={downloadCSV}
				>
					Download template
				</Button>
			</div>
			<DragAndDropFileInput
				addBgGraphics
				onFileSelect={(file) => handleFileChange(file[0])}
				type='CSV/XLS'
				maxSize='2MB'
				singleFile
				size='lg'
				id='bulk_upload'
				acceptedFormats={[".csv", ".xls", ".xlsx"]}
			/>
		</div>
	);
};

export default Step1;
