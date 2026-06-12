import CreateAccountPage from "@/(pages)/createAccount";
import AuthProvider from "@/context/authContext";
import React from "react";

const Page = () => {
	return (
		<AuthProvider>
			<CreateAccountPage />
		</AuthProvider>
	);
};

export default Page;
