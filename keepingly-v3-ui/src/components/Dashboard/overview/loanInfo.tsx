import { Typography } from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";

import { FormInput } from "@/components/General/form";
import CurrencyInput from "@/components/General/form/currencyInput";

interface Props {
	loanAmount: string;
	setLoanAmount: React.Dispatch<React.SetStateAction<string>>;
	annualInterestRate: string;
	setAnnualInterestRate: React.Dispatch<React.SetStateAction<string>>;
	loanTermYears: string;
	setLoanTermYears: React.Dispatch<React.SetStateAction<string>>;
	handleCalculate: () => void;
}

const LoanInfo = ({
	loanAmount,
	setLoanAmount,
	annualInterestRate,
	setAnnualInterestRate,
	loanTermYears,
	setLoanTermYears,
	handleCalculate,
}: Props) => {
	return (
		<div className='bg-lightPry p-4'>
			<Typography className='text-2xl font-medium mb-5'>
				Loan information
			</Typography>

			<form className='space-y-4'>
				<CurrencyInput
					label='Loan amount ($)'
					value={loanAmount}
					onChange={(e) => setLoanAmount(e.target.value)}
					type='text'
					decimal={true}
				/>

				<FormInput
					label='Annual interest rate (%)'
					value={annualInterestRate}
					onChange={(e) => setAnnualInterestRate(e.target.value)}
					type='text'
				/>

				<FormInput
					label='Loan term (years)'
					value={loanTermYears}
					onChange={(e) => setLoanTermYears(e.target.value)}
					type='text'
				/>

				<Button
					className='mt-5 bg-pry w-full normal-case font-sm'
					onClick={handleCalculate}
				>
					Calculate
				</Button>
			</form>
		</div>
	);
};

export default LoanInfo;
