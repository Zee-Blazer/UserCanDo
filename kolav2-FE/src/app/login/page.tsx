import LoginPage from "@/(pages)/login";
import AuthProvider from "@/context/authContext";
import React from "react";

const Page = () => {
	return (
		<AuthProvider>
			<LoginPage />
		</AuthProvider>
	);
};

export default Page;
