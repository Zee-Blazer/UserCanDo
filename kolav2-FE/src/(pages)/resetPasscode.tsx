"use client";
import React, { useEffect, useState } from "react";
import AuthHeader from "@/components/auth/authHeader";
import OTPModal from "@/components/auth/modals/loginAuthModal";
import { Typography } from "@material-tailwind/react";
import { PhoneInputComponent } from "@/components/General/form";
import { isValidPhoneNumber } from "react-phone-number-input";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import AuthNavigation from "@/components/auth/authNavigation";
import ActionButton from "@/components/auth/continueAction";
import { useAuth } from "@/context/authContext";

const ResetPasscode = () => {
	const {
		setMobileNumberDetails,
		mobileNumberDetails,
		isPassReseting,
		resetPassword,
	} = useAuth();

	const [value, setValue] = useState("");
	const [open, setOpen] = useState(false);
	const router = useRouter();

	const handleOpen = () => setOpen(!open);

	useEffect(() => {
		if (!value) return;
		const code = value.trim().slice(0, 4);
		const phone = value.trim().slice(4, value.length);
		setMobileNumberDetails({
			...mobileNumberDetails,
			country_code: code,
			phone_number: phone,
		});
	}, [value]);

	return (
		<div className=' h-screen w-screen bg-white'>
			<AuthHeader pageType='login' />
			<div className='px-2 lg:px-0 relative h-full w-full overflow-hidden'>
				<div className='max-w-lg mx-auto min-h-[60vh] flex-1 flex flex-col items-start gap-y-4'>
					<AuthNavigation
						onBack={() => {
							router.push(ROUTES.login);
						}}
						activeIndex={0}
					/>
					<div className=''>
						<Typography
							className={`text-[#0D121D] text-3xl leading-[2.5rem] font-semibold pb-2`}
						>
							Reset your password
						</Typography>
						<Typography className='text-sm'>
							Enter your phone number, and a 4-digit code would be sent to the
							given phone number.
						</Typography>
					</div>
					<div style={{ width: "100%" }} className='mt-6'>
						<PhoneInputComponent value={value} setValue={setValue} />
					</div>
					<OTPModal handleOpen={handleOpen} open={open}>
						<ActionButton
							action={() => {
								resetPassword(() => {
									handleOpen();
								});
							}}
							loading={isPassReseting}
							label='Send OTP'
							disabled={!value || !isValidPhoneNumber(value)}
							icon={<ArrowRight size={18} />}
						/>
					</OTPModal>
				</div>
			</div>
		</div>
	);
};

export default ResetPasscode;
