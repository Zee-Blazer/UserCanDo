"use client";
import { Bank, Check, MagnifyingGlass } from "@phosphor-icons/react";
import React, { useState, useEffect } from "react";
import ListCard from "@/components/Dashboard/overview/listCard";
import { Button } from "@material-tailwind/react";
import { ExpenseListProps } from "@/types";
import { colors } from "@/constants/colors";
import { FormInput } from "@/components/General/form";
import PlaidModal from "@/components/Dashboard/expenses/PlaidModal";
import SuccessModal from "@/components/Dashboard/expenses/SuccessModal";
import { useAuthSelector } from "@/Redux/selectors";
import { baseURL } from "@/api";
import TanTable from "@/components/General/TanTable";
import { formatCurrency } from "@/utils/currencyFormatter";

interface ExpensesCardProps {
	showAddBtn?: boolean;
	btnAction?: () => void;
	expenses: ExpenseListProps[];
	loading?: boolean;
	setTransactions: (transactions: any[]) => void;
}

const BankCard = ({
	showAddBtn,
	btnAction,
	expenses,
	loading,
	setTransactions,
}: ExpensesCardProps) => {
	const banks = [
		{ bankname: "Bank of America" },
		{ bankname: "Chase Bank" },
		{ bankname: "Citibank" },
	];

	const { user } = useAuthSelector();
	const authToken = user?.access_token;
	const [accessToken, setAccessToken] = useState<string | null>(null);
	const [transactions, setLocalTransactions] = useState<any[]>([]);
	const [isPlaidOpen, setIsPlaidOpen] = useState(false);
	const [isSuccessOpen, setIsSuccessOpen] = useState(false);

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${authToken}`,
	};

	const fetchTransactions = async () => {
		if (!accessToken) {
			console.error("No access token available");
			return;
		}

		try {
			const response = await fetch(
				`${baseURL}/ag/get_transactions?access_token=${accessToken}`,
				{
					method: "GET",
					headers,
				}
			);

			if (!response.ok) throw new Error("Failed to fetch transactions");

			const txRes = await response.json();
			const parseTx = JSON.parse(txRes);
			const transactions = parseTx?.payload?.transactions;
			console.log("Transactions:", transactions);
			setTransactions(transactions);
			setLocalTransactions(transactions);
			setIsSuccessOpen(false);
		} catch (error) {
			console.error("Error fetching transactions:", error);
		}
	};

	useEffect(() => {
		// Load transactions from localStorage on mount
		const savedTransactions = localStorage.getItem("transactions");
		console.log("Saved transactions:", savedTransactions);
		if (savedTransactions) {
			setLocalTransactions(JSON.parse(savedTransactions));
		}
	}, []);

	useEffect(() => {
		// Save transactions to localStorage whenever they change
		if (transactions?.length > 0) {
			localStorage.setItem("transactions", JSON.stringify(transactions));
		}
	}, [transactions]);

	const dummyBankDetails = {
		cardNumber: "**** **** **** ****",
		cardHolder: "Plaid Account",
		expiryDate: "**/**",
	};

	return (
		<>
			<ListCard
				title={
					transactions?.length > 0
						? "Bank Account Connected"
						: "Connect Your Bank To Keepingly"
				}
				icon={<Bank size={20} />}
				list={transactions?.length > 0 ? transactions : expenses}
				loadingState={loading}
				emptyStateText={
					transactions?.length > 0
						? ""
						: "Connect your bank account to view transactions"
				}
				headerRight={
					<Button
						className='border-pry text-pry lowercase first-letter:capitalize text-base shadow-none font-medium w-fit self-center py-4 md:px-[92px]'
						variant='outlined'
						onClick={() => setIsPlaidOpen(true)}
					>
						{transactions?.length > 0 ? "Add New Account" : "Connect"}
					</Button>
				}
			>
				{transactions?.length > 0 ? (
					<div className='bg-gradient-to-b from-[#28264B] to-[#A61D4A] text-white p-5 rounded-lg w-[347px]'>
						<p className='text-lg tracking-widest'>
							{dummyBankDetails.cardNumber}
						</p>
						<div className='flex justify-between mt-4'>
							<p className='text-sm'>{dummyBankDetails.cardHolder}</p>
							<p className='text-sm'>Exp {dummyBankDetails.expiryDate}</p>
						</div>
					</div>
				) : (
					// Show form input and banks list if no transactions exist
					<>
						<FormInput
							icon={<MagnifyingGlass size={20} />}
							iconPosition='right'
							placeholder='Search'
						/>

						<div className='flex flex-col gap-4'>
							{banks.map((bank, index) => (
								<div
									key={index}
									className='flex items-center justify-between p-4 border-[1px] dark:border-borderDark border-borderLight rounded-md'
								>
									<p className='text-gray-700'>{bank.bankname}</p>
									<span className='flex items-center justify-center'>
										<Check color={colors.pry} size={16} />
									</span>
								</div>
							))}
						</div>
					</>
				)}
			</ListCard>

			<PlaidModal
				isOpen={isPlaidOpen}
				onClose={() => setIsPlaidOpen(false)}
				onSuccessOpen={() => setIsSuccessOpen(true)}
				setAccessToken={setAccessToken}
			/>

			<SuccessModal
				isOpen={isSuccessOpen}
				onClose={() => setIsSuccessOpen(false)}
				onImportTransactions={fetchTransactions}
			/>
		</>
	);
};

export default BankCard;
