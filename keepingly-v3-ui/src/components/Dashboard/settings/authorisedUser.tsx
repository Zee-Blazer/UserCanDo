import { EmailIcon, PhoneUserIcon, UserICon } from "@/assets/icons";
import { FormInput } from "@/components/General/form";
import { AuthorisedUserProps } from "@/types";
import { Button, Typography } from "@material-tailwind/react";
import { PencilSimple } from "@phosphor-icons/react";
import React, { ChangeEvent } from "react";

interface AuthorisedUser {
	authorisedUserData: AuthorisedUserProps | null;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	loading: boolean;
	action?: () => void;
}

const AuthorisedUser = ({
	authorisedUserData,
	handleInputChange,
	action,
	loading,
}: AuthorisedUser) => {
	return (
		<div className='mt-4'>
			<div className='flex items-center justify-between'>
				<Typography className='text-base font-bold text-black dark:text-white mb-4'>
					Authorised User
				</Typography>

				<Button
					variant='text'
					loading={loading}
					disabled={loading}
					onClick={action}
					className='px-4 gap-2 text-pry flex items-center justify-center rounded-md cursor-pointer'
				>
					<Typography className='lowercase first-letter:capitalize font-bold'>
						Update Authorised User Information
					</Typography>
					<PencilSimple size={16} />
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<FormInput
					placeholder='First name'
					required
					type='text'
					value={authorisedUserData?.first_name || ""}
					name='first_name'
					onChange={handleInputChange}
					icon={<UserICon />}
				/>
				<FormInput
					placeholder='Last name'
					required
					type='text'
					value={authorisedUserData?.last_name || ""}
					name='last_name'
					onChange={handleInputChange}
					icon={<UserICon />}
				/>
				<FormInput
					placeholder='Middle name'
					required
					type='text'
					value={authorisedUserData?.middle_name || ""}
					name='middle_name'
					onChange={handleInputChange}
					icon={<UserICon />}
				/>

				<FormInput
					placeholder='Phone number'
					required
					icon={<PhoneUserIcon />}
					value={authorisedUserData?.phone_number || ""}
					name='phone_number'
					type='tel'
					onChange={handleInputChange}
				/>
				<FormInput
					placeholder='Email address'
					required
					type='email'
					icon={<EmailIcon />}
					value={authorisedUserData?.email || ""}
					name='email'
					onChange={handleInputChange}
				/>
			</div>
		</div>
	);
};

export default AuthorisedUser;
