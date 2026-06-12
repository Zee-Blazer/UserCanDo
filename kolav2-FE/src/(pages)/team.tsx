"use client";

import { useState, useEffect } from "react";
import TeamPageHeader from "../components/dashboard/team/teamPageHeader";
import TeamsTable from "@/components/dashboard/team/teamsTable";
import AddTeamFlyout from "@/components/dashboard/team/addTeamFlyout";
import EditTeamFlyout from "@/components/dashboard/team/editTeamFlyout";

const Team = () => {
	const [activeTabIndex, setActiveTabIndex] = useState(0);
	const [isRightDrawerOpen, setIsRightDrawerOpen] = useState(false);
	const [isEditRightDrawerOpen, setIsEditRightDrawerOpen] = useState(false);
	const [selectedRow, setSelectedRow] = useState<any>(null);

	const handleEditOpenDialog = () => setIsEditRightDrawerOpen(true);

	return (
		<main className='bg-[#F8FAFB] rounded-md p-4'>
			<TeamPageHeader
				activeIndex={activeTabIndex}
				setActiveIndex={setActiveTabIndex}
			/>
			{activeTabIndex === 0 && (
				<TeamsTable
					onClick={() => {
						setIsRightDrawerOpen(true);
					}}
					onOpenEditModal={(data: TeamListProps) => {
						setSelectedRow(data);
						handleEditOpenDialog();
					}}
				/>
			)}
			<AddTeamFlyout
				isRightDrawerOpen={isRightDrawerOpen}
				closeFlyout={() => {
					setIsRightDrawerOpen(false);
				}}
			/>
			<EditTeamFlyout
				v-if='selectedRow'
				isRightEditDrawerOpen={isEditRightDrawerOpen}
				closeFlyout={() => {
					setIsEditRightDrawerOpen(false);
				}}
				initialData={selectedRow}
			/>
		</main>
	);
};

export default Team;
