import IconContainer from "@/components/General/iconContainer";
import { Button, Typography } from "@material-tailwind/react";
import { Plus, SprayBottle } from "@phosphor-icons/react";
import React from "react";

const RenovationFormHeader = () => {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
			<div className='flex items-center gap-4'>
				<IconContainer icon={<SprayBottle size={20} />} />
				<Typography className='text-black dark:text-white font-medium text-2xl normal-case'>
					Add Renovation
				</Typography>
			</div>
		</div>
	);
};

export default RenovationFormHeader;
