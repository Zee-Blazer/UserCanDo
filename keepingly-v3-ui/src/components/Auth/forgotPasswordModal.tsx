import { Dialog, Typography } from "@material-tailwind/react";
import React, { useEffect } from "react";
import { ModalProps } from "@/types";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

const ForgotPasswordModal = ({ open, handleOpen, closeModal }: ModalProps) => {
	const router = useRouter();

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='sm'
		>
			{/* <div className='flex items-center justify-between mb-6'> */}
			<Typography
				className='text-black dark:text-white  font-medium text-center'
				variant='h5'
			>
				Check your email address
			</Typography>
			{/* <X className='cursor-pointer' onClick={closeModal} /> */}
			{/* </div> */}

			<Typography className='text-center mt-4 dark:text-gray_3 text-gray_5 text-base'>
				We have sent a password reset link to your email address. Please check
				your inbox and follow the instructions in your mail to proceed with
				resetting your password.
			</Typography>
			<Typography className='mt-4 text-center dark:text-gray_3 text-gray_5 text-base'>
				If you don’t see the password reset mail in your inbox, please check
				your spam or junk folder. If you encounter any issues, please contact{" "}
				<span className='text-pry'>support@keepingly.com </span>for further
				assistance.
			</Typography>
		</Dialog>
	);
};

export default ForgotPasswordModal;
