import React from "react";
import CardCover from "../overview/cardCover";
import InvitesCount from "./invitesCount";
import InvitesGraphs from "./invitesGraphs";

const InvitesCard = () => {
	return (
		<CardCover title='Invites' isFilterable={true}>
			<div className='flex gap-4 h-full items-end justify-between flex-wrap'>
				<InvitesCount />
				<InvitesGraphs />
			</div>
		</CardCover>
	);
};

export default InvitesCard;
