import React, { useEffect, useState } from "react";
import { ExpenseFormProps } from "@/types";
import ExpenseFormHeader from "./expenseFormHeader";
import ExpenseFormComp from "./expenseFormComp";
import { validateAddExpense } from "@/types/validate";
import usePostRequest from "@/api/hooks/usePost";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";

const AddExpense = () => {
	const [expenseDetails, setExpenseDetails] = useState<ExpenseFormProps | null>(
		null
	);
	const [formErrors, setFormErrors] = useState<ExpenseFormProps | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const { isSuccess, postRequest, loading } = usePostRequest();
	const { activeProperty } = useDashboardSelector();
	const { getExpenses } = useAppContext();

	const validate = () => {
		const errors = validateAddExpense(expenseDetails);
		setFormErrors(errors);
		return Object.keys(errors).length === 0;
	};

	const addExpense = async () => {
		const isValid = validate();
		if (!isValid) return;
		const formData = new FormData();
		//@ts-ignore
		const payload: ExpenseFormProps = {
			...expenseDetails,
			property: activeProperty?.id,
		};
		Object.entries(payload).forEach(([key, value]) => {
			if (value && !Array.isArray(value)) {
				//@ts-ignore
				formData.append(key, value);
			}
		});
		if (file) {
			formData.append("expense_receipt_url", file);
		}
		if (isValid) {
			await postRequest("/add_expense", formData);
		}
	};

	const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setExpenseDetails({ ...expenseDetails, [name]: value });
	};

	useEffect(() => {
		if (isSuccess) {
			setExpenseDetails(null);
			setFile(null);
			getExpenses();
		}
	}, [isSuccess]);

	return (
		<div className='mt-4 dark:bg-darkBg bg-lightBg p-4 rounded-xl h-full'>
			<ExpenseFormHeader addExpense={addExpense} loading={loading} />
			<ExpenseFormComp
				expenseData={expenseDetails}
				formErrors={formErrors}
				handleInputChange={handleInputChange}
				setFile={setFile}
				addExpense={addExpense}
				loading={loading}
			/>
		</div>
	);
};

export default AddExpense;
