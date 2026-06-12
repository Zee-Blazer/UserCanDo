import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { ModalProps } from "@/types";
import { X } from "lucide-react";

const ConfirmLogoutModal = ({
	open,
	handleOpen,
	closeModal,
	action,
	loading,
}: ModalProps) => {
	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='sm'
		>
			<div className='flex items-center justify-between mb-6'>
				<Typography
					className='text-black dark:text-white  font-medium text-center'
					variant='h5'
				>
					Logout from account?
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<Typography className='text-gray_5 dark:text-gray_3 mb-4'>
				You will be logged out of your account, you can log back in at anytime.
			</Typography>

			<div className='flex justify-end gap-4'>
				<Button
					variant='text'
					className='mt-4 text-pry lowercase first-letter:capitalize'
					onClick={closeModal}
				>
					No, cancel
				</Button>
				<Button
					variant='outlined'
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md text-white'
					onClick={action}
					loading={loading}
				>
					Yes, logout
				</Button>
			</div>
		</Dialog>
	);
};

export default ConfirmLogoutModal;
