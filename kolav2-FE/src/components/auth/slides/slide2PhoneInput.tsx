import React, { useEffect, useState } from "react";
import SlideWrapper from "../slideWrapper";
import { isValidPhoneNumber } from "react-phone-number-input";
import { Typography } from "@material-tailwind/react";
import { PhoneInputComponent } from "@/components/General/form";
import { useAuth } from "@/context/authContext";

const Slide2PhoneInput = () => {
	const {
		prevSlide,
		setCreateAccountData,
		createAccountData,
		isAccountCreating,
		createAccount,
	} = useAuth();
	const [value, setValue] = useState("");
	useEffect(() => {
		if (!value) return;
		const code = value.trim().slice(0, 4);
		const phone = value.trim().slice(4, value.length);
		setCreateAccountData({
			...createAccountData,
			country_code: code,
			phone_number: phone,
		});
	}, [value]);

	return (
		<SlideWrapper
			isDisabled={!value || !isValidPhoneNumber(value)}
			onContinue={createAccount}
			onBack={prevSlide}
			loading={isAccountCreating}
		>
			<div className='pt-6'>
				<Typography className=' text-2xl font-semibold mb-6'>
					Enter your phone number
				</Typography>
				<PhoneInputComponent value={value} setValue={setValue} />
			</div>
		</SlideWrapper>
	);
};

export default Slide2PhoneInput;
