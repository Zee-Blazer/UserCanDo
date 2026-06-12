import React, { ReactNode } from "react";
import { Stepper, Step, Button } from "@material-tailwind/react";
interface StepperCompProps {
	stepsArray: ReactNode[];
	setActiveStep: any;
	activeStep: number;
	setIsLastStep: any;
	setIsFirstStep: any;
	isFirstStep: boolean;
	isLastStep: boolean;
	handleNext: () => void;
	handlePrev: () => void;
}
const StepperComp = ({
	stepsArray,
	activeStep,
	setActiveStep,
	handleNext,
	handlePrev,
	setIsLastStep,
	setIsFirstStep,
	isFirstStep,
	isLastStep,
}: StepperCompProps) => {
	return (
		<div className='flex items-center gap-4 justify-end'>
			<Stepper
				activeStep={activeStep}
				isLastStep={(value) => setIsLastStep(value)}
				isFirstStep={(value) => setIsFirstStep(value)}
				activeLineClassName='bg-pry'
				lineClassName='bg-pry'
				className='max-w-[320px] hidden lg:flex'
			>
				{stepsArray.map((_, index) => {
					return (
						<Step
							key={index}
							activeClassName='bg-white from-[#A61D4A] to-[#A61D4A] via-[#A61D4A] dark:from-[#A61D4A] dark:to-[#A61D4A]'
							completedClassName='bg-pry dark:bg-pry from-[#A61D4A] via-[#A61D4A] to-[#A61D4A] dark:from-[#A61D4A] dark:to-[#A61D4A]'
							className='bg-gradient-to-r from-[#A61D4A40]  to-[#A61D4A40] bg-white dark:bg-black dark:from-black dark:to-black border-pry border-[1px] text-pry text-sm cursor-pointer'
							// onClick={() => setActiveStep(index)}
						>
							{index + 1}
						</Step>
					);
				})}
			</Stepper>
			<div className='flex gap-4'>
				<Button
					variant='outlined'
					onClick={handlePrev}
					disabled={isFirstStep}
					className='text-base text-pry border-pry lowercase first-letter:capitalize font-medium'
				>
					Previous
				</Button>
				<Button
					onClick={handleNext}
					className='text-base bg-pry lowercase first-letter:capitalize font-medium'
				>
					{isLastStep ? "Submit" : "Next"}
				</Button>
			</div>
		</div>
	);
};

export default StepperComp;
