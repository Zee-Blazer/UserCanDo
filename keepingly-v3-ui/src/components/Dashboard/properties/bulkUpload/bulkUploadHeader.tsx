import IconContainer from "@/components/General/iconContainer";
import { Typography } from "@material-tailwind/react";
import { ArrowLeft } from "@phosphor-icons/react";
import React, { ReactNode } from "react";
import StepperComp from "../addPropertyStepper";

interface AddPropertyHeaderInterface {
	activeStep: number;
	setActiveStep(step: number): void;
	backBtnAction: () => void;
	stepsArray: ReactNode[];
	setIsLastStep: any;
	setIsFirstStep: any;
	isFirstStep: boolean;
	isLastStep: boolean;
	handleNext: () => void;
	handlePrev: () => void;
}
const BulkUploadHeader = ({
	backBtnAction,
	stepsArray,
	activeStep,
	setActiveStep,
	handleNext,
	handlePrev,
	isFirstStep,
	isLastStep,
	setIsFirstStep,
	setIsLastStep,
}: AddPropertyHeaderInterface) => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 justify-between gap-4 items-center'>
			<div className='flex items-center gap-4'>
				<IconContainer onClick={backBtnAction} icon={<ArrowLeft />} />
				<Typography className='font-bold text-2xl'>Bulk upload</Typography>
			</div>
			<StepperComp
				stepsArray={stepsArray}
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				handleNext={handleNext}
				handlePrev={handlePrev}
				isFirstStep={isFirstStep}
				isLastStep={isLastStep}
				setIsFirstStep={setIsFirstStep}
				setIsLastStep={setIsLastStep}
			/>
		</div>
	);
};

export default BulkUploadHeader;
