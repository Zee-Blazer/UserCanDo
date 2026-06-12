import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import CommissionRow from "./commissionRow";
import { toast } from "react-toastify";
import { AddPropertyProps, CommissionProps } from "@/types";
import CurrencyInput from "@/components/General/form/currencyInput";
import { CurrencyCircleDollar } from "@phosphor-icons/react";
import { formatCurrency } from "@/utils/currencyFormatter";

interface Step2Props {
	commissionArr: CommissionProps[];
	setCommissionArr: React.Dispatch<React.SetStateAction<CommissionProps[]>>;
	handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	propertyDetails: AddPropertyProps | null;
	formErrors: AddPropertyProps | null;
}

const Step2 = ({
	commissionArr,
	setCommissionArr,
	formErrors,
	handleChange,
	propertyDetails,
}: Step2Props) => {
	const [isTierAdding, setIsTierAdding] = useState(false);
	const [totalCommission, setTotalCommission] = useState<number>(0);
	const [isChecked, setIsChecked] = useState(false);
	const addCommission = () => {
		const lastCommission = commissionArr[commissionArr.length - 1];
		if (lastCommission) {
			const above = Number(lastCommission.above || 0);
			const up_to = Number(lastCommission.up_to || 0);
			const commission = Number(lastCommission.commission || 0);

			if (up_to <= above) {
				toast.error(`"To" value must be greater than "Above" value.`);
				return;
			}

			if (commission <= 0) {
				toast.error(`Commission must be greater than 0.`);
				return;
			}
		}

		const newFrom = lastCommission ? Number(lastCommission.up_to || 0) : 0;
		const newCommission: CommissionProps = {
			above: newFrom,
			up_to: 0,
			commission: 0,
			is_last: false,
		};

		const updatedCommissions = [...commissionArr, newCommission];

		setCommissionArr(updatedCommissions);
		calculateTotalCommission(updatedCommissions);
	};

	const handleTierInput = (
		e: React.ChangeEvent<HTMLInputElement>,
		index: number
	) => {
		const { value, name } = e.target;
		const updatedCommissions = commissionArr.map((commission, i) => {
			if (i === index) {
				return { ...commission, [name]: value };
			}
			return commission;
		});
		setCommissionArr(updatedCommissions);
		calculateTotalCommission(updatedCommissions);
	};

	const handleLastCheckbox = (index: number, checked: boolean) => {
		const updatedCommissions = commissionArr.map((commission, i) => {
			if (i === index) {
				return {
					...commission,
					is_last: checked,
					up_to: checked
						? propertyDetails?.closing_price || 0
						: commission.up_to,
				};
			}
			return commission;
		});
		setCommissionArr(updatedCommissions);
		setIsTierAdding(checked);
	};

	const calculateTotalCommission = (commissions: CommissionProps[]) => {
		const total = commissions?.reduce((acc, curr) => {
			const fromValue = Number(curr.above ?? 0);
			const upToValue = Number(curr.up_to ?? 0);
			const rate = Number(curr.commission ?? 0) / 100;
			const difference = upToValue - fromValue;

			if (difference > 0 && rate > 0) {
				return acc + difference * rate;
			}
			return acc;
		}, 0);

		setTotalCommission(total);
	};

	const deleteCommission = (index: number) => {
		const updatedCommissions = commissionArr.filter((_, i) => i !== index);
		setCommissionArr(updatedCommissions);
		calculateTotalCommission(updatedCommissions);
	};

	useEffect(() => {
		if (commissionArr?.length < 1) {
			addCommission();
		}
	}, [commissionArr]);

	// Update the total commission when the commission array changes
	useEffect(() => {
		calculateTotalCommission(commissionArr);
	}, [commissionArr, isChecked]);

	useEffect(() => {
		handleLastCheckbox(commissionArr?.length - 1, isChecked);
	}, [isChecked]);
	return (
		<div>
			<Typography className='text-black dark:text-white font-medium mb-4'>
				Commissions ({formatCurrency(totalCommission ?? 0)})
			</Typography>

			<CurrencyInput
				name='closing_price'
				value={propertyDetails?.closing_price ?? ""}
				onChange={handleChange}
				placeholder='$0.00'
				label='Closing price'
				error={formErrors?.closing_price}
				icon={<CurrencyCircleDollar size={20} />}
			/>
			<span className='block mb-4' />

			{/* Display commission rows */}
			<div className='flex flex-col gap-4'>
				{commissionArr?.map((item, index) => (
					<CommissionRow
						data={item}
						deleteCommission={deleteCommission}
						isTierAdding={isTierAdding}
						handleTierInput={handleTierInput}
						index={index}
						key={index}
						is_last={index === commissionArr.length - 1}
						addCommission={addCommission}
						isChecked={isChecked}
						setIsChecked={setIsChecked}
					/>
				))}
			</div>
		</div>
	);
};

export default Step2;
