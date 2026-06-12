"use client";
import Navbar from "@/components/Dashboard/layout/navbar";
import { ReactNode } from "react";

interface BrokerLayoutProps {
	children: ReactNode;
}
const BrokerLayout = ({ children }: BrokerLayoutProps) => {
	return (
		<div>
			<Navbar />
			{children}
		</div>
	);
};

export default BrokerLayout;
