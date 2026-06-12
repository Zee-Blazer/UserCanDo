import { FormCheckbox, FormInput } from "@/components/General/form";
import CurrencyInput from "@/components/General/form/currencyInput";
import { colors } from "@/constants/colors";
import { CommissionProps } from "@/types";
import { Button } from "@material-tailwind/react";
import {
	CurrencyCircleDollar,
	Percent,
	TrashSimple,
} from "@phosphor-icons/react";
import React, { useEffect } from "react";

interface CommissionRowProps {
	handleTierInput: any;
	data: CommissionProps;
	index: number;
	deleteCommission: (index: number) => void;
	is_last: boolean;
	isTierAdding: boolean;
	addCommission: () => void;
	isChecked: boolean;
	setIsChecked: React.Dispatch<React.SetStateAction<boolean>>;
}
const CommissionRow = ({
	data,
	deleteCommission,
	handleTierInput,
	index,
	is_last,
	isTierAdding,
	addCommission,
	isChecked,
	setIsChecked,
}: CommissionRowProps) => {
	const { above, commission, up_to } = data;

	useEffect(() => {
		if (data.is_last) {
			setIsChecked(true);
		}
	}, [data]);
	return (
		<div>
			<div className='flex flex-col md:flex-row md:items-center w-full gap-4'>
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3 w-full'>
					<CurrencyInput
						name='above'
						label='Above'
						readOnly
						value={above || 0}
						onChange={(e) => handleTierInput(e, index)}
						icon={<CurrencyCircleDollar size={20} />}
					/>
					<CurrencyInput
						name='up_to'
						label='To'
						placeholder='$0.00'
						readOnly={!is_last || isTierAdding}
						onChange={(e) => handleTierInput(e, index)}
						icon={<CurrencyCircleDollar size={20} />}
						value={(up_to && up_to > 0 && up_to) || ""}
					/>
					<FormInput
						label='Commission'
						name={"commission"}
						type='number'
						placeholder='0'
						// readOnly={isTierAdding}
						icon={<Percent size={20} />}
						value={(commission && commission > 0 && commission) || ""}
						onChange={(e) => handleTierInput(e, index)}
					/>
				</div>

				<Button
					onClick={() => deleteCommission(index)}
					className='md:mt-6 p-0'
					variant='text'
					disabled={!is_last}
				>
					<TrashSimple size={28} color={colors.pry} />
				</Button>
			</div>
			{is_last && (
				<div className='flex justify-between items-center mt-2'>
					<Button
						variant='text'
						onClick={addCommission}
						className='text-pry p-0 lowercase first-letter:capitalize'
						disabled={isTierAdding}
					>
						Add commission
					</Button>

					<FormCheckbox
						checked={isChecked}
						setChecked={setIsChecked}
						label='Mark as last'
					/>
				</div>
			)}
		</div>
	);
};

export default CommissionRow;
