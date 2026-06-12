import { ImageICon } from "@/assets/icons";
import { Badge, Tooltip, Typography } from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import AgentCardDropdown from "./brokerCardDropdown";
import LazyImage from "@/components/General/imageComp";
import { AgentItemProps } from "@/types";

interface AgentCardProps {
	item: AgentItemProps;
}
const AgentCard = ({ item }: AgentCardProps) => {
	const {
		first_name,
		last_name,
		email,
		profile_image,
		user_id,
		role,
		is_suspended,
	} = item;
	const name = first_name + " " + last_name;

	return (
		<Badge
			withBorder
			color={is_suspended ? "orange" : "green"}
			placement='top-end'
		>
			<div className='overflow-hidden w-full'>
				<div className='bg-lightBg dark:bg-darkBg w-full h-[120px] flex items-center justify-center'>
					{profile_image ? (
						<LazyImage
							alt='image'
							width={50}
							className='w-full h-full object-cover'
							height={50}
							src={profile_image}
						/>
					) : (
						<ImageICon />
					)}
				</div>

				<div className='flex justify-between gap-2 mt-4 items-center'>
					<Typography className='font-medium'>
						{name.length > 10 ? `${name.slice(0, 10)}...` : name}
					</Typography>
					<AgentCardDropdown
						role={role}
						user_id={user_id}
						is_suspended={is_suspended}
					/>
				</div>
				<Tooltip
					className='bg-white dark:bg-black'
					content={
						<div className=''>
							<Typography className='font-medium text-black dark:text-white'>
								{name}
							</Typography>
							<Typography
								variant='small'
								className='font-normal opacity-80 text-black dark:text-white'
							>
								{email}
							</Typography>
						</div>
					}
				>
					<Typography className='text-xs cursor-pointer'>
						{" "}
						{email.length > 20 ? `${email.slice(0, 20)}...` : email}
					</Typography>
				</Tooltip>
			</div>
		</Badge>
	);
};

export default AgentCard;
