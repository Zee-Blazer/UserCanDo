import React from "react";
import {
	Dialog,
	DialogHeader,
	DialogBody,
	DialogFooter,
	Button,
} from "@material-tailwind/react";
import { FormInput } from "@/components/General/form";
import CurrencyInput from "@/components/General/form/currencyInput";
import { ExpenseListProps } from "@/types";
import { FormSelect } from "@/components/General/form/select";
import { useDashboardSelector } from "@/Redux/selectors";

interface EditExpensesModalProps {
	isOpen: boolean;
	onClose: () => void;
	expense: ExpenseListProps | null;
	onUpdate: () => void;
	loading: boolean;
	editForm: {
		name: string;
		expense_type: string;
		paid_to: string;
		amount: string;
	};
	setEditForm: React.Dispatch<
		React.SetStateAction<{
			name: string;
			expense_type: string;
			paid_to: string;
			amount: string;
		}>
	>;
}

const EditExpensesModal = ({
	isOpen,
	onClose,
	expense,
	onUpdate,
	editForm,
	setEditForm,
	loading,
}: EditExpensesModalProps) => {
	const { expenseTypes } = useDashboardSelector();
	return (
		<Dialog
			open={isOpen}
			handler={onClose}
			size='sm'
			className='bg-white dark:bg-black'
		>
			<DialogHeader className='text-gray_5 dark:text-gray_3'>
				Edit Expense
			</DialogHeader>
			<DialogBody>
				<div className='flex flex-col gap-4 text-gray_5 dark:text-gray_3'>
					<FormSelect
						label='Expense Type'
						value={editForm.expense_type}
						options={expenseTypes}
						onChange={(e) =>
							setEditForm({ ...editForm, expense_type: e.target.value })
						}
					/>
					<FormInput
						label='Expense Name'
						value={editForm.name}
						onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
					/>
					<FormInput
						label='Paid To'
						value={editForm.paid_to}
						onChange={(e) =>
							setEditForm({ ...editForm, paid_to: e.target.value })
						}
					/>
					<CurrencyInput
						label='Amount'
						value={editForm.amount}
						onChange={(e) =>
							setEditForm({ ...editForm, amount: e.target.value })
						}
					/>
				</div>
			</DialogBody>
			<DialogFooter>
				<Button
					variant='text'
					onClick={onClose}
					className='mr-1 dark:text-gray_3 text-gray_5 normal-case'
				>
					Cancel
				</Button>
				<Button
					onClick={onUpdate}
					loading={loading}
					className='bg-pry normal-case'
				>
					Update
				</Button>
			</DialogFooter>
		</Dialog>
	);
};

export default EditExpensesModal;
