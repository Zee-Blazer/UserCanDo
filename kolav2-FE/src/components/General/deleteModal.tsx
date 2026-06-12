import React from "react";
import {
	Button,
	Dialog,
	DialogBody,
	DialogFooter,
	DialogHeader,
	IconButton,
	Typography,
} from "@material-tailwind/react";
import { Trash2, X } from "lucide-react";

interface DeleteModalProps {
	open: boolean;
	onClose: () => void;
	onDelete?: () => void;
	header: string;
	message: string;
	loading?: boolean;
}

export const DeleteModal = ({
	open,
	onClose,
	onDelete,
	header,
	message,
	loading,
}: DeleteModalProps) => {
	return (
		<Dialog open={open} handler={onClose}>
			<DialogHeader className='relative m-0 block'>
				<IconButton
					variant='text'
					className='!absolute right-3.5 top-3.5'
					onClick={onClose}
				>
					<X className='h-5 w-5 stroke-2' />
				</IconButton>
			</DialogHeader>
			<DialogBody className='flex flex-col gap-6 items-center rounded-md px-6 md:px-16 py-8'>
				<div className='bg-[#F638380D] rounded-full flex justify-center items-center size-20 md:size-24'>
					<Trash2 className='text-[#F63838] size-8 md:size-10' />
				</div>

				<Typography className='font-medium text-lg md:text-xl text-black text-center'>
					{header}
				</Typography>

				<Typography className='text-center text-lg md:text-xl text-[#787486]'>
					{message}
				</Typography>
			</DialogBody>

			<DialogFooter className='flex w-full items-center px-6 md:px-16 mb-16 md:mb-28 gap-4 md:gap-12 justify-between'>
				<Button
					className='flex-1 h-10 bg-[#F63838] text-white text-sm font-medium flex items-center justify-center border border-[#F63838] shadow-[0px_1px_2px_0px_#1018280D] hover:shadow-[0px_1px_2px_0px_#1018280D] rounded-lg capitalize'
					onClick={onDelete}
					loading={loading}
					disabled={loading}
				>
					Delete
				</Button>
				<Button
					className='flex-1 h-10 bg-[#FFFFFF] text-[#344054] text-sm font-medium flex items-center justify-center border border-[#D0D5DD66] shadow-[0px_1px_2px_0px_#1018280D] hover:shadow-[0px_1px_2px_0px_#1018280D] rounded-lg capitalize'
					onClick={onClose}
				>
					Cancel
				</Button>
			</DialogFooter>
		</Dialog>
	);
};
