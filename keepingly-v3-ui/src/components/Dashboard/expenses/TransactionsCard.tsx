import { ListBullets, Check, X } from "@phosphor-icons/react";
import React, { useEffect, useState } from "react";
import ListCard from "@/components/Dashboard/overview/listCard";
import { formatCurrency } from "@/utils/currencyFormatter";
import TanTable from "@/components/General/TanTable";
import { useAppContext } from "@/app/context";
import Loading from "@/components/General/loading";

import { validateAddExpense } from "@/types/validate";
import { useDashboardSelector } from "@/Redux/selectors";
import usePostRequest from "@/api/hooks/usePost";

interface ExpenseFormProps {
  property?: string;
  name?: string;
  paid_to?: string;
  expense_type?: string;
  amount?: number | string;
  expense_receipt_url?: any;
}

interface TransactionProps {
  transactions: any[];
  loading?: boolean;
  renovationId: string;
  category?: string;
}

const TransactionsCard = ({
  transactions,
  loading,
  renovationId,
  category,
}: TransactionProps) => {
  const { isDeleted, isDeleting, getExpenses } = useAppContext();
  const [storedTransactions, setStoredTransactions] = useState<any[]>([]);
  const { activeProperty } = useDashboardSelector();
  const { isSuccess, postRequest, loading: postLoading } = usePostRequest();

  // Load transactions from localStorage on mount
  useEffect(() => {
    const savedTransactions = localStorage.getItem("transactions");
    console.log("Saved transactions:", savedTransactions);
    if (savedTransactions) {
      setStoredTransactions(JSON.parse(savedTransactions));
    }
  }, []);

  // Save transactions to localStorage whenever they change
  useEffect(() => {
    if (transactions?.length > 0) {
      localStorage.setItem("transactions", JSON.stringify(transactions));
      setStoredTransactions(transactions);
    }
  }, [transactions]);

  useEffect(() => {
    if (isDeleted) {
      getExpenses();
    }
  }, [isDeleted]);

  // Function to add a transaction as an expense
  const handleAddExpense = async (transaction: any) => {
    const newExpense: ExpenseFormProps = {
      name: transaction.description || "Unknown",
      paid_to: transaction?.merchant_name || "Unknown (bank transaction)",
      amount: transaction.amount || 0,
      expense_type:
        category || transaction.personal_finance_category?.primary || "Other",
      property: activeProperty?.id,
    };

    const errors = validateAddExpense(newExpense);
    if (Object.keys(errors).length > 0) return;

    const formData = new FormData();
    Object.entries(newExpense).forEach(([key, value]) => {
      if (value && !Array.isArray(value)) {
        formData.append(key, value);
      }
    });

    await postRequest("/add_expense", formData);
  };

  return (
    <ListCard
      title="Transactions"
      icon={<ListBullets size={20} />}
      list={storedTransactions}
      loadingState={postLoading}
      emptyStateText="No transactions available"
    >
      <TanTable
        showSearch
        data={storedTransactions || []}
        columnData={[
          {
            header: "S/N",
            cell: ({ row }: any) => <span>{row.index + 1}</span>,
          },
          {
            header: "Amount ($)",
            cell: ({ row }: any) =>
              formatCurrency(Number(row.original.amount) || 0),
          },
          {
            header: "Description",
            cell: ({ row }: any) =>
              row.original.personal_finance_category?.detailed || "N/A",
          },
          {
            header: "Category",
            cell: ({ row }: any) =>
              row.original.personal_finance_category?.primary || "N/A",
          },
          {
            header: "Add to Expenses",
            cell: ({ row }: any) => (
              <span className="flex items-center justify-center gap-4">
                <Check
                  size={20}
                  className="cursor-pointer text-green-500 hover:text-green-700"
                  onClick={() => handleAddExpense(row.original)}
                />
              </span>
            ),
          },
        ]}
        length={10}
      />
      <Loading isLoading={isDeleting} />
    </ListCard>
  );
};

export default TransactionsCard;
