import { Typography } from "@material-tailwind/react";

// Icons
import { CircleDollarSign, CalendarMinus2, Activity } from "lucide-react";

interface Props {
	loanAmount: number;
	annualInterestRate: number;
	loanTermYears: number;
	monthlyPayment: number | null;
	totalPayment: number | null;
	totalInterest: number | null;
}

const LoanSummary = ({
	loanAmount,
	annualInterestRate,
	loanTermYears,
	monthlyPayment,
	totalPayment,
	totalInterest,
}: Props) => {
	const lists = [
		{
			title: "Loan amount",
			figure: `$${formatNumber(loanAmount)}`,
			icon: CircleDollarSign,
		}, // "$250,000.00"
		{
			title: "Interest rate",
			figure: `${annualInterestRate}%`,
			icon: Activity,
		}, // "4%"
		{
			title: "Term length",
			figure: `${loanTermYears} years`,
			icon: CalendarMinus2,
		}, // "30 years"
		{
			title: "Monthly payment",
			figure: `$${formatNumber(Number(monthlyPayment))}`,
			icon: CircleDollarSign,
		}, // "$1,230.00"
		{
			title: "Total payment",
			figure: `$${formatNumber(Number(totalPayment))}`,
			icon: CircleDollarSign,
		}, // "$450,000.00"
		{
			title: "Total interest",
			figure: `$${formatNumber(Number(totalInterest))}`,
			icon: CircleDollarSign,
		}, // "$206,000.00"
	];

	function formatNumber(num: number) {
		return num.toLocaleString("en-US", {
			minimumFractionDigits: 2,
			maximumFractionDigits: 2,
		});
	}

	return (
		<div className='bg-lightPry dark:bg-black p-4'>
			<Typography className='text-2xl font-medium mb-5'>
				Loan Summary
			</Typography>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{lists.map((item, index) => {
					const Icon = item.icon;

					return (
						<div
							key={`${item.title}-${item.figure}-${index}`}
							className='bg-lightPry text-center py-5 rounded-lg'
						>
							<Icon className='mx-auto mb-2 text-pry' />
							<Typography className='text-black dark:text-white text-sm'>
								{item.title}
							</Typography>
							<Typography className='text-black dark:text-white text-2xl font-semibold'>
								{item.figure}
							</Typography>
						</div>
					);
				})}

				{/* <div className="bg-lightPry text-center py-5 rounded-lg">
                    <CircleDollarSign className="mx-auto mb-2 text-pry" />
                    <Typography className="text-black text-sm">Loan amount</Typography>
                    <Typography className="text-black text-2xl font-semibold">$250,000.00</Typography>
                </div>
                <div className="bg-lightPry text-center py-5 rounded-lg">Div 2</div>
                <div className="bg-lightPry text-center py-5 rounded-lg">Div 3</div>
                <div className="bg-lightPry text-center py-5 rounded-lg">Div 4</div>
                <div className="bg-lightPry text-center py-5 rounded-lg">Div 5</div>
                <div className="bg-lightPry text-center py-5 rounded-lg">Div 6</div> */}
			</div>
		</div>
	);
};

export default LoanSummary;
