import React, { useState } from "react";
import SlideWrapper from "../slideWrapper";
import { Typography } from "@material-tailwind/react";
import { OTP } from "@/components/General/form";
import { colors } from "@/constants/colors";
import CountDownTimer from "@/components/General/countDown";
import { useAuth } from "@/context/authContext";

const Slide3OtpInput = () => {
	const { prevSlide, createAccountData, isOtpVerifying, verifyOtp, resendOtp } =
		useAuth();
	const [otp, setOtp] = useState("");
	const [isResendShown, setIsResendShown] = useState(false);

	return (
		<SlideWrapper
			isDisabled={otp.length < 4}
			onContinue={() => verifyOtp(otp)}
			loading={isOtpVerifying}
			onBack={prevSlide}
		>
			<div className='p-8 rounded-xl border-sec border-[1px] mt-4 border-opacity-40 max-w-[480px] mx-auto'>
				<div className='flex items-center justify-center mb-6'>
					<Typography
						className={`text-black opacity-75 text-2xl text-center font-bold`}
					>
						OTP Verification
					</Typography>
				</div>
				<div className='flex flex-col gap-4 items-center justify-center'>
					<Typography className='text-[18px]ry text-pry text-center opacity-50'>
						A 4-digit code has been sent to{" "}
						<span className='font-medium'>{`${createAccountData.country_code}${createAccountData.phone_number}`}</span>
						. Kindly check your phone inbox and enter the code.
					</Typography>
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
					{!isResendShown ? (
						<div className='flex items-center gap-2 bg-green_pry px-6 bg-opacity-10 p-3 rounded-md border-green_pry border-[1px]'>
							<Typography className='text-sm'>
								The code sent expires in
							</Typography>

							<CountDownTimer
								className='text-sm'
								durationInSeconds={120}
								onComplete={() => setIsResendShown(true)}
							/>
						</div>
					) : (
						<div className='flex items-center gap-2 opacity-50'>
							<Typography className='font-medium'>
								Didn’t get the code?
							</Typography>
							<span
								onClick={() => resendOtp(() => setIsResendShown(false))}
								className='cursor-pointer font-bold'
							>
								Resend
							</span>
						</div>
					)}
				</div>
			</div>
		</SlideWrapper>
	);
};

export default Slide3OtpInput;
