import { setActiveProperty } from "@/Redux/features/dashboardSlice";
import { useDashboardSelector } from "@/Redux/selectors";
import {
	Button,
	Popover,
	PopoverContent,
	PopoverHandler,
	Typography,
} from "@material-tailwind/react";
import { MapPin, Plus } from "@phosphor-icons/react";
import { ChevronDown } from "lucide-react";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import AddProperty from "./addProperty";

const PropertySelector = () => {
	const { properties, activeProperty } = useDashboardSelector();
	const dispatch = useDispatch();
	const [isOpen, setisOpen] = useState(false);
	const [isAddPropModalShown, setisAddPropModalShown] = useState(false);
	const shouldShow = properties?.length > 0;
	return (
		<>
			{shouldShow ? (
				<Popover open={isOpen} placement='bottom-end'>
					<PopoverHandler onClick={() => setisOpen(!isOpen)}>
						<div className='flex items-start gap-2 cursor-pointer'>
							<Typography className='select-none'>
								{activeProperty?.address} {activeProperty?.city}{" "}
								{activeProperty?.state}
							</Typography>
							<ChevronDown className='text-xl mt-1' />
						</div>
					</PopoverHandler>
					<PopoverContent className='dark:bg-black bg-white border-none flex flex-col gap-4'>
						{properties.map((property, index) => {
							const isActive = activeProperty?.id === property.id;
							return (
								<div
									key={`${index}-${property.id}`}
									className='flex items-start gap-2 cursor-pointer hover:opacity-50 transition'
									onClick={() => {
										dispatch(setActiveProperty(property));
										setisOpen(false);
									}}
								>
									<MapPin
										className={`${
											isActive ? "text-pry" : "text-black dark:text-gray_2"
										} text-xl mt-1`}
									/>
									<Typography
										className={`${
											isActive ? "text-pry" : "text-black dark:text-gray_2"
										}`}
									>
										{property.address} {property.city} {property.state}
									</Typography>
								</div>
							);
						})}

						<Button
							className='flex items-center gap-2 p-0 mt-4 bg-transparent'
							onClick={() => {
								setisOpen(false);
								setisAddPropModalShown(true);
							}}
						>
							<Plus className='text-pry' />
							<Typography className='text-pry font-medium lowercase first-letter:capitalize'>
								Add Property
							</Typography>
						</Button>
					</PopoverContent>
				</Popover>
			) : (
				<Button
					className='flex items-center gap-2 p-0 mt-4 bg-transparent'
					onClick={() => {
						setisOpen(false);
						setisAddPropModalShown(true);
					}}
				>
					<Plus className='text-pry' />
					<Typography className='text-pry font-medium lowercase first-letter:capitalize'>
						Add Property
					</Typography>
				</Button>
			)}

			<AddProperty
				handleOpen={() => setisAddPropModalShown(!isAddPropModalShown)}
				open={isAddPropModalShown}
			/>
		</>
	);
};

export default PropertySelector;
