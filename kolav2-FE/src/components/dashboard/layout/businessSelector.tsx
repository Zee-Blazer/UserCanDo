import { FormInput } from "@/components/General/form";
import { useDash } from "@/context/dashboardContext";
import { setActiveBusiness } from "@/Redux/features/dashboardSlice";
import { useDashboardSelector } from "@/Redux/selectors";
import {
	Button,
	Dialog,
	IconButton,
	Typography,
} from "@material-tailwind/react";
import { X } from "@phosphor-icons/react";
import { Search } from "lucide-react";
import React, { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";

interface BusinessSelector {
	open: boolean;
	onClose: () => void;
	handler: () => void;
}

const BusinessSelector = ({ onClose, open, handler }: BusinessSelector) => {
	const { businesses } = useDashboardSelector();
	const { setFetchCount } = useDash();
	const dispatch = useDispatch();
	const [searchQuery, setSearchQuery] = useState("");

	const filteredBusinesses =
		businesses?.filter((business) =>
			business?.business_name?.toLowerCase().includes(searchQuery.toLowerCase())
		) || [];

	return (
		<Dialog size='sm' open={open} handler={handler} className='p-8'>
			<div className='flex items-center gap-4 mb-6'>
				<X onClick={onClose} className='cursor-pointer' />

				<Typography className='text-lg text-pry_1 font-semibold'>
					Select Business
				</Typography>
			</div>

			<FormInput
				placeholder='Search business here'
				icon={<Search />}
				iconPosition='left'
				value={searchQuery}
				onChange={(e: ChangeEvent<HTMLInputElement>) =>
					setSearchQuery(e.target.value)
				}
			/>

			<div className='mt-4 flex flex-col gap-4'>
				{filteredBusinesses?.map((business, index) => {
					const [a, b] = business?.business_name.split(" ");
					const firstChar = a?.charAt(0).toUpperCase() || "";
					const secondChar = b?.charAt(0).toUpperCase() || "";

					return (
						<Button
							key={index}
							className='flex items-center gap-4 bg-transparent shadow-none p-0 normal-case'
							variant='text'
							onClick={() => {
								dispatch(setActiveBusiness(business));
								setFetchCount((prev) => prev + 1);
								onClose();
							}}
						>
							<div className='w-10 h-10 rounded-full bg-pry2 bg-opacity-10 font-bold flex items-center justify-center'>
								{firstChar}
								{secondChar}
							</div>
							<Typography className='text-pry_1 font-medium'>
								{business.business_name}
							</Typography>
						</Button>
					);
				})}
			</div>
		</Dialog>
	);
};

export default BusinessSelector;
