import React, { ChangeEvent, useState } from "react";
import { FormInput } from "../General/form";
import { FormSelect } from "../General/form/select";
import { EmailIcon, LicenceIcon, UserICon } from "@/assets/icons";
import { Eye, EyeOff } from "lucide-react";
import { SignupProps } from "@/types";
import { USAstates } from "@/types/mockData";
import { Typography } from "@material-tailwind/react";
import Link from "next/link";

interface SignupFormProps {
	formErrors: SignupProps | null;
	signupData: SignupProps | null;
	role: string;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const SignupForm = ({
	formErrors,
	signupData,
	handleInputChange,
	role,
}: SignupFormProps) => {
	const [isPasswordShown, setIsPasswordShown] = useState(false);
	const [isConfirmPasswordShown, setIsConfirmPasswordShown] = useState(false);
	return (
		<div className='flex flex-col gap-4 my-8'>
			<FormInput
				placeholder='First name'
				required
				type='text'
				value={signupData?.first_name || ""}
				name='first_name'
				onChange={handleInputChange}
				error={formErrors?.first_name}
				icon={<UserICon />}
			/>
			<FormInput
				placeholder='Last name'
				required
				type='text'
				value={signupData?.last_name || ""}
				name='last_name'
				onChange={handleInputChange}
				error={formErrors?.last_name}
				icon={<UserICon />}
			/>
			<FormInput
				placeholder='Email address'
				required
				type='email'
				icon={<EmailIcon />}
				value={signupData?.email || ""}
				name='email'
				onChange={handleInputChange}
				error={formErrors?.email}
			/>
			{role === "broker" && (
				<>
					<FormSelect
						placeholder='State'
						onSelect={() => {}}
						options={USAstates}
						required
						value={signupData?.state || ""}
						name='state'
						onChange={handleInputChange}
						error={formErrors?.state}
					/>

					<FormInput
						placeholder='License'
						required
						icon={<LicenceIcon />}
						value={signupData?.license || ""}
						name='license'
						onChange={handleInputChange}
						error={formErrors?.license}
					/>

					<FormInput
						placeholder='Broker name'
						required
						icon={<LicenceIcon />}
						value={signupData?.broker_name || ""}
						name='broker_name'
						onChange={handleInputChange}
						error={formErrors?.broker_name}
					/>
				</>
			)}

			<FormInput
				placeholder='Password'
				required
				type={isPasswordShown ? "text" : "password"}
				icon={
					<i
						className='text-pry_1 text-gray_3 dark:text-gray_4'
						onClick={() => setIsPasswordShown(!isPasswordShown)}
					>
						{isPasswordShown ? <EyeOff size={16} /> : <Eye size={16} />}
					</i>
				}
				value={signupData?.password || ""}
				name='password'
				onChange={handleInputChange}
				error={formErrors?.password}
			/>

			<FormInput
				placeholder='Confirm password'
				required
				type={isConfirmPasswordShown ? "text" : "password"}
				icon={
					<i
						className='text-pry_1 text-gray_3 dark:text-gray_4'
						onClick={() => setIsConfirmPasswordShown(!isConfirmPasswordShown)}
					>
						{isConfirmPasswordShown ? <EyeOff size={16} /> : <Eye size={16} />}
					</i>
				}
				value={signupData?.confirm_password || ""}
				name='confirm_password'
				onChange={handleInputChange}
				error={formErrors?.confirm_password}
			/>
			<Typography>
				By signing up, you agree that you are a US resident, 18 years or older,
				and you accept Keepingly’s{" "}
				<Link className='text-pry' href={"#"}>
					Terms and conditions
				</Link>{" "}
				and{" "}
				<Link className='text-pry' href={"#"}>
					Privacy policy
				</Link>
				.
			</Typography>
		</div>
	);
};

export default SignupForm;
