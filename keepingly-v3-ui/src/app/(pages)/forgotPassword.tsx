"use client";
import usePostRequest from "@/api/hooks/usePost";
import { EmailIcon } from "@/assets/icons";
import ForgotPasswordModal from "@/components/Auth/forgotPasswordModal";
import { FormInput } from "@/components/General/form";
import { ROUTES } from "@/constants/routes";
import { LoginProps } from "@/types";
import { Button, Typography } from "@material-tailwind/react";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";

const ForgotPasswordPage = () => {
	const [loginData, setLoginData] = useState<LoginProps | null>(null);
	const [isLoading, setIsLoading] = useState(false);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { data, isSuccess, postRequest, loading } = usePostRequest();
	const router = useRouter();
	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setLoginData({ ...loginData, [e.target.name]: e.target.value });
	};

	const handleForgotPassword = async () => {
		await postRequest("/reset_password_link", loginData);
	};

	useEffect(() => {
		if (isSuccess) {
			setIsModalOpen(true);
		}
	}, [isSuccess]);

	useEffect(() => {
		if (isModalOpen) {
			setTimeout(() => {
				setIsModalOpen(false);
				router.push(ROUTES.login);
			}, 3000);
		}
	}, [isModalOpen]);
	return (
		<div>
			<Typography className='dark:text-white text-black text-center text-2xl font-medium'>
				Forgot password
			</Typography>
			<Typography className='text-center mt-4'>
				Enter the email address associated with your Keepingly account. A
				password reset link will be sent.
			</Typography>
			<form
				action=''
				onSubmit={(e) => {
					e.preventDefault();
					handleForgotPassword();
				}}
				className='flex flex-col gap-6 my-8'
			>
				<FormInput
					placeholder='Email address'
					required
					type='email'
					icon={<EmailIcon />}
					value={loginData?.email || ""}
					name='email'
					onChange={handleInputChange}
				/>

				<div className=''>
					<Button
						className='text-white bg-pry w-full p-4 text-base my-4 font-normal capitalize  flex items-center justify-center'
						type='submit'
						loading={loading}
					>
						Reset password
					</Button>
				</div>
			</form>
			<ForgotPasswordModal
				closeModal={() => setIsModalOpen(false)}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				open={isModalOpen}
			/>
		</div>
	);
};

export default ForgotPasswordPage;
