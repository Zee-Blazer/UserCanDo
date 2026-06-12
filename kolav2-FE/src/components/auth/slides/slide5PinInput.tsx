import React, { useEffect, useState } from "react";
import SlideWrapper from "../slideWrapper";
import { Button, Typography } from "@material-tailwind/react";
import { OTP } from "@/components/General/form";
import { colors } from "@/constants/colors";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "@/context/authContext";

const Slide5PinInput = () => {
	const { prevSlide, nextSlide, setUserProfileInputs, userProfileInputs } =
		useAuth();
	const [otp, setOtp] = useState("");
	const [isPinShown, setIsPinShown] = useState(true);

	useEffect(() => {
		if (otp.length === 4) {
			setUserProfileInputs({ ...userProfileInputs, password_pin: otp });
		}
	}, [otp]);

	return (
		<SlideWrapper
			isDisabled={otp.length < 4}
			onContinue={nextSlide}
			onBack={prevSlide}
		>
			<div className='p-8 rounded-xl border-sec border-[1px] mt-4 border-opacity-40 max-w-[480px] mx-auto'>
				<div className='flex items-center justify-center mb-6'>
					<Typography
						className={`text-black opacity-75 text-2xl text-center font-bold`}
					>
						Enter your pin
					</Typography>
				</div>
				<div className='flex flex-col gap-4 items-center justify-center'>
					<Typography className='text-[18px]ry text-pry text-center opacity-50'>
						Provide a unique 4-digit code. This code will be used for login via
						the website & mobile app.
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
						inputType={isPinShown ? "tel" : "password"}
					/>
					<Button
						onClick={() => setIsPinShown(!isPinShown)}
						className='flex items-center gap-2 bg-green_pry w-28 justify-center bg-opacity-10 p-3 rounded-full  border-green_pry border-[1px]'
					>
						<Typography className='text-sm text-black font-medium normal-case'>
							{isPinShown ? "Hide" : "Show"}
						</Typography>
						{isPinShown ? (
							<EyeOff color={colors.gray_5} size={15} />
						) : (
							<Eye color={colors.gray_5} size={15} />
						)}
					</Button>
				</div>
			</div>
		</SlideWrapper>
	);
};

export default Slide5PinInput;
