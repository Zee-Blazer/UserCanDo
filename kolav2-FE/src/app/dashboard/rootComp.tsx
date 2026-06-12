import { useDash } from "@/context/dashboardContext";
import React, { ReactNode } from "react";
import { Spinner } from "react-activity";

const RootComp = ({ children }: { children: ReactNode }) => {
	const { isLoading } = useDash();
	if (isLoading) {
		return (
			<div className='flex items-center justify-center'>
				<Spinner />
			</div>
		);
	}
	return <div>{children}</div>;
};

export default RootComp;
