import { FormInput } from "@/components/General/form";
import { UIGuard } from "@/components/guards/roleGuard";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button } from "@material-tailwind/react";
import { Pencil } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

const ProfileDetails = () => {
	const [isEdit, setIsEdit] = useState(false);
	const { userProfile } = useDashboardSelector();
	const { handleProfileUpdate, isProfileUpdating } = useDash();
	const [user, setUser] = useState<UserProfile>(userProfile);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	return (
		<div className='border border-y-[#D5D8DC] px-12 py-8 my-10'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-10 mb-4'>
				<FormInput
					label='First Name'
					value={user?.first_name || ""}
					onChange={handleChange}
					name='first_name'
					placeholder='Enter First name'
					readOnly={!isEdit}
				/>
				<FormInput
					label='Last Name'
					value={user?.last_name || ""}
					onChange={handleChange}
					name='last_name'
					placeholder='Enter Last name'
					readOnly={!isEdit}
				/>
				<FormInput
					label='Phone Number'
					value={user?.mobile_number || ""}
					onChange={handleChange}
					name='mobile_number'
					placeholder='Enter phone number'
					readOnly={!isEdit}
				/>
			</div>
			<FormInput
				label='Bio'
				value={user?.bio || ""}
				onChange={handleChange}
				name='bio'
				placeholder='Enter bio'
				readOnly={!isEdit}
			/>
			<UIGuard permission="UPDATE_PROFILE">
				<div className='flex gap-3 justify-end mt-8'>
					{isEdit ? (
						<Button
							className='bg-[#F8FAFB] text-pry2 text-sm p-3 font-medium rounded-[0.3125rem] border border-[#D0D5DD66] shadow-[0px_1px_2px_0px_#1018280D] normal-case'
							onClick={() => {
								setIsEdit(false);
								handleProfileUpdate(user);
							}}
							loading={isProfileUpdating}
							disabled={isProfileUpdating}
						>
							Save
						</Button>
					) : (
						<Button
							className='flex gap-3 bg-pry2 text-white text-sm p-3 font-medium rounded-[0.3125rem] normal-case'
							onClick={() => setIsEdit(true)}
							loading={isProfileUpdating}
							disabled={isProfileUpdating}
						>
							Edit personal profile <Pencil size={18} />
						</Button>
					)}
				</div>
			</UIGuard>
		</div>
	);
};

export default ProfileDetails;
