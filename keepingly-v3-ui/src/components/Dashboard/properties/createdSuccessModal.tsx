import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { ModalProps } from "@/types";
import { X } from "lucide-react";
import successIcon from "@/assets/images/success-doc.png";
import successIconLight from "@/assets/images/success-doc-light.png";
import Image from "next/image";
import { useAppContext } from "@/app/context";

const CreatedSuccessModal = ({ open, handleOpen, closeModal }: ModalProps) => {
	const { isDarkMode } = useAppContext();
	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='xs'
		>
			<div className='flex items-center justify-between mb-6'>
				<Typography className='text-black dark:text-white  font-medium text-2xl'>
					Property added <br /> successfully
				</Typography>
				<X className='cursor-pointer dark:text-gray_3' onClick={closeModal} />
			</div>
			<div className=''>
				<Image
					src={isDarkMode ? successIcon : successIconLight}
					alt='success'
					className='w-16'
				/>
				<Typography className='my-6 text-base text-gray_5 dark:text-gray_1'>
					Newly added property will appear on your properties page.
				</Typography>
			</div>
			<Button
				variant='filled'
				onClick={closeModal}
				className='bg-pry block ml-auto lowercase first-letter:capitalize mt-4'
			>
				Got it
			</Button>
		</Dialog>
	);
};

export default CreatedSuccessModal;
