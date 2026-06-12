import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { ModalProps } from "@/types";
import { X } from "lucide-react";
import { FormInput } from "@/components/General/form";
import { EnvelopeSimple } from "@phosphor-icons/react";
import { useAppContext } from "@/app/context";

interface SharePropertyModalProps extends ModalProps {
	email: string;
	handleShare: () => void;
	loading: boolean;
}
const SharePropertyModal = ({
	open,
	handleOpen,
	closeModal,
	email,
	handleShare,
	loading,
}: SharePropertyModalProps) => {
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
					Share property
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<Typography className='text-gray_5 dark:text-gray_3 mb-4'>
				This property will be shared with the person whose email address is
				displayed below.
			</Typography>
			<FormInput
				placeholder='Email address'
				icon={<EnvelopeSimple size={20} />}
				value={email ?? ""}
				readOnly
				onChange={(e) => {}}
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
					onClick={handleShare}
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md'
					loading={loading}
				>
					Share
				</Button>
			</div>
		</Dialog>
	);
};

export default SharePropertyModal;
