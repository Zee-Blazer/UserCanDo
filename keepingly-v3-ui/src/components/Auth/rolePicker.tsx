import { authRoles } from "@/types/mockData";
import { Typography } from "@material-tailwind/react";
import { Check } from "lucide-react";
import React, { Dispatch, useState } from "react";

interface RolePickerProps {
	setRole: Dispatch<string>;
}
const RolePicker = ({ setRole }: RolePickerProps) => {
	const [selectedIndex, setSelectedIndex] = useState(0);
	return (
		<div className='flex flex-col gap-4 my-6'>
			{authRoles.map(({ desc, icon, role, title }, index) => {
				return (
					<div
						onClick={() => {
							setRole(role);
							setSelectedIndex(index);
						}}
						className={`${
							selectedIndex === index ? "border-pry" : "border-gray_5"
						} border-[1px] p-6 rounded-lg cursor-pointer relative `}
						key={index}
					>
						<i>{icon}</i>

						<Typography className='text-black dark:text-white mt-4 mb-2 font-medium'>
							{title}
						</Typography>
						<Typography>{desc}</Typography>
						{selectedIndex === index && (
							<Check className='w-7 h-7 bg-pry text-white rounded-full p-1 flex items-center justify-center absolute -top-2 -right-2' />
						)}
					</div>
				);
			})}
		</div>
	);
};

export default RolePicker;
