import { ListChecks, PlusCircle } from "@phosphor-icons/react";
import React from "react";
import ListCard from "./listCard";
import TanTable from "@/components/General/TanTable";
import { TaskIcon } from "@/assets/icons";
import TaskCheckComp from "./taskCheckComp";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTasks } from "@/utils/helpers";
import { useAppContext } from "@/app/context";
import TaskDropdown from "./taskDropDown";

type PaymentTask = {
	serial: number;
	date: string;
	payment: string;
	principal: string;
	interest: string;
	remainBal: string;
};

interface Props {
	paymentTasks: PaymentTask[];
}

const PaymentSchedule = ({ paymentTasks }: Props) => {
	const { keeptrackScore, checklist, activeProperty } = useDashboardSelector();
	const tasks = getTasks(checklist, keeptrackScore);

	const { isChecklistFetching } = useAppContext();
	const columns = [
		{
			id: 1,
			header: "S/N",
			accessorKey: "serial",
		},
		{
			header: "Date",
			accessorKey: "date",
			id: 2,
		},
		{
			header: "Payment",
			accessorKey: "payment",
			id: 3,
		},
		{
			header: "Payment",
			accessorKey: "payment",
			id: 4,
		},
		{
			header: "Interest",
			accessorKey: "interest",
			id: 5,
		},
		{
			header: "Remaining balance",
			accessorKey: "remainBal",
			id: 5,
		}
	];

	return (
		<ListCard
			title='Payment Schedule'
			// icon={<ListChecks size={20} />}
			list={paymentTasks}
			emptyStateText='No Data yet'
			loadingState={isChecklistFetching}
			bgWhite
		>
			<TanTable
				data={paymentTasks}
				columnData={columns}
				// showSearch
				length={10}
				hidePaging
				// filterList={[
				// 	...new Set(tasks?.map((task) => task.type)),
				// 	...new Set(tasks?.map((task) => task.status)),
				// ]}
			/>
		</ListCard>
	);
};

export default PaymentSchedule;
