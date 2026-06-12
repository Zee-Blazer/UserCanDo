import { formatCurrency } from "@/utils/currencyFormatter";
import { Typography } from "@material-tailwind/react";
import React from "react";

interface InvPriceDetailsProps {
	price: number;
	quantity: number;
}
const InvPriceDetails = ({ price, quantity }: InvPriceDetailsProps) => {
	return (
		<div className='flex flex-col md:flex-row justify-between md:items-center gap-4 border-[1px] p-4 rounded-md border-borderLight dark:border-borderDark mt-7'>
			<div className='flex items-center gap-2'>
				<div className=''>
					<Typography className='leading-none text-xs'>
						Purchase <br /> price
					</Typography>
				</div>
				<Typography className='text-4xl font-bold text-black dark:text-white'>
					{formatCurrency(price)}
				</Typography>
			</div>
			<div className='flex items-center gap-2'>
				<div className=''>
					<Typography className='leading-none text-xs'>
						Inventory <br /> quantity
					</Typography>
				</div>
				<Typography className='text-4xl font-bold text-black dark:text-white'>
					{quantity}
				</Typography>
			</div>
		</div>
	);
};

export default InvPriceDetails;
