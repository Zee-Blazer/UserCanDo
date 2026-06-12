import React, { useState, ChangeEvent, useEffect } from "react";
import {
	DialogHeader,
	DialogBody,
	Typography,
	DialogFooter,
	Button,
	IconButton,
} from "@material-tailwind/react";
import { XIcon } from "@/assets/svg";
import { ArrowRight } from "lucide-react";
import { colors } from "@/constants/colors";
import { Eye, EyeOff } from "lucide-react";
import { LoginSlideProps } from "./loginOTPSlide";
import { FormInput } from "@/components/General/form";
import ValidationErrorCheck from "@/components/General/validationErrorCheck";
import { useAuth } from "@/context/authContext";
import { useSearchParams } from "next/navigation";

const LoginPasscodeSlide = ({ onContinue, handleOpen }: LoginSlideProps) => {
	const [password, setPassword] = useState("");
	const [isPasswordShowing, setIsPasswordShowing] = useState(false);
	const query = useSearchParams();
	const id = query.get("user_id");
	const {
		resetPasswordInputs,
		setResetPasswordInputs,
		setNewUserPassword,
		isResetting,
	} = useAuth();
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
			setResetPasswordInputs({
				...resetPasswordInputs,
				new_password: password,
			});
		}
	}, [password, confirmPassword]);

	return (
		<>
			<DialogHeader className='flex flex-col justify-center align-center'>
				<button title='close_icon' className='self-end' onClick={handleOpen}>
					<XIcon />
				</button>
				<div className='px-6 flex flex-col justify-center align-center text-center gap-y-2 '>
					<Typography className='text-2xl font-semibold'>
						Enter your new password
					</Typography>
					<Typography className='font-normal text-sm text-[#6D7280]'>
						Provide a unique alpahnumeric code. This code will be used for login
						via the website & mobile app.
					</Typography>{" "}
				</div>
			</DialogHeader>
			<DialogBody>
				<form className='px-6 font-medium text-sm'>
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
			</DialogBody>
			<DialogFooter className='px-12'>
				<Button
					className={`bg-blue_pry w-full normal-case mt-4 font-semibold flex items-center justify-center gap-4`}
					disabled={Boolean(!isPasswordValid || !doPasswordsMatch)}
					onClick={() => setNewUserPassword(id || "")}
					loading={isResetting}
					style={{
						backgroundColor: Boolean(!isPasswordValid || !doPasswordsMatch)
							? colors.blue_100
							: colors.blue_pry,
						color: Boolean(!isPasswordValid || !doPasswordsMatch)
							? colors.blue_pry
							: "white",
					}}
				>
					Continue
					<ArrowRight size={18} />
				</Button>
			</DialogFooter>
		</>
	);
};

export default LoginPasscodeSlide;
