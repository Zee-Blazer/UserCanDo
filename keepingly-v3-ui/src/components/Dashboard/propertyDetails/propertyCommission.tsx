import { formatCurrency } from "@/utils/currencyFormatter";
import { Typography } from "@material-tailwind/react";
import React from "react";

interface PropertyCommissionProps {
	closingPrice: number;
	totalCommission: number;
}
const PropertyCommission = ({
	closingPrice,
	totalCommission,
}: PropertyCommissionProps) => {
	return (
		<div className='flex flex-col lg:flex-row lg:items-center gap-4 p-4 px-4 rounded-md border border-borderLight dark:border-borderDark mt-3'>
			<div className='flex gap-2 items-center'>
				<Typography className='text-4xl font-semibold text-black dark:text-white'>
					{formatCurrency(closingPrice)}
				</Typography>
				<div className=''>
					<Typography className='leading-none text-xs'>
						Closing <br /> price
					</Typography>
				</div>
			</div>
			<div className='flex gap-2 items-center'>
				<Typography className='text-4xl font-semibold text-black dark:text-white'>
					{formatCurrency(totalCommission)}
				</Typography>
				<div className=''>
					<Typography className='leading-none text-xs'>
						Total <br /> commission
					</Typography>
				</div>
			</div>
		</div>
	);
};

export default PropertyCommission;
