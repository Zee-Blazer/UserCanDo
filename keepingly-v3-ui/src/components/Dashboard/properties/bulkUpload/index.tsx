import React, { useEffect, useState } from "react";
import Loading from "@/components/General/loading";
import CreatedSuccessModal from "../createdSuccessModal";
import Step1 from "./step1";
import Step2 from "./step2";
import BulkUploadHeader from "./bulkUploadHeader";
import { toast } from "react-toastify";
import CsvTable from "./csvTable";
import IconContainer from "@/components/General/iconContainer";
import { FileXls } from "@phosphor-icons/react";
import { Typography } from "@material-tailwind/react";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

interface AddPropertyComponentProps {
	backBtnAction: () => void;
}

const AddProperty = ({ backBtnAction }: AddPropertyComponentProps) => {
	const [activeStep, setActiveStep] = useState(0);
	const { getProperties } = useAppContext();

	const [isLastStep, setIsLastStep] = useState(false);
	const [isFirstStep, setIsFirstStep] = useState(false);
	const [isCreated, setIsCreated] = useState(false);
	const [file, setFile] = useState<File | null>(null);
	const [zipFile, setZipFile] = useState<File | null>(null);
	const [allRows, setAllRows] = useState<any[]>([]);
	const { isSuccess, postRequest, loading } = usePostRequest();
	const router = useRouter();
	const handleUpload = async () => {
		const formData = new FormData();
		zipFile && formData.append("file", zipFile);
		formData.append("payload", JSON.stringify(allRows));
		postRequest("/bulk_upload", formData);
	};

	const handleNext = () => {
		isLastStep
			? handleUpload()
			: activeStep === 0
			? validateData({}) && setActiveStep((cur: number) => cur + 1)
			: setActiveStep((cur: number) => cur + 1);
	};

	const validateData = (data: any) => {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

		for (let i = 0; i < data.length; i++) {
			const row = data[i];
			for (let key in row) {
				if (row[key] === "" || row[key] === null || row[key] === undefined) {
					toast.error(
						`Row ${i + 1} has an empty ${key} field. Edit the csv and reupload`
					);
					return false;
				}
			}
			if (!emailRegex.test(row.email)) {
				toast.error(
					`Row ${i + 1} has an invalid email: ${
						row.email
					}. Edit the csv and reupload`
				);
				return false;
			}
		}
		return true;
	};

	const handlePrev = () =>
		!isFirstStep && setActiveStep((cur: number) => cur - 1);

	useEffect(() => {
		if (isSuccess) {
			getProperties();
			setAllRows([]);
			setZipFile(null);
			backBtnAction();
		}
	}, [isSuccess]);

	const stepsArray = [
		<Step1
			file={file}
			setFile={setFile}
			key={0}
			allRows={allRows}
			setAllRows={setAllRows}
		/>,
		<Step2
			key={1}
			allRows={allRows}
			file={zipFile}
			setAllRows={setAllRows}
			setFile={setZipFile}
		/>,
	];

	return (
		<div>
			<BulkUploadHeader
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				backBtnAction={backBtnAction}
				stepsArray={stepsArray}
				handleNext={handleNext}
				handlePrev={handlePrev}
				isFirstStep={isFirstStep}
				isLastStep={isLastStep}
				setIsFirstStep={setIsFirstStep}
				setIsLastStep={setIsLastStep}
			/>
			<div className='mt-4'>{stepsArray[activeStep]}</div>
			{allRows?.length > 0 && (
				<div className='p-4 bg-lightBg dark:bg-darkBg mt-4'>
					<div className='flex items-center gap-4 mb-4'>
						<IconContainer icon={<FileXls size={20} />} />
						<Typography className='text-2xl font-bold text-black dark:text-white'>
							{file?.name}
						</Typography>
					</div>
					<CsvTable allRows={allRows} />
				</div>
			)}
			<CreatedSuccessModal
				closeModal={() => setIsCreated(false)}
				handleOpen={() => setIsCreated(!isCreated)}
				open={isCreated}
			/>
			<Loading isLoading={loading} loadingText='Uploading property' />
		</div>
	);
};

export default AddProperty;
