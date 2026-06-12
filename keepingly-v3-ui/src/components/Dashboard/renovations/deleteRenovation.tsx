import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { ModalProps } from "@/types";
import { X } from "lucide-react";

const DeleteRenovationModal = ({
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
					Delete renovation
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<Typography className='text-gray_5 dark:text-gray_3 mb-4'>
				This action is irreversible. Are you sure you want to continue?
			</Typography>

			<div className='flex justify-end gap-4'>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize mt-4'
					loading={loading}
					onClick={action}
				>
					Yes, delete
				</Button>
				<Button
					variant='outlined'
					className='border-pry lowercase first-letter:capitalize mt-4 rounded-md text-pry'
					onClick={closeModal}
				>
					No, cancel
				</Button>
			</div>
		</Dialog>
	);
};

export default DeleteRenovationModal;
