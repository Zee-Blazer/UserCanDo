import { PaperPlaneTilt } from "@phosphor-icons/react";
import React from "react";
import ListCard from "./listCard";

const InviteCard = () => {
	return (
		<ListCard
			title='Invites'
			icon={<PaperPlaneTilt size={20} />}
			list={[]}
			emptyStateText='No invites sent'
		/>
	);
};

export default InviteCard;
