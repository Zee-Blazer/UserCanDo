import { Typography } from "@material-tailwind/react";
import { FileDoc, X } from "@phosphor-icons/react";
import React from "react";

const DocumentListCard = () => {
	return (
		<div className='rounded-md dark:bg-darkBg bg-lightBg p-4 border-borderLight dark:border-borderDark border-[1px] flex justify-between items-center gap-4'>
			<div className='flex items-center gap-2'>
				<FileDoc />
				<Typography>Receipt 2020-05-12</Typography>
			</div>
			<X />
		</div>
	);
};

export default DocumentListCard;
