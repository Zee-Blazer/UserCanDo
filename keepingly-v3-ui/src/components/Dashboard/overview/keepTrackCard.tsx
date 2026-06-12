import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import KeeptrackChart from "./keeptrackChart";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTasks } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

const KeeptrackCard = () => {
	const { keeptrackScore, checklist } = useDashboardSelector();
	const { isHomeownerOverviewdFetching } = useAppContext();
	const tasks = getTasks(checklist, keeptrackScore);

	const completedTasks = tasks?.filter(
		(task) => task.status === "complete"
	).length;

	const overdueTasks = tasks?.filter(
		(task) => task.dueDate === "Priority"
	).length;

	const upcomingTasks = tasks?.length - completedTasks;

	return (
		<CardCover
			title='KeepTrack Score'
			loadingText='Fetching KeepTrack Score'
			loadingState={isHomeownerOverviewdFetching}
			bottomComp={
				// <>
				// 	<Typography className='text-xs dark:text-white text-gray_5'>
				// 		Tasks done:{" "}
				// 		<span className='dark:text-white text-black'>{completedTasks}</span>{" "}
				// 	</Typography>{" "}
				// 	<Typography className='text-xs dark:text-white text-gray_5'>
				// 		Total tasks:{" "}
				// 		<span className='dark:text-white text-black'>{overdueTasks}</span>{" "}
				// 	</Typography>
				// 	<Typography className='text-xs dark:text-white text-gray_5'>
				// 		Actve tasks:{" "}
				// 		<span className='dark:text-white text-black'>{upcomingTasks}</span>{" "}
				// 	</Typography>
				// </>
				<div className="flex justify-evenly">
					<div>
						<Typography className='text-xs dark:text-white text-gray_5'>
							Tasks done:{" "}
							<span className='dark:text-white font-bold text-black'>{completedTasks}</span>{" "}
						</Typography>{" "}
					</div>
				 	<div>
						<Typography className='text-xs dark:text-white text-gray_5'>
							Total tasks:{" "}
							<span className='dark:text-white font-bold text-black'>{overdueTasks}</span>{" "}
						</Typography>
					</div>
				 	<div>
						<Typography className='text-xs dark:text-white text-gray_5'>
							Actve tasks:{" "}
							<span className='dark:text-white font-bold text-black'>{upcomingTasks}</span>{" "}
						</Typography>
					</div>
				</div>
			}
		>
			<KeeptrackChart max={550} value={keeptrackScore?.score ?? 0} />
		</CardCover>
	);
};

export default KeeptrackCard;
