"use client";
import Navbar from "@/components/Dashboard/layout/navbar";
import { ReactNode } from "react";
import { useAppContext } from "../context";
import NativeMobileNav from "@/components/Dashboard/layout/nativeMobileNav";

interface BrokerLayoutProps {
	children: ReactNode;
}
const AppraiserLayout = ({ children }: BrokerLayoutProps) => {
	const { isMobile } = useAppContext();

	return (
		<div className={"pb-20"}>
			<Navbar />
			{children}
			{isMobile && <NativeMobileNav />}
		</div>
	);
};

export default AppraiserLayout;
