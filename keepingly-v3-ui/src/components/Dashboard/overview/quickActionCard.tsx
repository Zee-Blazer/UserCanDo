import { House, Users } from "@phosphor-icons/react";
import React from "react";
import QuickActionBtn from "./quickActionBtn";
import CardCover from "./cardCover";
import { ROUTES } from "@/constants/routes";

const QuickActionCard = () => {
	return (
		<CardCover
			title='Quick actions'
			bottomComp={
				<>
					<QuickActionBtn
						url={ROUTES.agents}
						icon={<Users size={20} />}
						text='Manage agents'
					/>
					<QuickActionBtn
						url={ROUTES.properties}
						icon={<House size={20} />}
						text='View properties'
					/>
				</>
			}
		/>
	);
};

export default QuickActionCard;
