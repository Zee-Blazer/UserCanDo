import { ListChecks, PlusCircle } from "@phosphor-icons/react";
import React, { useState } from "react";
import ListCard from "./listCard";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTasks } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

// Icons
import { Calculator } from "lucide-react";

// Components
import LoanInfo from "./loanInfo";
import LoanSummary from "./loanSummary";

type PaymentTask = {
	serial: number;
	date: string;
	payment: string;
	principal: string;
	interest: string;
	remainBal: string;
  };

interface Props {
	paymentTasks: PaymentTask[];
  	setPaymentTasks: React.Dispatch<React.SetStateAction<PaymentTask[]>>;
	currentPrincipal: number | null;
	setCurrentPrincipal: React.Dispatch<React.SetStateAction<number | null>>;
	currentInterest: number | null; 
	setCurrentInterest: React.Dispatch<React.SetStateAction<number | null>>;
}

const MortgageCalculator = ({ paymentTasks, setPaymentTasks, setCurrentPrincipal, setCurrentInterest }: Props) => {
	const { keeptrackScore, checklist, activeProperty } = useDashboardSelector();
	const tasks = getTasks(checklist, keeptrackScore);

	// Inputs
	const [loanAmount, setLoanAmount] = useState<string>("0");
	const [annualInterestRate, setAnnualInterestRate] = useState<string>("0");
	const [loanTermYears, setLoanTermYears] = useState<string>("0");

	// Outputs
	const [monthlyPayment, setMonthlyPayment] = useState<number | null>(0);
	const [totalPayment, setTotalPayment] = useState<number | null>(0);
	const [totalInterest, setTotalInterest] = useState<number | null>(0);
	
	const handleCalculate = () => {
		if (!loanAmount || !annualInterestRate || !loanTermYears) return;

		const loanAmountNumber = parseFloat(loanAmount);
		const annualInterestRateNumber = parseFloat(annualInterestRate);
		const loanTermYearsNumber = parseFloat(loanTermYears);
	
		const monthlyRate = annualInterestRateNumber / 100 / 12;
		const totalMonths = loanTermYearsNumber * 12;
	
		const payment =
		  (loanAmountNumber * monthlyRate) /
		  (1 - Math.pow(1 + monthlyRate, -totalMonths));
	
		const total = payment * totalMonths;
		const interest = total - loanAmountNumber;
	
		setMonthlyPayment(parseFloat(payment.toFixed(2)));
		setTotalPayment(parseFloat(total.toFixed(2)));
		setTotalInterest(parseFloat(interest.toFixed(2)));
	
		let remainingBalance = loanAmountNumber;
		const newPaymentTasks = [];
		const startDate = new Date();
	
		const formatCurrency = (value: number): string =>
		  `$${value.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;
	
		for (let i = 1; i <= 10; i++) {
		  const interestForMonth = remainingBalance * monthlyRate;
		  const principalForMonth = payment - interestForMonth;
	
		  // Save first month’s principal & interest
		  if (i === 1) {
			setCurrentPrincipal(parseFloat(principalForMonth.toFixed(2)));
			setCurrentInterest(parseFloat(interestForMonth.toFixed(2)));
		  }
	
		  remainingBalance -= principalForMonth;
	
		  const currentDate = new Date(startDate);
		  currentDate.setMonth(currentDate.getMonth() + i - 1);
		  const formattedDate = currentDate.toLocaleString("en-US", {
			month: "short",
			year: "numeric",
		  });
	
		  newPaymentTasks.push({
			serial: i,
			date: formattedDate,
			payment: formatCurrency(payment),
			principal: formatCurrency(principalForMonth),
			interest: formatCurrency(interestForMonth),
			remainBal: formatCurrency(Math.max(0, remainingBalance)),
		  });
		}
	
		setPaymentTasks(newPaymentTasks);
	  };

	const { isChecklistFetching } = useAppContext();

	return (
		<ListCard
			title='Mortgage Calcultator'
			icon={<Calculator size={20} />}
			hideEmptyState
			emptyStateText='No Data yet'
			loadingState={isChecklistFetching}
			bgWhite
		>
			<div className='grid grid-cols-1 lg:grid-cols-[1.5fr_2.5fr] gap-4'>
				<LoanInfo
					loanAmount={loanAmount}
					setLoanAmount={setLoanAmount}
					annualInterestRate={annualInterestRate}
					setAnnualInterestRate={setAnnualInterestRate}
					loanTermYears={loanTermYears}
					setLoanTermYears={setLoanTermYears}
					handleCalculate={handleCalculate}
				/>
				<LoanSummary
					loanAmount={parseFloat(loanAmount)}
					annualInterestRate={parseFloat(annualInterestRate)}
					loanTermYears={parseFloat(loanTermYears)}
					monthlyPayment={monthlyPayment}
					totalPayment={totalPayment}
					totalInterest={totalInterest}
				/>
			</div>
		</ListCard>
	);
};

export default MortgageCalculator;
