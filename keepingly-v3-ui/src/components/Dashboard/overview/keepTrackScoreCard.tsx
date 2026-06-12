import { Typography } from "@material-tailwind/react";
import React from "react";
import CardCover from "./cardCover";
import KeeptrackChart from "./keeptrackChart";
import { formatCurrency } from "@/utils/currencyFormatter";
import { useDashboardSelector } from "@/Redux/selectors";
import { getTasks } from "@/utils/helpers";
import { useAppContext } from "@/app/context";

import { ChartLine } from "lucide-react";

// Components
import ProgressMiddleCont from "./progressMiddleCont";

const KeeptrackCardScore = () => {
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

    const bottomDisplayList = [
        { text: "Tasks done", num: completedTasks },
        { text: "Total tasks", num: overdueTasks },
        { text: "Active tasks", num: upcomingTasks }
    ];

	return (
		<CardCover
			title='KeepTrack Score'
			icon={ChartLine}
			loadingText='Fetching KeepTrack Score'
			loadingState={isHomeownerOverviewdFetching}
			bottomComp={
				<div className='flex justify-between items-center bg-lightBg dark:bg-darkBg mt-2.5 py-2.5 px-4'>
					{bottomDisplayList.map((item, index) => (
						<div key={index}>
							<Typography className='text-sm'>{item.text}</Typography>
							<Typography className='text-base font-medium'>
								{item.num}
							</Typography>
						</div>
					))}
				</div>
			}
		>
            <ProgressMiddleCont 
                progress={ Math.round(keeptrackScore?.score/10).toString() }
            />
			{/* <KeeptrackChart max={550} value={keeptrackScore?.score ?? 0} /> */}
		</CardCover>
	);
};

export default KeeptrackCardScore;
