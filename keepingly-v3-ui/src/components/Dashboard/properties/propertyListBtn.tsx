import { useAuthSelector } from "@/Redux/selectors";
import { Button } from "@material-tailwind/react";
import React from "react";

interface PropertyListBtnInterface {
	btnAction: () => void;
	btnAction2: () => void;
}
const PropertyListBtn = ({
	btnAction,
	btnAction2,
}: PropertyListBtnInterface) => {
	const { user } = useAuthSelector();
	return (
		<div className='flex gap-4'>
			{user?.role?.includes("broker") && (
				<Button
					variant='outlined'
					className='border-[1px] border-pry text-pry lowercase first-letter:capitalize text-base'
					onClick={btnAction2}
				>
					Bulk upload
				</Button>
			)}
			<Button
				onClick={btnAction}
				className='bg-pry lowercase first-letter:capitalize text-base'
			>
				Add property
			</Button>
		</div>
	);
};

export default PropertyListBtn;
