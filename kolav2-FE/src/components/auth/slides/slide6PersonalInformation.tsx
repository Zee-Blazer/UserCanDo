import { useEffect, useState } from "react";
import SlideWrapper from "../slideWrapper";
import { Typography } from "@material-tailwind/react";
import { PhoneInputComponent } from "@/components/General/form";
import { isValidPhoneNumber } from "react-phone-number-input";
import {
	AuthFormInput,
	AuthFormSelect,
} from "@/components/General/form/authFormInput";
import FileInputComponent from "@/components/General/form/fileInputComponent";
import { useAuth } from "@/context/authContext";

const Slide6PersonalInformation = () => {
	const {
		prevSlide,
		nextSlide,
		setUserProfileInputs,
		userProfileInputs,
		handleProfileInputChange,
		createProfile,
		isProfileCreating,
	} = useAuth();
	const [phoneNumberValue, setPhoneNumberValue] = useState("");
	const handleChange = (field: string, value: string) => {
		setUserProfileInputs((prev) => ({ ...prev, [field]: value }));
	};

	// const formValues: CreateProfileProps = {};

	const handleFileChange = (file: File | null) => {
		setUserProfileInputs((prev) => ({
			...prev,
			file: file,
		}));
	};

	const isFormComplete = Object.values(userProfileInputs).every(
		(value) => !!value
	);

	useEffect(() => {
		if (phoneNumberValue) {
			setUserProfileInputs((prev) => ({
				...prev,
				mobile_number: phoneNumberValue,
			}));
		}
	}, [phoneNumberValue]);

	return (
		<SlideWrapper
			isDisabled={!isFormComplete || !isValidPhoneNumber(phoneNumberValue)}
			onContinue={createProfile}
			onBack={prevSlide}
			loading={isProfileCreating}
		>
			<Typography className='pt-6 font-semibold text-3xl text-[#0D121D] tracking-[-0.8px]'>
				Personal Details
			</Typography>
			<form className='pt-8 flex flex-col gap-y-6'>
				<div className='flex justify-between align-center gap-x-4'>
					<AuthFormInput
						label='First Name'
						value={userProfileInputs.first_name}
						slug='first_name'
						handleChange={handleChange}
						required
						bgColor='white'
					/>

					<AuthFormInput
						label='Last Name'
						value={userProfileInputs.last_name}
						slug='last_name'
						handleChange={handleChange}
						required
						bgColor='white'
					/>
				</div>
				<div className='flex justify-between align-center gap-x-4'>
					<div className='w-full'>
						<AuthFormSelect
							label='Gender'
							placeholder='Select Gender'
							options={["male", "female", "other"]}
							handleChange={handleChange}
							required
							slug='gender'
							value={userProfileInputs.gender}
							paddingY='3'
							bgColor='white'
						/>
					</div>

					<AuthFormInput
						label='Date of birth'
						type='date'
						value={userProfileInputs.date_of_birth}
						slug='date_of_birth'
						handleChange={handleChange}
						required
						bgColor='white'
					/>
				</div>
				<AuthFormInput
					label='Email'
					value={userProfileInputs.email}
					slug='email'
					handleChange={handleChange}
					type='email'
					required
					bgColor='white'
				/>
				<PhoneInputComponent
					value={phoneNumberValue}
					setValue={setPhoneNumberValue}
					fontSize='14'
				/>

				<div className='flex flex-col gap-y-2'>
					<label>
						<Typography className='text-sm font-normal'>
							Upload Profile Picture
						</Typography>
					</label>
					<FileInputComponent onFileChange={handleFileChange} />
				</div>
			</form>
		</SlideWrapper>
	);
};

export default Slide6PersonalInformation;
