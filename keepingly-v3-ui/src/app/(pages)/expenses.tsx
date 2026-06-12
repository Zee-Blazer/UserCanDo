"use client";
import AddExpense from "@/components/Dashboard/expenses/addExpense";
import React, { useState } from "react";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import { useAppContext } from "../context";
import ExpenseSummaryComp from "@/components/Dashboard/expenses/expenseSummary";
import TopBar from "@/components/Dashboard/layout/topBar";
import ExpensesCard from "@/components/Dashboard/overview/expensesCard";

import ExpenseNavigator from "@/components/Dashboard/expenses/ExpenseNavigator";
import TransactionsCard from "@/components/Dashboard/expenses/TransactionsCard";
import BankCard from "@/components/Dashboard/expenses/BankCard";

const ExpensesPage = ({ id }: { id: string }) => {
  const { expenses } = useDashboardSelector();
  const { isExpensesFetching } = useAppContext();

  const [activeSlideIndex, setActiveSlideIndex] = useState(0);
  const { user } = useAuthSelector();
  const role = user?.role;

  const [transactions, setTransactions] = useState<any[]>([]);

  const slides = [
    <ExpensesCard expenses={expenses} loading={isExpensesFetching} key={1} />,
    <BankCard
      expenses={expenses}
      setTransactions={setTransactions}
      loading={isExpensesFetching}
      key={2}
    />,
    <TransactionsCard
      transactions={transactions}
      loading={isExpensesFetching}
      renovationId={id}
      key={3}
    />,
  ];

  return (
    <div className="p-4">
      <TopBar showPropertySelector pageTitle="Expense" />
      <div className="flex flex-col xl:flex-row gap-4 overflow-hidden">
        {role !== "appraiser" && (
          <>
            <div className="w-full xl:max-w-[480px]">
              <ExpenseSummaryComp />
              <AddExpense />
            </div>
            <div className="w-full h-full">
              <ExpenseNavigator
                activeSlideIndex={activeSlideIndex}
                setActiveSlideIndex={setActiveSlideIndex}
                role={role!}
              />
              {slides[activeSlideIndex]}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ExpensesPage;
