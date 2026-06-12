import { Button, Dialog, Typography } from "@material-tailwind/react";
import React from "react";
import { ModalProps } from "@/types";
import { X } from "lucide-react";
import { FileDoc } from "@phosphor-icons/react";
import { useDashboardSelector } from "@/Redux/selectors";

interface DocEmptyModalProps extends ModalProps {
	closeModal: () => void;
	handleOpen: () => void;
	open: boolean;
}
const DocEmptyStateModal = ({
	open,
	handleOpen,
	closeModal,
	action,
}: DocEmptyModalProps) => {
	const { activeProperty } = useDashboardSelector();

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black flex flex-1 flex-col'
			size={"sm"}
		>
			<div className='flex items-center justify-between mb-6'>
				<Typography
					className='text-black dark:text-white  font-medium text-center'
					variant='h5'
				>
					Upload a Doc, Photo or Video
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<div className={`grid grid-cols-1  gap-4 flex-1`}>
				<div
					onClick={() => {}}
					className={`p-6 rounded-lg cursor-pointer relative dark:bg-darkBg bg-lightBg
								} flex-1 flex flex-col`}
				>
					<i className='dark:text-gray_3 text-gray_5 mb-4'>
						<FileDoc size={30} />
					</i>

					<Typography className='dark:text-gray_3 text-gray_5'>
						Upload document, photo or video to property{" "}
						{activeProperty?.address}
					</Typography>

					<div className='flex-1' />
					<Button
						variant='outlined'
						className='mt-6 w-full lowercase first-letter:capitalize text-pry border-pry shadow-none drop-shadow-none'
						onClick={action}
					>
						Upload file
					</Button>
				</div>
			</div>
			<Button
				variant='text'
				onClick={closeModal}
				className='text-pry block ml-auto lowercase first-letter:capitalize mt-4'
			>
				I&apos;ll do it later
			</Button>
		</Dialog>
	);
};

export default DocEmptyStateModal;
