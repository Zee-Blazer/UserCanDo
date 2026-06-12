"use client";
import TopBar from "@/components/Dashboard/layout/topBar";
import CardLists from "@/components/Dashboard/overview/cardLists";
import DocumentsCard from "@/components/Dashboard/overview/documentsCard";
import ExpensesCard from "@/components/Dashboard/overview/expensesCard";
import InviteCard from "@/components/Dashboard/overview/inviteCard";
import GetStartedModal from "@/components/Dashboard/overview/onboardingModal";
import TasksCard from "@/components/Dashboard/overview/tasks";
import { useAuthSelector, useDashboardSelector } from "@/Redux/selectors";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context";

// Components
import NormalTaskCard from "@/components/Dashboard/overview/normalTaskCard"; // New
import NormalExpensesCard from "@/components/Dashboard/overview/normalExpense"; // New
import MortgageCalculator from "@/components/Dashboard/overview/mortgageCalculator"; // New
import PaymentSchedule from "@/components/Dashboard/overview/paymentSchedule"; // New
import PaymentBreakdown from "@/components/Dashboard/overview/paymentBreakdown"; // New
import CalculatorContainer from "@/components/Dashboard/overview/calculatorContainer";

const Overview = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const handleModalOpen = () => setIsModalOpen(!isModalOpen);
	const { overview, expenses, properties } = useDashboardSelector();
	const { user } = useAuthSelector();
	const { isExpensesFetching } = useAppContext();
	const role = user?.role;

	useEffect(() => {
		const hasModalBeenShown = localStorage.getItem("onboardingModalShown");
		if (properties !== undefined && !hasModalBeenShown) {
			const show = properties.length < 1 || overview?.total_broker_user < 1;
			if (show) {
				setTimeout(() => {
					setIsModalOpen(true);
					localStorage.setItem("onboardingModalShown", "true");
				}, 5000);
			}
		}
	}, [properties, overview?.total_broker_user]);

	const show =
		(properties?.length ?? 1) < 1 ||
		(role !== "homeowner" && overview?.total_broker_user < 1);

	return (
		<div className='p-4'>
			<TopBar
				pageTitle='Welcome back, Sam'
				showPropertySelector
				pageSubTitle='Snapshot of your property’s performance—stay on top of tasks, expenses, and inventory effortlessly.'
			/>

			<CardLists />

			{role === "homeowner" && (
				<div className='space-y-4'>
					<div className='grid grid-cols-1 lg:grid-cols-2  gap-4 mt-4'>
						<NormalTaskCard />
						{/* <TasksCard /> */}
						<NormalExpensesCard
							expenses={expenses}
							loading={isExpensesFetching}
						/>
						{/* <ExpensesCard expenses={expenses} loading={isExpensesFetching} /> */}
					</div>

					<CalculatorContainer />

				</div>
			)}

			<div className='mt-4'>
				{role?.includes("broker") && <InviteCard />}
				{role === "homeowner" && <DocumentsCard />}
			</div>

			<GetStartedModal
				closeModal={() => setIsModalOpen(false)}
				handleOpen={handleModalOpen}
				role={role!}
				open={show && isModalOpen}
			/>
		</div>
	);
};

export default Overview;
