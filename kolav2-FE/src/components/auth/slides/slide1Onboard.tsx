import React from "react";
import SlideWrapper from "../slideWrapper";
import AuthActions from "../authActions";
import { useAuth } from "@/context/authContext";

const Slide1Onboard = () => {
	const { prevSlide, nextSlide } = useAuth();
	return (
		<SlideWrapper isDisabled={false} onContinue={nextSlide} onBack={prevSlide}>
			<AuthActions />
		</SlideWrapper>
	);
};

export default Slide1Onboard;
