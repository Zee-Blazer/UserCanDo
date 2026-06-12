import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { ModalProps } from "@/types";
import { Check, X } from "lucide-react";

const SuspendBrokerModal = ({
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
					Suspend broker
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<Typography className='text-gray_5 dark:text-gray_3 mb-4'>
				Are you sure you want to suspend this broker? The broker will be locked
				out of the platform.
			</Typography>

			<div className='flex justify-end gap-4'>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize mt-4'
					onClick={closeModal}
				>
					No, Cancel
				</Button>
				<Button
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md flex items-center justify-center'
					onClick={action}
					loading={loading}
				>
					Yes, suspend
				</Button>
			</div>
		</Dialog>
	);
};

export default SuspendBrokerModal;
