import { Money, Trash } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import ListCard from "./listCard";
import { formatCurrency } from "@/utils/currencyFormatter";
import TanTable from "@/components/General/TanTable";
import { Button } from "@material-tailwind/react";
import { ExpenseListProps } from "@/types";
import { colors } from "@/constants/colors";
import { useAppContext } from "@/app/context";
import Loading from "@/components/General/loading";
import { Pencil } from "lucide-react";
import EditExpensesModal from "./editExpensesModal";
import useApiRequest from "@/api/hooks/useApiRequest";

interface ExpensesCardProps {
	showAddBtn?: boolean;
	btnAction?: () => void;
	expenses: ExpenseListProps[];
	loading?: boolean;
}
const ExpensesCard = ({
	showAddBtn,
	btnAction,
	expenses,
	loading,
}: ExpensesCardProps) => {
	const { isDeleted, isDeleting, handleDelete, getExpenses } = useAppContext();
	const [editingExpense, setEditingExpense] = useState<ExpenseListProps | null>(
		null
	);
	const { postRequest: updateExpense, loading: isUpdating } = useApiRequest();
	const [editForm, setEditForm] = useState({
		name: "",
		expense_type: "",
		paid_to: "",
		amount: "",
	});

	const handleEdit = (expense: ExpenseListProps) => {
		setEditingExpense(expense);
		setEditForm({
			name: expense.name || "",
			expense_type: expense.expense_type || "",
			paid_to: expense.paid_to || "",
			amount: expense.amount?.toString() || "",
		});
	};

	const handleUpdateExpense = async () => {
		if (!editingExpense?.id) return;
		await updateExpense(
			"/update_expense",
			{
				id: editingExpense.id,
				...editForm,
			},
			(_, isSucess) => {
				if (isSucess) {
					getExpenses();
					setEditingExpense(null);
				}
			}
		);
	};

	const columns = [
		{
			header: "ID",
			cell: (item: any) => <span className=''>{item.row.index + 1}</span>,
		},
		{
			header: "Type",
			accessorKey: "expense_type",
		},
		{
			header: "Expense Name",
			accessorKey: "name",
		},
		{
			header: "Paid to",
			accessorKey: "paid_to",
		},
		{
			header: "Amount ($)",
			cell: ({ row }: any) => formatCurrency(row.original.amount),
		},
		{
			header: <div className='p-2' />,
			cell: ({ row }: any) => (
				<span className='flex items-center justify-center gap-2'>
					<Trash
						onClick={() => handleDelete(row.original.id)}
						color={colors.pry}
						size={20}
						className='cursor-pointer'
					/>
					<Pencil
						size={18}
						className='dark:text-gray_4 text-gray_5 cursor-pointer hover:text-pry'
						onClick={() => handleEdit(row.original)}
					/>
				</span>
			),
			id: "expense",
		},
	];

	useEffect(() => {
		if (isDeleted) {
			getExpenses();
		}
	}, [isDeleted]);

	const expensesTypes = Array.from(
		new Set(
			expenses
				?.map((expense) => expense.expense_type)
				.filter((type): type is string => type !== undefined)
		)
	);

	return (
		<div>
			<ListCard
				title='Expenses'
				icon={<Money size={20} />}
				list={expenses}
				loadingState={loading}
				emptyStateText='No expense added yet'
				headerRight={
					<Button
						variant='outlined'
						className={`border-pry text-pry lowercase first-letter:capitalize ${
							!showAddBtn && "hidden"
						}`}
						onClick={btnAction}
					>
						Add an expense
					</Button>
				}
			>
				<TanTable
					showSearch
					data={expenses}
					columnData={columns}
					length={5}
					filterList={expensesTypes}
				/>
				<Loading isLoading={isDeleting} />
			</ListCard>

			<EditExpensesModal
				isOpen={!!editingExpense}
				onClose={() => setEditingExpense(null)}
				expense={editingExpense}
				onUpdate={handleUpdateExpense}
				editForm={editForm}
				setEditForm={setEditForm}
				loading={isUpdating}
			/>
		</div>
	);
};

export default ExpensesCard;
