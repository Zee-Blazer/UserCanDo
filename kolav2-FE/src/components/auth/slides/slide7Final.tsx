import React from "react";
import SlideWrapper from "../slideWrapper";
import shoppingCuate1 from "@/assets/images/shoppingCuate1.png";
import { Typography } from "@material-tailwind/react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/authContext";
import { ROUTES } from "@/constants/routes";

const Slide6Final: React.FC = () => {
	const { prevSlide, setActiveSlideIndex } = useAuth();
	const router = useRouter();
	const query = useSearchParams();
	const id = query.get("user_id");

	const handleContinue = () => {
		if (!id) {
			console.error("User ID is missing");
			return;
		}
		router.push(`${ROUTES.createBusiness}?user_id=${id}`);
		setActiveSlideIndex(0);
	};

	return (
		<SlideWrapper
			isDisabled={false}
			onContinue={handleContinue}
			onBack={prevSlide}
			paddingY='0'
		>
			<div className='flex flex-col gap-1 items-center justify-center mb-4'>
				<Typography className='text-black opacity-75 text-[32px] text-center font-semibold'>
					Welcome to Kola Market!
				</Typography>
				<Typography className='text-[14px] text-pry text-center opacity-50'>
					Let's set up your store.
				</Typography>
			</div>
			<Image
				src={shoppingCuate1}
				alt='shoppingCuate1'
				width={500}
				height={500}
				className='w-full h-auto max-w-[500px] max-h-[500px] mb-6'
				priority
			/>
		</SlideWrapper>
	);
};

export default Slide6Final;
