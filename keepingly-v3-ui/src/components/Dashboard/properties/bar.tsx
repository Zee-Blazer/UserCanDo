import { Typography } from "@material-tailwind/react";
import React from "react";

interface BarProps {
	label: string;
	value: number;
}
const Bar = ({ label, value }: BarProps) => {
	return (
		<div className='flex flex-col gap-2 items-center justify-center'>
			<div className='h-[108px] w-full max-w-[37px] flex flex-col items-end justify-end overflow-hidden rounded-md bg-[#00000029] dark:bg-[#FFFFFF29]'>
				<div
					className='w-full bg-black dark:bg-[#FFFFFF]'
					style={{ height: `${(value / 100) * 100}%` }}
				/>
			</div>
			<Typography className='text-xs text-center'>{label}</Typography>
		</div>
	);
};

export default Bar;
