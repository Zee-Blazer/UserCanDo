import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { ModalProps } from "@/types";
import Link from "next/link";
import { ROUTES } from "@/constants/routes";

const ResetPasswordModal = ({ open, handleOpen, closeModal }: ModalProps) => {
	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='xs'
		>
			{/* <div className='flex items-center justify-between mb-6'> */}
			<Typography
				className='text-black dark:text-white  font-medium text-center'
				variant='h5'
			>
				Password reset successfully
			</Typography>
			{/* <X className='cursor-pointer' onClick={closeModal} /> */}
			{/* </div> */}

			<Typography className='text-center mt-4 text-gray_5 dark:text-gray_3'>
				Your new password has been successfully set. Login to continue enjoying
				our services.
			</Typography>
			<Link
				href={ROUTES.login}
				className='bg-pry text-white w-full p-4 text-base mt-10 block text-center  rounded-md'
			>
				Login
			</Link>
		</Dialog>
	);
};

export default ResetPasswordModal;
