import React from "react";
import { FormInput } from "@/components/General/form";
import { FormSelect } from "@/components/General/form/select";
import { Button } from "@material-tailwind/react";
import {
	House,
	MagnifyingGlass,
	MapPinLine,
	Money,
} from "@phosphor-icons/react";

interface PropertyFilterProps {
	onSearchChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	states: string[];
	selectedState: string;
	onStateChange: (state: string) => void;
}

const PropertyFilter: React.FC<PropertyFilterProps> = ({
	onSearchChange,
	states,
	selectedState,
	onStateChange,
}) => {
	return (
		<div className='flex justify-between items-center gap-4'>
			<div className='w-full lg:max-w-sm'>
				<FormInput
					icon={<MagnifyingGlass size={20} />}
					iconPosition='left'
					placeholder='Search'
					onChange={onSearchChange}
				/>
			</div>
			<div className='hidden lg:flex gap-4'>
				<FormSelect
					options={states}
					placeholder='Location'
					icon={<MapPinLine size={20} />}
					value={selectedState}
					onChange={(e) => onStateChange(e.target.value)}
				/>

				{/* <Button
					variant='outlined'
					className='lowercase first-letter:capitalize text-pry border-pry whitespace-nowrap'
					disabled={true}
				>
					Apply filters
				</Button> */}
			</div>
		</div>
	);
};

export default PropertyFilter;
