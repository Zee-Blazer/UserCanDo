import React, { useEffect, useState } from "react";
import AddPropertyHeader from "./addPropertyHeader";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import Step4 from "./step4";
import CreatedSuccessModal from "./createdSuccessModal";
import Loading from "@/components/General/loading";
import { AddPropertyProps, CommissionProps } from "@/types";
import { validatePropertyStep1, validatePropertyStep2 } from "@/types/validate";
import { toast } from "react-toastify";
import usePostRequest from "@/api/hooks/usePost";
import { useAppContext } from "@/app/context";
import { useAuthSelector } from "@/Redux/selectors";
import { Dialog } from "@material-tailwind/react";
import { X } from "lucide-react";

interface AddPropertyComponentProps {
	open: boolean;
	handleOpen: () => void;
}

const AddProperty = ({ handleOpen, open }: AddPropertyComponentProps) => {
	const { isSuccess, loading, postRequest } = usePostRequest();
	const { getProperties, loadOverView } = useAppContext();
	const [activeStep, setActiveStep] = useState(0);
	const [isLastStep, setIsLastStep] = useState(false);
	const [isFirstStep, setIsFirstStep] = useState(false);
	const [isCreated, setIsCreated] = useState(false);
	const [propertyDetails, setPropertyDetails] =
		useState<AddPropertyProps | null>(null);
	const [formErrors, setFormErrors] = useState<AddPropertyProps | null>(null);
	const [commissionArr, setCommissionArr] = useState<CommissionProps[]>([]);
	const { user } = useAuthSelector();
	const isHomeOwner = user?.role?.includes("homeowner");

	const handlePropertyInputChange = (
		e: React.ChangeEvent<HTMLInputElement>
	) => {
		const { name, value } = e.target;
		setPropertyDetails({ ...propertyDetails, [name]: value });
	};

	const handlePropertyCreation = async () => {
		if (!propertyDetails) return;

		const payload = { ...propertyDetails, tiers: commissionArr };
		const formData = new FormData();

		Object.entries(payload).forEach(([key, value]) => {
			if (value && !Array.isArray(value)) {
				//@ts-ignore
				formData.append(key, value);
			}
		});

		if (propertyDetails.photos_videos_url) {
			propertyDetails.photos_videos_url.forEach((file) => {
				formData.append("photos_videos_url[]", file);
			});
		}

		if (propertyDetails.document_url) {
			propertyDetails.document_url.forEach((file) => {
				formData.append("document_url[]", file);
			});
		}

		if (payload?.tiers) {
			formData.append("tiers", JSON.stringify(payload?.tiers));
		}

		try {
			await postRequest("/add_property", formData);
		} catch (error) {
			console.error("Property creation failed", error);
		}
	};

	useEffect(() => {
		if (isSuccess) {
			setIsCreated(true);
			getProperties();
			loadOverView();
			setPropertyDetails(null);
			handleOpen();
		}
	}, [isSuccess]);

	const handleNext = () => {
		isLastStep
			? handlePropertyCreation()
			: activeStep === 0
			? handleStep1Form()
			: activeStep === 1 && !isHomeOwner
			? handleStep2Form()
			: setActiveStep((cur: number) => cur + 1);
	};

	const validateStep1 = () => {
		const errors = validatePropertyStep1(propertyDetails);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const validateStep2 = () => {
		const errors = validatePropertyStep2(propertyDetails);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleStep1Form = () => {
		const isValid = validateStep1();

		if (isValid) {
			setActiveStep((cur: number) => cur + 1);
		}
	};

	const handleStep2Form = () => {
		const isValid = validateStep2();
		if (!isValid) return;

		const lastTier = commissionArr[commissionArr.length - 1];
		if (lastTier?.is_last === false) {
			toast.error("Please mark the last tier as last tier");
			return;
		}
		if (commissionArr.length > 1) {
			setActiveStep((cur: number) => cur + 1);
		} else if (!commissionArr || commissionArr.length === 1) {
			const commission = commissionArr[0];
			if (commission.up_to === 0) {
				toast.error("Please enter a valid commission value");
				return;
			} else {
				setActiveStep((cur: number) => cur + 1);
			}
		}
	};

	const handlePrev = () =>
		!isFirstStep && setActiveStep((cur: number) => cur - 1);

	const stepsArray = isHomeOwner
		? [
				<Step1
					key={0}
					handleChange={handlePropertyInputChange}
					formErrors={formErrors}
					propertyDetails={propertyDetails}
					setPropertyDetails={setPropertyDetails}
				/>,
				<Step3
					key={1}
					nextSlide={handleNext}
					propertyDetails={propertyDetails}
					setPropertyDetails={setPropertyDetails}
				/>,
				<Step4
					key={2}
					nextSlide={handlePropertyCreation}
					propertyDetails={propertyDetails}
					setPropertyDetails={setPropertyDetails}
				/>,
		  ]
		: [
				<Step1
					key={0}
					handleChange={handlePropertyInputChange}
					formErrors={formErrors}
					propertyDetails={propertyDetails}
					setPropertyDetails={setPropertyDetails}
				/>,
				<Step2
					key={1}
					commissionArr={commissionArr}
					setCommissionArr={setCommissionArr}
					handleChange={handlePropertyInputChange}
					formErrors={formErrors}
					propertyDetails={propertyDetails}
				/>,
				<Step3
					key={2}
					nextSlide={handleNext}
					propertyDetails={propertyDetails}
					setPropertyDetails={setPropertyDetails}
				/>,
				<Step4
					key={3}
					nextSlide={handlePropertyCreation}
					propertyDetails={propertyDetails}
					setPropertyDetails={setPropertyDetails}
				/>,
		  ];

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			size='xl'
			className='p-8 dark:bg-black bg-white'
			dismiss={{ enabled: false }}
		>
			<AddPropertyHeader
				activeStep={activeStep}
				setActiveStep={setActiveStep}
				backBtnAction={handleOpen}
				stepsArray={stepsArray}
				handleNext={handleNext}
				handlePrev={handlePrev}
				isFirstStep={isFirstStep}
				isLastStep={isLastStep}
				setIsFirstStep={setIsFirstStep}
				setIsLastStep={setIsLastStep}
			/>
			<div className='mt-4'>{stepsArray[activeStep]}</div>
			<CreatedSuccessModal
				closeModal={() => setIsCreated(false)}
				handleOpen={() => setIsCreated(!isCreated)}
				open={isCreated}
			/>
			<Loading isLoading={loading} loadingText='Creating property' />
		</Dialog>
	);
};

export default AddProperty;
