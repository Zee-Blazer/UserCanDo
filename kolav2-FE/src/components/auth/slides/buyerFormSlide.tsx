import { useAuth } from "@/context/authContext";
import React, { useEffect, useState } from "react";
import SlideWrapper from "../slideWrapper";
import { Typography } from "@material-tailwind/react";
import { FormInput, PhoneInputComponent } from "@/components/General/form";
import { EyeIcon, EyeOffIcon, Navigation } from "lucide-react";
import { colors } from "@/constants/colors";

const BuyerFormSlide = () => {
	const {
		prevSlide,
		shopperProfileInputs,
		handleShopperProfileInputChange,
		setShopperProfileInputs,
		createShopper,
		isShopperCreating,
	} = useAuth();

	const [confirmPinCode, setConfirmPinCode] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [showPin, setShowPin] = useState(false);
	const [showConfirmPin, setShowConfirmPin] = useState(false);

	// Check if all required fields are filled and valid
	const isFormValid = () => {
		const {
			fullname,
			business_name,
			business_headquarters,
			password_pin,
			country_code,
			phone_number,
		} = shopperProfileInputs;

		return (
			fullname?.trim() !== "" &&
			business_name?.trim() !== "" &&
			business_headquarters?.trim() !== "" &&
			password_pin?.trim() !== "" &&
			confirmPinCode?.trim() !== "" &&
			country_code?.trim() !== "" &&
			phone_number?.trim() !== "" &&
			password_pin === confirmPinCode // Check if pins match
		);
	};

	const handlePhoneNumberChange = (value: string) => {
		const code = value.trim().slice(0, 4);
		const phone = value.trim().slice(4, value.length);

		setShopperProfileInputs((prev) => ({
			...prev,
			country_code: code,
			phone_number: phone,
		}));
	};

	useEffect(() => {
		if (!phoneNumber) return;
		handlePhoneNumberChange(phoneNumber);
	}, [phoneNumber]);

	const handleConfirmPinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setConfirmPinCode(e.target.value);
	};

	return (
		<SlideWrapper
			onBack={prevSlide}
			onContinue={createShopper}
			loading={isShopperCreating}
			isDisabled={!isFormValid()}
		>
			<Typography className='pt-6 font-semibold text-3xl text-[#0D121D] tracking-[-0.8px]'>
				Let's get you shopping on Kola!
			</Typography>
			<form className='pt-8 flex flex-col gap-y-6'>
				<FormInput
					label='Your Full Name'
					name='fullname'
					value={shopperProfileInputs.fullname}
					onChange={handleShopperProfileInputChange}
					placeholder='Enter your full name'
				/>

				<PhoneInputComponent
					value={phoneNumber}
					setValue={setPhoneNumber}
					fontSize='14'
				/>

				<FormInput
					label='Business Name'
					name='business_name'
					value={shopperProfileInputs.business_name}
					onChange={handleShopperProfileInputChange}
					placeholder='Enter business name'
				/>

				<div className='flex flex-col gap-2'>
					<FormInput
						label='Business Headquarters'
						name='business_headquarters'
						value={shopperProfileInputs.business_headquarters}
						onChange={handleShopperProfileInputChange}
						placeholder='Enter business headquarters'
					/>
					<button className='flex items-center text-[#4AA2AB]  gap-2'>
						<Navigation size={20} />{" "}
						<p className='text-xs font-semibold'>Use current location</p>
					</button>
				</div>

				<FormInput
					label='New Pin Code'
					type={showPin ? "text" : "password"}
					name='password_pin'
					value={shopperProfileInputs.password_pin}
					onChange={handleShopperProfileInputChange}
					placeholder='Enter pin code'
					icon={
						<div
							onClick={() => setShowPin(!showPin)}
							className='cursor-pointer'
						>
							{showPin ? (
								<EyeOffIcon color={colors.gray_3} />
							) : (
								<EyeIcon color={colors.gray_3} />
							)}
						</div>
					}
				/>

				<FormInput
					label='Confirm Pin Code'
					type={showConfirmPin ? "text" : "password"}
					name='confirm_pin_code'
					value={confirmPinCode}
					onChange={handleConfirmPinChange}
					placeholder='Confirm pin code'
					icon={
						<div
							onClick={() => setShowConfirmPin(!showConfirmPin)}
							className='cursor-pointer'
						>
							{showConfirmPin ? (
								<EyeOffIcon color={colors.gray_3} />
							) : (
								<EyeIcon color={colors.gray_3} />
							)}
						</div>
					}
				/>
			</form>
		</SlideWrapper>
	);
};

export default BuyerFormSlide;
