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

// Icons
import { Banknote } from "lucide-react";

// MUI
import { Select, MenuItem } from "@mui/material";

interface ExpensesCardProps {
	showAddBtn?: boolean;
	btnAction?: () => void;
	expenses: ExpenseListProps[];
	loading?: boolean;
}

const NormalExpensesCard = ({
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

	const normalTasks = [
		{
			serial: 1,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 2,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 3,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 4,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 5,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 6,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 7,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 8,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 9,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
		{
			serial: 10,
			expenses: "Change HVAC filters",
			paidTo: "Cameron Williamson",
			amount: 10,
		},
	];

	const { isChecklistFetching } = useAppContext();
	const columns = [
		{
			id: 1,
			header: "S/N",
			accessorKey: "serial",
		},
		{
			header: "Expenses",
			accessorKey: "name",
			id: 2,
		},
		{
			header: "Paid to",
			accessorKey: "paid_to",
			id: 3,
		},
		{
			header: "Amount ($)",
			cell: ({ row }: any) => formatCurrency(row.original.amount),
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
		<ListCard
			title='Expenses'
			icon={<Banknote size={20} />}
			list={normalTasks}
			emptyStateText='No Data yet'
			bgWhite
			loadingState={isChecklistFetching}
		>
			<TanTable
				data={expenses || []}
				columnData={columns}
				showSearch
				hidePaging
				length={10}
				// reverseSearchBtn
				filterList={expensesTypes}
				// filterList={[
				// 	...new Set(tasks?.map((task) => task.type)),
				// 	...new Set(tasks?.map((task) => task.status)),
				// ]}
			/>
		</ListCard>
	);
};

export default NormalExpensesCard;
