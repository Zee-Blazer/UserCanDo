import { FormInput, FormSelect } from "@/components/General/form";
import { UIGuard } from "@/components/guards/roleGuard";
import { useDash } from "@/context/dashboardContext";
import { useDashboardSelector } from "@/Redux/selectors";
import { Button } from "@material-tailwind/react";
import { Navigation, Pencil } from "lucide-react";
import React, { ChangeEvent, useState } from "react";

const LocationDetails = () => {
	const [isEdit, setIsEdit] = useState(false);
	const { userProfile } = useDashboardSelector();
	const { handleProfileUpdate, isProfileUpdating } = useDash();
	const [user, setUser] = useState<UserProfile>(userProfile);
	const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUser({ ...user, [e.target.name]: e.target.value });
	};
	return (
		<div className='border border-y-[#D5D8DC] px-12 py-8 my-10'>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
				<div className='space-y-4'>
					<FormInput
						label='Location / delivery address'
						placeholder='Enter location'
						name='location'
						readOnly={!isEdit}
						value={user?.location || ""}
						onChange={handleChange}
					/>
					<button className='flex items-center text-pry2 gap-2'>
						<Navigation size={20} />{" "}
						<p className='text-xs font-semibold'>Use current location</p>
					</button>
				</div>
				<FormSelect
					label='Country'
					placeholder='Select'
					options={["Ghana", "Nigeria"]}
					name='country'
					readOnly={!isEdit}
					value={user?.country || ""}
					onChange={handleChange}
				/>
				<FormInput
					label='Email'
					type='email'
					placeholder='email@example.com'
					name='email'
					readOnly={!isEdit}
					value={user?.email || ""}
					onChange={handleChange}
				/>
			</div>

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
							onClick={() => {
								setIsEdit(true);
							}}
							className='flex gap-3 bg-pry2 text-white text-sm p-3 font-medium rounded-[0.3125rem] normal-case'
							loading={isProfileUpdating}
							disabled={isProfileUpdating}
						>
							Edit Location <Pencil size={18} />
						</Button>
					)}
				</div>
			</UIGuard>
		</div>
	);
};

export default LocationDetails;
