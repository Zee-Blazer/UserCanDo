import CreateBusinessPage from "@/(pages)/createBusiness";
import AuthProvider from "@/context/authContext";
import React from "react";

const Page = () => {
	return (
		<AuthProvider>
			<CreateBusinessPage />
		</AuthProvider>
	);
};

export default Page;
