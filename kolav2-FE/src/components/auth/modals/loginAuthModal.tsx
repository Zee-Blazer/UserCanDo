import React, { ReactNode, useState } from "react";
import { Dialog } from "@material-tailwind/react";
import LoginOTPSlide from "../slides/loginOTPSlide";
import LoginPasscodeSlide from "../slides/loginPasscodeSlide";
import LoginPasscodeChanged from "../slides/loginPasscodeChanged";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const OTPModal = ({
	handleOpen,
	open,
	children,
}: {
	handleOpen: () => void;
	open: boolean;
	children: ReactNode;
}) => {
	const [activeSlideIndex, setActiveSlideIndex] = useState(0);
	const router = useRouter();

	function handleContinue() {
		setActiveSlideIndex((prevIndex) => prevIndex + 1);
	}

	function handleComplete() {
		// handleOpen();
		router.push(ROUTES.login);
	}

	const slides = [
		<LoginOTPSlide
			key='slide1'
			onContinue={handleContinue}
			handleOpen={handleOpen}
		/>,
		<LoginPasscodeSlide
			key='slide2'
			onContinue={handleContinue}
			handleOpen={handleOpen}
		/>,
		<LoginPasscodeChanged
			key='slide3'
			onContinue={handleComplete}
			handleOpen={handleOpen}
		/>,
	];

	return (
		<>
			{children}
			<Dialog size='xs' open={open} handler={handleOpen}>
				{slides.map((slide, index) => activeSlideIndex === index && slide)}
			</Dialog>
		</>
	);
};

export default OTPModal;
