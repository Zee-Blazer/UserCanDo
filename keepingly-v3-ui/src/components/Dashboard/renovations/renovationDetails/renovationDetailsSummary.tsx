import { FormInput } from "@/components/General/form";
import { formatCurrency } from "@/utils/currencyFormatter";
import { Typography } from "@material-tailwind/react";
import { Calendar } from "@phosphor-icons/react";
import React from "react";

interface RenovationDetailsSummaryProps {
	dateStart: string;
	dateEnd: string;
	totalCost: number;
}
const RenovationDetailsSummary = ({
	dateEnd,
	dateStart,
	totalCost,
}: RenovationDetailsSummaryProps) => {
	return (
		<div className='grid gap-4 grid-cols-1 md:grid-cols-2 justify-between'>
			<div>
				<Typography>Total cost</Typography>
				<Typography className='text-3xl font-semibold mt-3'>
					{formatCurrency(totalCost)}
				</Typography>
			</div>
			<div className='flex flex-col sm:flex-row gap-4'>
				<FormInput
					icon={<Calendar size={18} />}
					type='date'
					readOnly
					value={dateStart}
					onChange={() => {}}
					label='Date started'
				/>
				<FormInput
					icon={<Calendar size={18} />}
					type='date'
					readOnly
					value={dateEnd}
					onChange={() => {}}
					label='Date completed'
				/>
			</div>
		</div>
	);
};

export default RenovationDetailsSummary;
