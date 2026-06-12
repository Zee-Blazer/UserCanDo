import { useDashboardSelector } from "@/Redux/selectors";
import { Typography } from "@material-tailwind/react";
import React from "react";

const InvitesCount = () => {
	const { overview } = useDashboardSelector();
	return (
		<div>
			<div className='flex gap-2'>
				<Typography className='text-3xl font-medium text-black dark:text-white'>
					{overview?.total_invites}
				</Typography>
				<div className=''>
					<Typography className='leading-none text-xs'>
						Invites <br /> sent
					</Typography>
				</div>
			</div>
			<div className='flex gap-2 mt-4'>
				<Typography className='text-3xl font-medium text-black dark:text-white'>
					{overview?.total_invites_accepeted}
				</Typography>
				<div className=''>
					<Typography className='leading-none text-xs'>
						Invites <br /> accepted
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default InvitesCount;
