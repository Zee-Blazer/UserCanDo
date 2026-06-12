import IconContainer from "@/components/General/iconContainer";
import { Button, Typography } from "@material-tailwind/react";
import { FolderSimpleUser } from "@phosphor-icons/react";
import React from "react";

interface AppraiserFormHeaderProps {
	addAppraiser: () => void;
	loading: boolean;
}
const AppraiserFormHeader = ({
	addAppraiser,
	loading,
}: AppraiserFormHeaderProps) => {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
			<div className='flex items-center gap-4'>
				<IconContainer icon={<FolderSimpleUser size={20} />} />
				<Typography className='text-black dark:text-white font-medium text-2xl'>
					Invite an Appraiser
				</Typography>
			</div>
			<Button
				onClick={addAppraiser}
				loading={loading}
				className='border-pry text-pry lowercase first-letter:capitalize text-base shadow-none font-medium w-fit'
				variant='outlined'
			>
				Add
			</Button>
		</div>
	);
};

export default AppraiserFormHeader;
