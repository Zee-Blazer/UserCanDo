import { ListChecks, PlusCircle } from "@phosphor-icons/react";
import React from "react";
import ListCard from "./listCard";
import TanTable from "@/components/General/TanTable";
import { TaskIcon } from "@/assets/icons";
import TaskCheckComp from "./taskCheckComp";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTasks } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

const NormalTaskCard = () => {
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
			header: "Task",
			accessorKey: "task",
			id: 2,
		},
		{
			header: "Points",
			accessorKey: "point",
			id: 3,
		},
		{
			id: 5,
			header: (
				<div className='flex items-center justify-center'>
					<TaskIcon />
				</div>
			),

			cell: ({ row }: any) => {
				const task = row.original;
				return (
					<TaskCheckComp
						type={task.type}
						property_id={activeProperty?.id || ""}
						task_id={task.id}
						isCompleted={task.status === "complete"}
						category={task.category}
						subCategory={task.subCategory}
					/>
				);
			},
		},
		// {
		// 	header: "Due date",
		// 	accessorKey: "dueDate",
		// 	id: 3,
		// },

		// {
		// 	// header: <PlusCircle size={32} />,
		// 	header: <span className='text-center w-full block'>Score</span>,
		// 	id: 4,
		// 	accessorKey: "point",
		// 	cell: ({ row }: any) => {
		// 		return (
		// 			<span className='text-center flex items-center justify-center'>
		// 				{row.original.point}
		// 			</span>
		// 		);
		// 	},
		// },
		// {
		// 	header: <span className='text-center w-full block'>Action</span>,

		// 	id: 5,

		// 	cell: ({ row }: any) => {
		// 		const task = row.original;
		// 		return (
		// 			<TaskDropdown
		// 				type={task.type}
		// 				property_id={activeProperty?.id || ""}
		// 				task_id={task.id}
		// 				isCompleted={task.status === "complete"}
		// 				category={task.category}
		// 				subCategory={task.subCategory}
		// 			/>
		// 		);
		// 	},
		// },
	];

	return (
		<ListCard
			title='Tasks'
			icon={<ListChecks size={20} />}
			list={tasks}
			emptyStateText='No Data yet'
			loadingState={isChecklistFetching}
			bgWhite
		>
			<TanTable
				data={tasks || []}
				columnData={columns}
				showSearch
				length={10}
				hidePaging
				filterList={[
					...new Set(tasks?.map((task) => task.type)),
					...new Set(tasks?.map((task) => task.status)),
				]}
			/>
		</ListCard>
	);
};

export default NormalTaskCard;
