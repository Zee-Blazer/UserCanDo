import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { ModalProps } from "@/types";
import { X } from "lucide-react";
import { FormInput } from "@/components/General/form";
import { useAppContext } from "@/app/context";

interface RenameDocModalProps extends ModalProps {
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	docName: string;
}

const RenameDocModal = ({
	open,
	handleOpen,
	closeModal,
	action,
	loading,
	docName,
	handleChange,
}: RenameDocModalProps) => {
	const { isDarkMode } = useAppContext();
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
					Rename document
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<FormInput
				value={docName || ""}
				onChange={handleChange}
				placeholder='File name'
				color={isDarkMode ? "white" : "black"}
			/>

			<div className='flex justify-end gap-4'>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize mt-4'
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					onClick={action}
					loading={loading}
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md'
				>
					Rename
				</Button>
			</div>
		</Dialog>
	);
};

export default RenameDocModal;
