import { useState } from "react";
import { Eye } from "@phosphor-icons/react";
import Link from "next/link";
import { FormInput, PhoneInputComponent } from "../General/form";
import { colors } from "@/constants/colors";
import { EyeOff } from "lucide-react";
import { ROUTES } from "@/constants/routes";

interface PhonePasswordInputProps {
	value: string;
	setValue: (value: string) => void;
	pincode: string;
	setPincode: (value: string) => void;
	showForgotPassword?: boolean;
}

const PhonePasswordInput = ({
	value,
	setValue,
	pincode,
	setPincode,
	showForgotPassword = true,
}: PhonePasswordInputProps) => {
	const [isPinShown, setIsPinShown] = useState(false);

	const togglePincodeVisibility = () => {
		setIsPinShown(!isPinShown);
	};

	return (
		<div className='flex flex-col gap-6 mt-5 pt-6 text-sm text-[474A4E]'>
			<PhoneInputComponent value={value} setValue={setValue} />
			<div className='flex flex-col gap-4'>
				<FormInput
					label='Password'
					placeholder='Enter your password'
					type={isPinShown ? "text" : "password"}
					borderColor={pincode ? "#FFD68F" : "#F1F1F1"}
					borderWidth={2}
					bgColor='transparent'
					value={pincode}
					onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
						setPincode(e.target.value)
					}
					required
					icon={
						isPinShown ? (
							<EyeOff color={colors.gray_5} size={15} />
						) : (
							<Eye color={colors.gray_5} size={15} />
						)
					}
					iconPosition='right'
					iconClick={togglePincodeVisibility}
				/>
				{showForgotPassword && (
					<Link
						className='text-blue_pry text-sm font-semibold'
						href={ROUTES.resetPassword}
					>
						Forgot password?
					</Link>
				)}
			</div>
		</div>
	);
};

export default PhonePasswordInput;
