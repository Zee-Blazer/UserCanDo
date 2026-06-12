import { FormInput } from "@/components/General/form";
import CurrencyInput from "@/components/General/form/currencyInput";
import DragAndDropFileInput from "@/components/General/form/dragAndDrop";
import { FormSelect } from "@/components/General/form/select";
import { useDashboardSelector } from "@/Redux/selectors";
import { ExpenseFormProps } from "@/types";
import { Button } from "@material-tailwind/react";

import React, { useEffect } from "react";

interface ExpenseFormCompProps {
	handleInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	expenseData: ExpenseFormProps | null;
	formErrors: ExpenseFormProps | null;
	setFile: (file: File) => void;
	category?: string;
	addExpense: () => void;
	loading: boolean;
	hideButton?: boolean;
}
const ExpenseFormComp = ({
	expenseData,
	formErrors,
	handleInputChange,
	setFile,
	category,
	addExpense,
	loading,
	hideButton,
}: ExpenseFormCompProps) => {
	const handleFileSelect = (files: File[]) => {
		setFile(files[0]);
	};
	const { expenseTypes } = useDashboardSelector();

	return (
		<div className='mt-4 flex flex-col gap-4'>
			<FormSelect
				placeholder={"Expense type"}
				options={expenseTypes}
				required
				value={expenseData?.expense_type || ""}
				name='expense_type'
				onChange={handleInputChange}
				error={formErrors?.expense_type}
				readOnly={(category && category?.length > 0) || false}
			/>
			<FormInput
				placeholder='Expense name'
				required
				type='text'
				value={expenseData?.name || ""}
				name='name'
				onChange={handleInputChange}
				error={formErrors?.name}
			/>
			<FormInput
				placeholder='Paid to'
				required
				value={expenseData?.paid_to || ""}
				name='paid_to'
				onChange={handleInputChange}
				error={formErrors?.paid_to}
			/>

			<CurrencyInput
				placeholder='Amount'
				required
				value={expenseData?.amount || ""}
				name='amount'
				onChange={handleInputChange}
				error={formErrors?.amount}
			/>

			<DragAndDropFileInput
				onFileSelect={handleFileSelect}
				singleFile
				acceptedFormats={[".jpeg", ".jpg", ".png", ".pdf"]}
				id='expense_upload'
			/>
			{!hideButton && (
				<Button
					onClick={addExpense}
					loading={loading}
					className='border-pry text-pry normal-case text-base shadow-none font-medium w-full flex items-center justify-center'
					variant='outlined'
				>
					Save Expense
				</Button>
			)}
		</div>
	);
};

export default ExpenseFormComp;
