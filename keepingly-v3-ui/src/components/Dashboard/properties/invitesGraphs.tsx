import React from "react";
import Bar from "./bar";
import { useDashboardSelector } from "@/Redux/selectors";

const InvitesGraphs = () => {
	const { overview } = useDashboardSelector();

	return (
		<div className='flex gap-4'>
			{overview?.weekly_invites?.map((invite, index) => (
				<Bar key={index} label={invite?.label} value={Number(invite?.value)} />
			))}
		</div>
	);
};

export default InvitesGraphs;
