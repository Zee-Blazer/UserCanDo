import { Button, Dialog, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { ExpenseFormProps, ModalProps } from "@/types";
import ExpenseFormComp from "../expenses/expenseFormComp";
import { validateAddExpense } from "@/types/validate";
import { useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "@/app/context";
import usePostRequest from "@/api/hooks/usePost";

interface AddExpenseModalOptions {
	open: boolean;
	handleOpen: () => void;
	closeModal: () => void;
	renovationId: string;
	callback: () => void;
	category?: string;
}

const AddExpenseModal = ({
	open,
	handleOpen,
	closeModal,
	renovationId,
	callback,
	category,
}: AddExpenseModalOptions) => {
	const [expenseDetails, setExpenseDetails] = useState<ExpenseFormProps | null>(
		null
	);
	const [formErrors, setFormErrors] = useState<ExpenseFormProps | null>(null);
	const [file, setFile] = useState<File | null>(null);
	const { isSuccess, postRequest, loading } = usePostRequest();
	const { activeProperty } = useDashboardSelector();

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
		const payload = {
			...expenseDetails,
			property_id: activeProperty?.id,
			renovation_id: renovationId,
			expense_type: category || expenseDetails?.expense_type,
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
			await postRequest("/add_renovation_expense", formData);
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
			callback();
			closeModal();
		}
	}, [isSuccess]);

	useEffect(() => {
		if (category) {
			setExpenseDetails({ ...expenseDetails, expense_type: category });
		}
	}, [category]);

	return (
		<Dialog
			open={open}
			handler={handleOpen}
			className='p-8 rounded-none bg-white dark:bg-black'
			size='sm'
		>
			<Typography className='text-black dark:text-white text-2xl font-semibold'>
				Add an expense
			</Typography>
			<ExpenseFormComp
				expenseData={expenseDetails}
				formErrors={formErrors}
				handleInputChange={handleInputChange}
				setFile={setFile}
				category={category}
				hideButton
				addExpense={addExpense}
				loading={loading}
			/>
			<div className='flex justify-end gap-4 mt-6'>
				<Button
					variant='text'
					className='text-pry lowercase first-letter:capitalize'
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					onClick={addExpense}
					loading={loading}
					className='bg-pry lowercase first-letter:capitalize'
				>
					Add expense
				</Button>
			</div>
		</Dialog>
	);
};

export default AddExpenseModal;
