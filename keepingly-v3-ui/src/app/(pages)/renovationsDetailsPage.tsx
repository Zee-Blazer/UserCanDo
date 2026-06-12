"use client";
import useFetch from "@/api/hooks/useFetch";
import ExpensesCard from "@/components/Dashboard/overview/expensesCard";
import AddExpenseModal from "@/components/Dashboard/renovations/addExpenseModal";
import RenovationDetailsSummary from "@/components/Dashboard/renovations/renovationDetails/renovationDetailsSummary";
import RenovationPhotos from "@/components/Dashboard/renovations/renovationDetails/renovationPhotos";
import { useDashboardSelector } from "@/Redux/selectors";
import { ExpenseFormProps, RenovationListProps } from "@/types";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../context";
import Loading from "@/components/General/loading";
import { ROUTES } from "@/constants/routes";
import { getTotalExpense } from "@/utils/helpers";

const RenovationsDetailsPage: React.FC<{ id: string }> = ({ id }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {
		fetchRequest: getRenovation,
		loading,
		isSuccess,
		data: renovationData,
		error,
	} = useFetch();
	const [renovationDetails, setRenovationDetails] =
		useState<RenovationListProps | null>(null);
	const { getRenovations } = useAppContext();
	const router = useRouter();

	const getRenovationDetails = async () =>
		await getRenovation(`/get_renovations?renovation_id=${id}`);

	useEffect(() => {
		getRenovationDetails();
	}, [id]);

	useEffect(() => {
		if (isSuccess) {
			setRenovationDetails(renovationData?.payload);
		}
		if (error) {
			// router.back();
		}
	}, [isSuccess, error]);

	return (
		<div className='p-4'>
			<RenovationDetailsSummary
				dateEnd={renovationDetails?.close_date || ""}
				dateStart={renovationDetails?.start_date || ""}
				totalCost={getTotalExpense(renovationDetails?.expenses_list || [])}
			/>

			<RenovationPhotos
				//@ts-ignore
				renovationId={id}
				callback={() => {
					getRenovationDetails();
					getRenovations();
				}}
				renovationItem={renovationDetails}
			/>
			<ExpensesCard
				expenses={renovationDetails?.expenses_list || []}
				showAddBtn
				btnAction={() => setIsModalOpen(true)}
			/>
			<AddExpenseModal
				closeModal={() => setIsModalOpen(false)}
				open={isModalOpen}
				handleOpen={() => setIsModalOpen(!isModalOpen)}
				callback={getRenovationDetails}
				category='Renovation and Improvement'
				//@ts-ignore
				renovationId={id}
			/>
			<Loading isLoading={loading} loadingText='Fetching renovation details' />
		</div>
	);
};

export default RenovationsDetailsPage;
