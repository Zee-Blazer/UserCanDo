import React from "react";
import TotalPropertiesCard from "../overview/totalPropertiesCard";
import TotalCommissions from "./totalCommissions";
import InvitesCard from "./invitesCard";

const PropertyAnalysis = () => {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
			<TotalPropertiesCard />
			<TotalCommissions />
			<InvitesCard />
		</div>
	);
};

export default PropertyAnalysis;
