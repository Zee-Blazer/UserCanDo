"use client";
import AddBroker from "@/components/Dashboard/agents/addBroker";
import BrokerCard from "@/components/Dashboard/agents/brokerCard";
import SummaryComp from "@/components/Dashboard/agents/summaryComp";
import ListCard from "@/components/Dashboard/overview/listCard";
import { useDashboardSelector } from "@/Redux/selectors";
import { UsersThree } from "@phosphor-icons/react";
import React from "react";

const AgentsPage = () => {
	const { agents } = useDashboardSelector();

	return (
		<div className='p-4  flex flex-col md:flex-row gap-4 overflow-hidden'>
			<div className='w-full md:max-w-[480px]'>
				<SummaryComp />
				<AddBroker />
			</div>
			<ListCard
				title='Agents'
				icon={<UsersThree size={20} />}
				list={agents}
				emptyStateText='No agent has been added'
			>
				<div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6 gap-4'>
					{agents?.map((agent) => (
						<BrokerCard item={agent} key={agent.user_id} />
					))}
				</div>
			</ListCard>
		</div>
	);
};

export default AgentsPage;
