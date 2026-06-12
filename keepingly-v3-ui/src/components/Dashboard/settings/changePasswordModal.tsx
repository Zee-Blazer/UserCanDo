import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { ChangeEvent, useEffect, useState } from "react";
import { ChangePasswordFormProps, ModalProps } from "@/types";
import { Eye, EyeOff, X } from "lucide-react";
import { FormInput } from "@/components/General/form";
import usePostRequest from "@/api/hooks/usePost";

const ChangePasswordModal = ({ open, handleOpen, closeModal }: ModalProps) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
	const [isCurrentPasswordShown, setIsCurrentPasswordShown] = useState(false);
	const [formData, setFormData] = useState<ChangePasswordFormProps | null>(
		null
	);
	const { isSuccess, loading, postRequest, error } = usePostRequest();

	const [formErrors, setFormErrors] = useState<ChangePasswordFormProps | null>(
		null
	);

	const handleInputChange = (e: ChangeEvent<any>) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const action = async () => postRequest("/update_password", formData);

	useEffect(() => {
		if (isSuccess) {
			setFormData(null);
			closeModal();
			setFormErrors(null);
		} else if (error) {
			closeModal();
		}
	}, [isSuccess]);

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
					Change password
				</Typography>
				<X
					className='cursor-pointer dark:text-gray_3 text-gray_5'
					onClick={closeModal}
				/>
			</div>
			<Typography className='text-gray_5 dark:text-gray_3 mb-4'>
				Your old password will be changed. make sure you choose a good password
			</Typography>

			<div className='flex flex-col gap-4'>
				<FormInput
					placeholder='Current password'
					required
					type={isCurrentPasswordShown ? "text" : "password"}
					icon={
						<i
							className='text-pry_1 text-gray_3 dark:text-gray_4'
							onClick={() => setIsCurrentPasswordShown(!isCurrentPasswordShown)}
						>
							{isCurrentPasswordShown ? (
								<EyeOff size={16} />
							) : (
								<Eye size={16} />
							)}
						</i>
					}
					value={formData?.current_password || ""}
					name='current_password'
					onChange={handleInputChange}
					error={formErrors?.current_password}
				/>

				<FormInput
					placeholder='Password'
					required
					type={isPasswordShown ? "text" : "password"}
					icon={
						<i
							className='text-pry_1 text-gray_3 dark:text-gray_4'
							onClick={() => setIsPasswordShown(!isPasswordShown)}
						>
							{isPasswordShown ? <EyeOff size={16} /> : <Eye size={16} />}
						</i>
					}
					value={formData?.password || ""}
					name='password'
					onChange={handleInputChange}
					error={formErrors?.password}
				/>

				<FormInput
					placeholder='Confirm password'
					required
					type={isConfirmPasswordShown ? "text" : "password"}
					icon={
						<i
							className='text-pry_1 text-gray_3 dark:text-gray_4'
							onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
						>
							{isConfirmPasswordShown ? (
								<EyeOff size={16} />
							) : (
								<Eye size={16} />
							)}
						</i>
					}
					value={formData?.confirm_password || ""}
					name='confirm_password'
					onChange={handleInputChange}
					error={formErrors?.confirm_password}
				/>
			</div>

			<div className='flex justify-end gap-4'>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize mt-4 flex items-center justify-center'
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					className='bg-pry lowercase first-letter:capitalize mt-4 rounded-md text-white'
					onClick={action}
					loading={loading}
				>
					Proceed
				</Button>
			</div>
		</Dialog>
	);
};

export default ChangePasswordModal;
