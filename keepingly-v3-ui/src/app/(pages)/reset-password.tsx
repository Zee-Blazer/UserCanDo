"use client";
import usePostRequest from "@/api/hooks/usePost";
import { EmailIcon } from "@/assets/icons";
import ResetPasswordModal from "@/components/Auth/resetPasswordModal";
import { FormInput } from "@/components/General/form";
import { ResetProps } from "@/types";
import { validateResetPasswordForm } from "@/types/validate";
import { Button, Typography } from "@material-tailwind/react";
import { Eye, EyeOff } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const ResetPasswordPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
	const [resetPasswordData, setResetPasswordData] = useState<ResetProps | null>(
		null
	);
	const [formErrors, setFormErrors] = useState<ResetProps | null>(null);
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const { data, isSuccess, postRequest, loading } = usePostRequest();
	const router = useRouter();

	const validateLogin = () => {
		const errors = validateResetPasswordForm(resetPasswordData);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setResetPasswordData({
			...resetPasswordData,
			[e.target.name]: e.target.value,
		});
	};

	const handleForgotPassword = () => {
		const isValid = validateLogin();
		if (!isValid) return;
		postRequest("/reset_password", {
			token,
			password: resetPasswordData?.password,
		});
	};

	useEffect(() => {
		if (isSuccess) {
			setIsModalOpen(true);
		}
	}, [isSuccess]);

	return (
		<div>
			<Typography className='dark:text-white text-black text-center text-2xl font-medium'>
				Reset password
			</Typography>
			<Typography className='text-center mt-4'>
				Enter a secure password for your Keepingly account.
			</Typography>
			<form
				action=''
				onSubmit={(e) => {
					e.preventDefault();
					handleForgotPassword();
				}}
				className='flex flex-col gap-6 my-8'
			>
				{/* <FormInput
					placeholder='Email address'
					required
					type='email'
					icon={<EmailIcon />}
					readOnly
					value={"johndoe@email.com"}
					name='email'
					onChange={handleInputChange}
				/> */}
				<FormInput
					placeholder='Password'
					// required
					type={isPasswordShown ? "text" : "password"}
					icon={
						<i
							className='text-pry_1'
							onClick={() => setIsPasswordShown(!isPasswordShown)}
						>
							{isPasswordShown ? <EyeOff size={16} /> : <Eye size={16} />}
						</i>
					}
					value={resetPasswordData?.password || ""}
					name='password'
					onChange={handleInputChange}
					error={formErrors?.password}
				/>

				<FormInput
					placeholder='Confirm password'
					// required
					type={isConfirmPasswordShown ? "text" : "password"}
					icon={
						<i
							className='text-pry_1'
							onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
						>
							{isConfirmPasswordShown ? (
								<EyeOff size={16} />
							) : (
								<Eye size={16} />
							)}
						</i>
					}
					value={resetPasswordData?.confirm_password || ""}
					name='confirm_password'
					onChange={handleInputChange}
					error={formErrors?.confirm_password}
				/>

				<div className=''>
					<Button
						className='text-white bg-pry w-full p-4 text-base my-4 capitalize font-normal flex flex-row justify-center items-center'
						type='submit'
						loading={loading}
					>
						Reset password
					</Button>
				</div>
			</form>
			<ResetPasswordModal
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				open={isModalOpen}
			/>
		</div>
	);
};

export default ResetPasswordPage;
