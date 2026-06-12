import IconContainer from "@/components/General/iconContainer";
import { Button, Typography } from "@material-tailwind/react";
import { Person, Plus } from "@phosphor-icons/react";
import React from "react";

const FormHeader = ({ addBroker }: { addBroker: () => void }) => {
	return (
		<div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
			<div className='flex items-center gap-4'>
				<IconContainer icon={<Person size={20} />} />
				<Typography className='text-black dark:text-white font-medium text-2xl'>
					Add an agent
				</Typography>
			</div>
			<Button
				className='border-pry text-pry lowercase first-letter:capitalize text-base shadow-none font-medium w-fit'
				variant='outlined'
				onClick={addBroker}
			>
				Add agent
			</Button>
		</div>
	);
};

export default FormHeader;
