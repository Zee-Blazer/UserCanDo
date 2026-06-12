import React from "react";
import { Button } from "@material-tailwind/react";
import LazyImage from "@/components/General/imageComp";

interface DisplayImageProps {
	imageUrl?: string;
	openModal: () => void;
	removePhoto: () => void;
	loading: boolean;
	label?: string;
}
const DisplayImage = ({
	imageUrl,
	openModal,
	loading,
	removePhoto,
	label,
}: DisplayImageProps) => {
	return (
		<div className='relative rounded-md overflow-hidden'>
			<div className='h-[300px]'>
				<LazyImage
					src={imageUrl || ""}
					alt='property'
					fill={true}
					className='object-cover'
					id={imageUrl}
					fallbackSrc=''
				/>
			</div>
			<div
				className='h-full w-full absolute top-0 right-0 bg-gradient-to-b dark:from-[#0000000A] dark:to-[#000000]
				 from-[#FFFFFF0A] to-[#FFFFFF]'
			/>
			<div className='absolute bottom-4 flex gap-2 items-center justify-center w-full'>
				<Button
					className='text-pry normal-case'
					variant='text'
					onClick={openModal}
				>
					{label || "Upload"}
				</Button>
				<Button
					className='text-pry normal-case'
					variant='text'
					loading={loading}
					onClick={removePhoto}
				>
					Remove
				</Button>
			</div>
		</div>
	);
};

export default DisplayImage;
