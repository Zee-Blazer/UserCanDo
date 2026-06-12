import React, { useState, ChangeEvent, useEffect } from "react";
import SlideWrapper from "../slideWrapper";
import { Typography, IconButton } from "@material-tailwind/react";
import { FormInput } from "@/components/General/form";
import ValidationErrorCheck from "@/components/General/validationErrorCheck";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/authContext";

const Slide4PasswordInput = () => {
	const { prevSlide, nextSlide, setUserProfileInputs, userProfileInputs } =
		useAuth();
	const [password, setPassword] = useState("");
	const [isPasswordShowing, setIsPasswordShowing] = useState(false);
	const [isConfirmPasswordShowing, setIsConfirmPasswordShowing] =
		useState(false);
	const [confirmPassword, setConfirmPassword] = useState("");
	const formInputColors = {
		borderColor: "#F1F1F1",
		activeBorderColor: "#FFD68F",
	};

	const isAboveSixCharacters = password.length > 6;
	const hasUpperAndLowerCase = /(?=.*[a-z])(?=.*[A-Z])/.test(password);
	const hasNumberOrSpecialChar = /(?=.*\d)|(?=.*[!@#$%^&*(),.?":{}|<>])/.test(
		password
	);
	const isPasswordValid =
		isAboveSixCharacters && hasUpperAndLowerCase && hasNumberOrSpecialChar;
	const doPasswordsMatch =
		password && confirmPassword && password === confirmPassword;

	useEffect(() => {
		if (doPasswordsMatch) {
			setUserProfileInputs({ ...userProfileInputs, password });
		}
	}, [password, confirmPassword]);

	return (
		<SlideWrapper
			isDisabled={Boolean(!isPasswordValid || !doPasswordsMatch)}
			onContinue={nextSlide}
			onBack={prevSlide}
		>
			<Typography className='pt-6 font-semibold text-3xl text-[#0D121D] tracking-[-0.8px]'>
				Enter your password
			</Typography>
			<form className='pt-8 font-medium text-sm'>
				<div className='flex flex-col gap-y-1'>
					<label className='flex justify-between items-end'>
						<Typography className=' font-medium text-sm'>Password</Typography>
						{isPasswordValid ? (
							<Typography className='text-xs font-medium text-[#027A48]'>
								Strong
							</Typography>
						) : (
							password &&
							!isPasswordValid && (
								<Typography className='text-xs font-medium text-[#B42318]'>
									Weak
								</Typography>
							)
						)}
					</label>
					<FormInput
						type={isPasswordShowing ? "tel" : "password"}
						borderColor={
							password
								? formInputColors.activeBorderColor
								: formInputColors.borderColor
						}
						bgColor='transparent'
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setPassword(e.target.value);
						}}
						value={password}
						icon={
							<IconButton
								variant='text'
								onClick={() => {
									setIsPasswordShowing(!isPasswordShowing);
								}}
							>
								{isPasswordShowing ? (
									<EyeOff color='#5b5b5b' size={15} />
								) : (
									<Eye color='#5b5b5b' size={15} />
								)}
							</IconButton>
						}
						iconPosition='right'
					/>
				</div>

				<div className='pt-2 pb-8 flex flex-col gap-y-3'>
					<ValidationErrorCheck
						label='Minimum of 6 characters'
						status={isAboveSixCharacters}
					/>
					<ValidationErrorCheck
						label='Has an uppercase and lowercase'
						status={hasUpperAndLowerCase}
					/>
					<ValidationErrorCheck
						label='Has a number or a special character e.g @,#,?'
						status={hasNumberOrSpecialChar}
					/>
				</div>

				<div className='flex flex-col gap-y-1'>
					<label className='flex justify-between items-end'>
						<Typography className=' font-medium text-sm'>
							Confirm Password
						</Typography>
						{confirmPassword && doPasswordsMatch ? (
							<Typography className='text-xs font-medium text-[#027A48]'>
								Passwords Match.
							</Typography>
						) : (
							confirmPassword &&
							!doPasswordsMatch && (
								<Typography className='text-xs font-medium text-[#B42318]'>
									Passwords don't match.
								</Typography>
							)
						)}
					</label>
					<FormInput
						type={isConfirmPasswordShowing ? "tel" : "password"}
						borderColor={
							confirmPassword
								? formInputColors.activeBorderColor
								: formInputColors.borderColor
						}
						bgColor='transparent'
						onChange={(e: ChangeEvent<HTMLInputElement>) => {
							setConfirmPassword(e.target.value);
						}}
						value={confirmPassword}
						icon={
							<IconButton
								variant='text'
								onClick={() => {
									setIsConfirmPasswordShowing(!isConfirmPasswordShowing);
								}}
							>
								{isConfirmPasswordShowing ? (
									<EyeOff color='#5b5b5b' size={15} />
								) : (
									<Eye color='#5b5b5b' size={15} />
								)}
							</IconButton>
						}
						iconPosition='right'
					/>
				</div>
			</form>
		</SlideWrapper>
	);
};

export default Slide4PasswordInput;
