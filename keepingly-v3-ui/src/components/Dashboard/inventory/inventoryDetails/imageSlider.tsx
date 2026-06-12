import React, { useState } from "react";
import { DocProps } from "@/types";
import LazyImage from "@/components/General/imageComp";

interface ImageSliderProps {
	images: DocProps[];
}
const ImageSlider = ({ images }: ImageSliderProps) => {
	// const images = [prop1, prop2];
	const [currentIndex, setCurrentIndex] = useState<number>(0);

	const nextSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === images.length - 1 ? 0 : prevIndex + 1
		);
	};

	const prevSlide = () => {
		setCurrentIndex((prevIndex) =>
			prevIndex === 0 ? images.length - 1 : prevIndex - 1
		);
	};

	return (
		<div className='relative w-full overflow-hidden'>
			<div
				className='flex transition-transform duration-500 ease-in-out  h-[416px]'
				style={{ transform: `translateX(-${currentIndex * 100}%)` }}
			>
				{images.map((image) => (
					<LazyImage
						key={image.id}
						src={image.url}
						alt={image.name}
						className='object-cover flex-shrink-0 rounded-md'
						width={2000}
						height={416}
					/>
				))}
			</div>
			<div className='h-full w-full absolute top-0 right-0 bg-gradient-to-b dark:from-[#00000066] dark:to-[#00000066] rounded-md from-[#FFFFFF66] to-[#FFFFFF66]' />

			{/* Prev button */}
			<button
				className='absolute top-1/2 left-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all w-10 h-10 flex items-center justify-center'
				onClick={prevSlide}
			>
				&#10094;
			</button>

			{/* Next button */}
			<button
				className='absolute top-1/2 right-4 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-75 transition-all w-10 h-10 flex items-center justify-center'
				onClick={nextSlide}
			>
				&#10095;
			</button>
		</div>
	);
};

export default ImageSlider;
