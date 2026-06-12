import React, { useEffect, useState } from "react";
import {
	DialogHeader,
	DialogBody,
	Typography,
	DialogFooter,
	Button,
} from "@material-tailwind/react";
import { XIcon } from "@/assets/svg";
import { OTP } from "@/components/General/form";
import CountDownTimer from "@/components/General/countDown";
import { ArrowRight } from "lucide-react";
import { colors } from "@/constants/colors";
import { useAuth } from "@/context/authContext";

export interface LoginSlideProps {
	onContinue: () => void;
	handleOpen?: () => void;
}

const LoginOTPSlide = ({ onContinue, handleOpen }: LoginSlideProps) => {
	const [otp, setOtp] = useState("");
	const {
		mobileNumberDetails,
		resetPassword,
		resetPasswordInputs,
		setResetPasswordInputs,
	} = useAuth();
	const [isResendShown, setIsResendShown] = useState(false);

	useEffect(() => {
		setResetPasswordInputs({ ...resetPasswordInputs, token: otp });
	}, [otp]);
	//   const [isButtonDisabled, setIsButtonDisabled] = useState(false);

	return (
		<>
			<DialogHeader className='flex flex-col justify-center align-center'>
				<button title="cancel-button" type="button" className='self-end' onClick={handleOpen}>
					<XIcon />
				</button>
				<div className='px-12 flex flex-col justify-center align-center text-center gap-y-2 '>
					<Typography className='text-2xl font-semibold'>
						OTP Verification{" "}
					</Typography>
					<Typography className='font-normal text-sm text-[#6D7280]'>
						A 4-digit code has been sent to{" "}
						<span className='text-[#0D121D]'>
							{mobileNumberDetails.country_code}
							{mobileNumberDetails.phone_number}
						</span>
						. Kindly check your phone inbox and enter the code.
					</Typography>{" "}
				</div>
			</DialogHeader>
			<DialogBody>
				<div className='flex flex-col gap-4 items-center justify-center'>
					<OTP
						OTP={otp}
						setOTP={setOtp}
						width={60}
						height={60}
						textColor={colors.gray_4}
						borderColor={colors.sec}
						borderWidth={1}
						bgColor='transparent'
					/>
					{isResendShown ? (
						<div className='flex items-center gap-2 opacity-50'>
							<Typography className='font-medium'>
								Didn’t get the code?
							</Typography>
							<span
								onClick={() => {
									resetPassword(() => setIsResendShown(false));
								}}
								className='cursor-pointer font-bold'
							>
								Resend
							</span>
						</div>
					) : (
						<div className='flex items-center gap-2 bg-green_pry px-6 bg-opacity-10 p-3 rounded-md border-green_pry border-[1px]'>
							<Typography className='text-sm'>
								The code sent expires in
							</Typography>
							<CountDownTimer
								className='text-sm'
								durationInSeconds={120}
								onComplete={() => {
									setIsResendShown(true);
								}}
							/>
						</div>
					)}
				</div>
			</DialogBody>
			<DialogFooter className='px-12'>
				<Button
					className={`bg-blue_pry w-full normal-case mt-4 font-semibold flex items-center justify-center gap-4`}
					disabled={otp.length < 4}
					onClick={onContinue}
					style={{
						backgroundColor: otp.length < 4 ? colors.blue_100 : colors.blue_pry,
						color: otp.length < 4 ? colors.blue_pry : "white",
					}}
				>
					Continue
					<ArrowRight size={18} />
				</Button>
			</DialogFooter>
		</>
	);
};

export default LoginOTPSlide;
