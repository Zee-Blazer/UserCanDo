import ResetPasscode from "@/(pages)/resetPasscode";
import AuthProvider from "@/context/authContext";
import React from "react";

const Page = () => {
	return (
		<AuthProvider>
			<ResetPasscode />
		</AuthProvider>
	);
};

export default Page;
