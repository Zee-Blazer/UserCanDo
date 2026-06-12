"use client";
import usePostRequest from "@/api/hooks/usePost";
import AuthBtns from "@/components/Auth/authBtns";
import RolePicker from "@/components/Auth/rolePicker";
import SignupForm from "@/components/Auth/signupForm";
import { ROUTES } from "@/constants/routes";
import { login } from "@/Redux/features/authSlice";
import { SignupProps } from "@/types";
import { authRoles } from "@/types/mockData";
import { validateSignup } from "@/types/validate";
import { Button, Typography } from "@material-tailwind/react";
import { useGoogleLogin } from "@react-oauth/google";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useDispatch } from "react-redux";

const SignupPage = () => {
	const router = useRouter();
	const [signupData, setSignupData] = useState<SignupProps | null>(null);
	const [formErrors, setFormErrors] = useState<SignupProps | null>(null);
	const [activeSlide, setActiveSlide] = useState(0);
	const [role, setRole] = useState(authRoles[0].role);

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setSignupData({ ...signupData, [e.target.name]: e.target.value });
	};
	const { loading, postRequest, isSuccess } = usePostRequest();

	const validateInput = () => {
		const errors = validateSignup(signupData);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const handleSignup = async () => {
		if (activeSlide === 0) {
			setActiveSlide(1);
		} else {
			const isValid = validateInput();
			if (isValid) {
				const payload = {
					broker_name: signupData?.broker_name,
					first_name: signupData?.first_name,
					last_name: signupData?.last_name,
					password: signupData?.password,
					email: signupData?.email,
					role,
					license: signupData?.license,
				};
				await postRequest("/register", payload);
			} else {
				console.error("Form is invalid", formErrors);
			}
		}
	};

	useEffect(() => {
		if (isSuccess) {
			if (role === "homeowner") {
				router.push(ROUTES.login);
			} else {
				router.push(ROUTES.broker_signup_success);
			}
		}
	}, [isSuccess]);

	return (
		<div>
			<Typography className='dark:text-white text-black text-center text-2xl font-medium'>
				Create an account
			</Typography>
			<Typography className='text-center mt-4'>
				Create an account to start managing your property or invite homeowners
				to your network.
			</Typography>

			<div>
				{activeSlide === 0 ? (
					<RolePicker setRole={setRole} />
				) : (
					<SignupForm
						formErrors={formErrors}
						handleInputChange={handleInputChange}
						signupData={signupData}
						role={role}
					/>
				)}
			</div>

			<div className=''>
				<Button
					className='text-white bg-pry w-full p-4 text-base my-4 first-letter:uppercase lowercase font-normal flex items-center justify-center'
					type='submit'
					onClick={handleSignup}
					loading={loading}
				>
					<Typography className='first-letter:uppercase'>
						Create an account
					</Typography>
				</Button>
				<AuthBtns />

				<div className='flex gap-2 justify-center'>
					<Typography className='text-pry_1'>
						Already have an account yet?
					</Typography>
					<Link href={ROUTES.login} className='text-pry font-bold'>
						Sign in
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SignupPage;
