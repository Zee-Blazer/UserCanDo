import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { ChangeEvent, useState } from "react";
import { ChangePasswordFormProps, ModalProps } from "@/types";
import { Eye, EyeOff, X } from "lucide-react";
import { FormInput } from "@/components/General/form";
import useApiRequest from "@/api/hooks/useApiRequest";

const DeleteAccountModal = ({
	open,
	handleOpen,
	closeModal,
	action,
}: ModalProps) => {
	const { postRequest, loading } = useApiRequest();

	const logout = () => {
		localStorage.clear();
		window.location.href = "/";
	};

	const handleDeleteAccount = async () => {
		await postRequest("/delete_account", {}, (data, isSuccess) => {
			if (isSuccess) {
				logout();
			}
		});
	};
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
					Confirm account deletion?
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<Typography className='text-gray_5 dark:text-gray_3 mb-4'>
				This will permanently delete your Keepingly account. This action cannot
				be undone. Are you sure you want to delete account?
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
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md text-white'
					onClick={handleDeleteAccount}
					loading={loading}
					disabled={loading}
				>
					Yes, delete account
				</Button>
			</div>
		</Dialog>
	);
};

export default DeleteAccountModal;
