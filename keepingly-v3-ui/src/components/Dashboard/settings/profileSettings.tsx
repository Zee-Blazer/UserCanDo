import {
	EmailIcon,
	LicenceIcon,
	PhoneUserIcon,
	UserICon,
} from "@/assets/icons";
import { FormInput } from "@/components/General/form";
import { FormSelect } from "@/components/General/form/select";
import { SignupProps, UserProps } from "@/types";
import { USAstates } from "@/types/mockData";
import { Button, Typography } from "@material-tailwind/react";
import { PencilSimple } from "@phosphor-icons/react";
import React, { ChangeEvent } from "react";

interface SignupFormProps {
	profileData: UserProps | null;
	role: string;
	handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
	makeEditable: any;
	loading: boolean;
	action?: () => void;
}

const ProfileSettings = ({
	profileData,
	handleInputChange,
	action,
	loading,
}: SignupFormProps) => {
	return (
		<div className=''>
			<div className='flex items-center justify-between'>
				<Typography className='text-base font-bold text-black dark:text-white mb-4'>
					Profile settings
				</Typography>

				<Button
					variant='text'
					loading={loading}
					disabled={loading}
					onClick={action}
					className='px-4 gap-2 text-pry flex items-center justify-center rounded-md cursor-pointer'
				>
					<Typography className='lowercase first-letter:capitalize font-bold'>
						Update Profile
					</Typography>
					<PencilSimple size={16} />
				</Button>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
				<FormInput
					placeholder='First name'
					required
					type='text'
					value={profileData?.first_name || ""}
					name='first_name'
					onChange={handleInputChange}
					icon={<UserICon />}
				/>
				<FormInput
					placeholder='Last name'
					required
					type='text'
					value={profileData?.last_name || ""}
					name='last_name'
					onChange={handleInputChange}
					icon={<UserICon />}
				/>

				<FormSelect
					placeholder='State'
					onSelect={() => {}}
					options={USAstates}
					required
					value={profileData?.state || ""}
					name='state'
					onChange={handleInputChange}
				/>

				<FormInput
					placeholder='Phone number'
					required
					icon={<PhoneUserIcon />}
					value={profileData?.phone_number || ""}
					name='phone_number'
					type='tel'
					onChange={handleInputChange}
				/>
				<FormInput
					placeholder='Email address'
					required
					type='email'
					icon={<EmailIcon />}
					value={profileData?.email || ""}
					readOnly
					name='email'
					onChange={handleInputChange}
				/>
				{/* <FormInput
					placeholder='Role'
					required
					type='text'
					value={profileData?.role || ""}
					name='role'
					readOnly
					onChange={handleInputChange}
					icon={<UserICon />}
				/> */}
			</div>
		</div>
	);
};

export default ProfileSettings;
