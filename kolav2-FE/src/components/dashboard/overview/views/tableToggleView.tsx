import { Typography } from "@material-tailwind/react";
import React, { Dispatch, SetStateAction } from "react";

interface TableToggleViewProps {
	activeState: number;
	setActiveState: Dispatch<SetStateAction<number>>;
	toggleList: string[];
}
const TableToggleView = ({
	activeState,
	setActiveState,
	toggleList,
}: TableToggleViewProps) => {
	return (
		<div className='flex items-center gap-2'>
			{toggleList.map((item, index) => (
				<Typography
					key={index}
					className={`text-sm ${
						index === activeState ? "text-black" : "text-gray_4"
					} cursor-pointer select-none`}
					onClick={() => setActiveState(index)}
				>
					{item}
				</Typography>
			))}
		</div>
	);
};

export default TableToggleView;
