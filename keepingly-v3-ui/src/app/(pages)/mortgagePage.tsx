"use client";
import React, { useState, FormEvent } from "react";
import { FormInput } from "@/components/General/form";
import TopBar from "@/components/Dashboard/layout/topBar";
import { Typography } from "@material-tailwind/react";
import CardCover from "@/components/Dashboard/overview/cardCover";
import CurrencyInput from "@/components/General/form/currencyInput";

// Define interfaces for form data and result
interface FormData {
	originalLoanAmount: string;
	originalLoanTerm: string;
	interestRate: string;
	remainingTermYears: string;
	remainingTermMonths: string;
	extraPaymentMonthly: string;
	extraPaymentYearly: string;
	extraPaymentOneTime: string;
	repaymentOption: "extraPayment" | "biweekly" | "normal";
}

interface Result {
	remainingBalance: string;
	monthlyPayment: string;
	newPayoffYears: number;
	newPayoffMonths: number;
	interestSavings: string;
	originalTotalInterest: string;
	newTotalInterest: string;
	originalTotalPayments: string;
	newTotalPayments: string;
}

const MortgagePayoffCalculator: React.FC = () => {
	const [formData, setFormData] = useState<FormData>({
		originalLoanAmount: "",
		originalLoanTerm: "",
		interestRate: "",
		remainingTermYears: "",
		remainingTermMonths: "",
		extraPaymentMonthly: "",
		extraPaymentYearly: "",
		extraPaymentOneTime: "",
		repaymentOption: "extraPayment",
	});

	const [result, setResult] = useState<Result | null>(null);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleRepaymentOption = (
		option: "extraPayment" | "biweekly" | "normal"
	) => {
		setFormData((prevState) => ({
			...prevState,
			repaymentOption: option,
			extraPaymentMonthly:
				option === "extraPayment" ? prevState.extraPaymentMonthly : "",
			extraPaymentYearly:
				option === "extraPayment" ? prevState.extraPaymentYearly : "",
			extraPaymentOneTime:
				option === "extraPayment" ? prevState.extraPaymentOneTime : "",
		}));
	};

	const calculatePayoff = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		const principal = parseFloat(formData.originalLoanAmount);
		const interestRate = parseFloat(formData.interestRate) / 100 / 12;
		const originalTerm = parseFloat(formData.originalLoanTerm) * 12;
		const remainingTerm =
			parseFloat(formData.remainingTermYears) * 12 +
			parseFloat(formData.remainingTermMonths || "0");

		// Check for invalid inputs
		if (
			isNaN(principal) ||
			isNaN(interestRate) ||
			isNaN(originalTerm) ||
			isNaN(remainingTerm)
		) {
			return;
		}

		// Calculate monthly payment without extra payments
		const x = Math.pow(1 + interestRate, originalTerm);
		const monthlyPayment = (principal * x * interestRate) / (x - 1);

		// Calculate remaining balance
		const remainingBalance =
			principal * Math.pow(1 + interestRate, remainingTerm) -
				(monthlyPayment * (Math.pow(1 + interestRate, remainingTerm) - 1)) /
					interestRate || 0;

		let extraMonthly = parseFloat(formData.extraPaymentMonthly || "0");
		let extraYearly = parseFloat(formData.extraPaymentYearly || "0");
		let extraOneTime = parseFloat(formData.extraPaymentOneTime || "0");

		// Calculate new payoff with extra payments
		let newBalance = remainingBalance - extraOneTime;
		let months = 0;
		let totalInterest = 0;
		let totalPayments = 0;

		while (newBalance > 0 && months < remainingTerm) {
			if (months % 12 === 0) {
				newBalance -= extraYearly;
			}
			const interestForMonth = newBalance * interestRate;
			newBalance =
				newBalance * (1 + interestRate) - (monthlyPayment + extraMonthly);
			totalInterest += interestForMonth;
			totalPayments += monthlyPayment + extraMonthly;
			months++;
		}

		const years = Math.floor(months / 12);
		const remainingMonths = months % 12;

		// Original calculations without extra payments
		const originalTotalInterest = monthlyPayment * originalTerm - principal;
		const originalTotalPayments = monthlyPayment * originalTerm;

		setResult({
			remainingBalance: remainingBalance.toFixed(2),
			monthlyPayment: monthlyPayment.toFixed(2),
			newPayoffYears: years,
			newPayoffMonths: remainingMonths,
			interestSavings: (originalTotalInterest - totalInterest).toFixed(2),
			originalTotalInterest: originalTotalInterest.toFixed(2),
			newTotalInterest: totalInterest.toFixed(2),
			originalTotalPayments: originalTotalPayments.toFixed(2),
			newTotalPayments: totalPayments.toFixed(2),
		});
	};

	const clearForm = () => {
		setFormData({
			originalLoanAmount: "",
			originalLoanTerm: "",
			interestRate: "",
			remainingTermYears: "",
			remainingTermMonths: "",
			extraPaymentMonthly: "",
			extraPaymentYearly: "",
			extraPaymentOneTime: "",
			repaymentOption: "extraPayment",
		});
		setResult(null);
	};

	// Calculate time savings for display
	const timeSavingsYears = result
		? Math.floor(
				(parseFloat(formData.remainingTermYears) * 12 +
					parseFloat(formData.remainingTermMonths || "0") -
					(result.newPayoffYears * 12 + result.newPayoffMonths)) /
					12
		  )
		: 0;

	const timeSavingsMonths = result
		? (parseFloat(formData.remainingTermYears) * 12 +
				parseFloat(formData.remainingTermMonths || "0") -
				(result.newPayoffYears * 12 + result.newPayoffMonths)) %
		  12
		: 0;

	return (
		<div className='p-4'>
			<TopBar
				pageTitle='Mortgage Payoff Calculator'
				showPropertySelector={false}
			/>
			<div className='mt-10 dark:bg-darkBg bg-lightBg p-6 rounded-lg shadow-md'>
				<h2 className='text-2xl font-bold text-center text-black dark:text-white mb-6'>
					Mortgage Payoff Calculator
				</h2>
				<p className='text-center text-gray-600 mb-8'>
					This mortgage payoff calculator helps evaluate how adding extra
					payments or bi-weekly payments can save on interest and shorten
					mortgage term.
				</p>

				<form
					onSubmit={calculatePayoff}
					className='grid grid-cols-1 md:grid-cols-2 gap-6'
				>
					{/* Left Column - Input Form */}
					<div>
						<h3 className='text-lg font-semibold mb-4'>
							If you know the remaining loan term
						</h3>

						<div className='mb-4'>
							<CurrencyInput
								label='Original Loan Amount'
								placeholder='Enter original loan amount'
								value={formData.originalLoanAmount}
								name='originalLoanAmount'
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className='mb-4'>
							<FormInput
								label='Original Loan Term (Years)'
								placeholder='Enter original loan term in years'
								type='number'
								value={formData.originalLoanTerm}
								name='originalLoanTerm'
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className='mb-4'>
							<FormInput
								label='Interest Rate (%)'
								placeholder='Enter interest rate'
								type='number'
								value={formData.interestRate}
								name='interestRate'
								onChange={handleInputChange}
								required
							/>
						</div>

						<div className='grid grid-cols-2 gap-4 mb-4'>
							<FormInput
								label='Remaining Term (Years)'
								placeholder='Enter remaining term in years'
								type='number'
								value={formData.remainingTermYears}
								name='remainingTermYears'
								onChange={handleInputChange}
								required
							/>
							<FormInput
								label='Remaining Term (Months)'
								placeholder='Enter remaining term in months'
								type='number'
								value={formData.remainingTermMonths}
								name='remainingTermMonths'
								onChange={handleInputChange}
							/>
						</div>

						<div className='mb-4'>
							<h4 className='text-md font-medium mb-2'>Repayment options:</h4>

							<div className='flex items-center mb-2'>
								<input
									type='radio'
									id='extraPayment'
									name='repaymentOption'
									value='extraPayment'
									checked={formData.repaymentOption === "extraPayment"}
									onChange={() => handleRepaymentOption("extraPayment")}
									className='mr-2'
								/>
								<label htmlFor='extraPayment'>
									Repayment with extra payments
								</label>
							</div>

							{formData.repaymentOption === "extraPayment" && (
								<div className='ml-6 space-y-2'>
									<CurrencyInput
										label='Extra Payment Per Month'
										placeholder='Enter extra payment per month'
										value={formData.extraPaymentMonthly}
										name='extraPaymentMonthly'
										onChange={handleInputChange}
									/>
									<CurrencyInput
										label='Extra Payment Per Year'
										placeholder='Enter extra payment per year'
										value={formData.extraPaymentYearly}
										name='extraPaymentYearly'
										onChange={handleInputChange}
									/>
									<CurrencyInput
										label='One-Time Extra Payment'
										placeholder='Enter one-time extra payment'
										value={formData.extraPaymentOneTime}
										name='extraPaymentOneTime'
										onChange={handleInputChange}
									/>
								</div>
							)}

							<div className='flex items-center mb-2'>
								<input
									type='radio'
									id='biweekly'
									name='repaymentOption'
									value='biweekly'
									checked={formData.repaymentOption === "biweekly"}
									onChange={() => handleRepaymentOption("biweekly")}
									className='mr-2'
								/>
								<label htmlFor='biweekly'>Biweekly repayment</label>
							</div>

							<div className='flex items-center'>
								<input
									type='radio'
									id='normal'
									name='repaymentOption'
									value='normal'
									checked={formData.repaymentOption === "normal"}
									onChange={() => handleRepaymentOption("normal")}
									className='mr-2'
								/>
								<label htmlFor='normal'>Normal repayment</label>
							</div>
						</div>

						<div className='flex space-x-4'>
							<button
								type='submit'
								className='flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-200'
							>
								Calculate
							</button>
							<button
								type='button'
								onClick={clearForm}
								className='flex-1 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200'
							>
								Clear
							</button>
						</div>
					</div>

					{/* Right Column - Results */}
					{result && (
						<div className='bg-lightBg dark:bg-darkBg p-4 rounded-md'>
							<h3 className='text-lg font-semibold text-green-600 mb-4'>
								Payoff in {result.newPayoffYears} years and{" "}
								{result.newPayoffMonths} months
							</h3>
							<p className='mb-4'>
								The remaining balance is ${result.remainingBalance}. By paying
								extra ${formData.extraPaymentMonthly || 0} per month starting
								now, the loan will be paid off in {result.newPayoffYears} years
								and {result.newPayoffMonths} months. It is {timeSavingsYears}{" "}
								years and {timeSavingsMonths} months earlier. This results in
								savings of ${result.interestSavings} in interest.
							</p>

							<div className='grid grid-cols-2 gap-4 mb-4'>
								<div className='bg-gradient-to-r from-[#28264B] to-[#A61D4A] p-3 rounded-md'>
									<h4 className='font-medium'>
										Interest savings: ${result.interestSavings}
									</h4>
									<p className='text-sm'>
										Original: ${result.originalTotalInterest}
									</p>
									<p className='text-sm'>
										With payoff: ${result.newTotalInterest}
									</p>
									<p className='text-sm text-green-600'>
										Pay{" "}
										{Math.round(
											((parseFloat(result.originalTotalInterest) -
												parseFloat(result.newTotalInterest)) /
												parseFloat(result.originalTotalInterest)) *
												100
										)}
										% less on interest
									</p>
								</div>

								<div className='bg-lightBg dark:bg-darkBg p-3 rounded-md'>
									<h4 className='font-medium'>
										Time savings: {timeSavingsYears} years and{" "}
										{timeSavingsMonths} months
									</h4>
									<p className='text-sm'>
										Original: {formData.remainingTermYears} yrs,{" "}
										{formData.remainingTermMonths} mos
									</p>
									<p className='text-sm'>
										With payoff: {result.newPayoffYears} yrs,{" "}
										{result.newPayoffMonths} mos
									</p>
									<p className='text-sm text-green-600'>
										Payoff{" "}
										{Math.round(
											((parseFloat(formData.remainingTermYears) * 12 +
												parseFloat(formData.remainingTermMonths || "0") -
												(result.newPayoffYears * 12 + result.newPayoffMonths)) /
												(parseFloat(formData.remainingTermYears) * 12 +
													parseFloat(formData.remainingTermMonths || "0"))) *
												100
										)}
										% faster
									</p>
								</div>
							</div>

							<div className='overflow-x-auto'>
								<table className='w-full text-sm'>
									<thead>
										<tr className='bg-gray-200'>
											<th className='p-2'></th>
											<th className='p-2'>Original</th>
											<th className='p-2'>With payoff</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className='p-2'>Monthly pay</td>
											<td className='p-2'>${result.monthlyPayment}</td>
											<td className='p-2'>
												$
												{(
													parseFloat(result.monthlyPayment) +
													parseFloat(formData.extraPaymentMonthly || "0")
												).toFixed(2)}
											</td>
										</tr>
										<tr>
											<td className='p-2'>Total payments</td>
											<td className='p-2'>${result.originalTotalPayments}</td>
											<td className='p-2'>${result.newTotalPayments}</td>
										</tr>
										<tr>
											<td className='p-2'>Total interest</td>
											<td className='p-2'>${result.originalTotalInterest}</td>
											<td className='p-2'>${result.newTotalInterest}</td>
										</tr>
										<tr>
											<td className='p-2'>Remaining term</td>
											<td className='p-2'>
												{formData.remainingTermYears} yrs,{" "}
												{formData.remainingTermMonths} mos
											</td>
											<td className='p-2'>
												{result.newPayoffYears} yrs, {result.newPayoffMonths}{" "}
												mos
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					)}
				</form>
			</div>
		</div>
	);
};

export default MortgagePayoffCalculator;
