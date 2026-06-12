import React from "react";
import Login from "./login/page";
import AuthLayout from "./layout";

const DefaultAuth = () => {
	return (
		<AuthLayout>
			<Login />
		</AuthLayout>
	);
};

export default DefaultAuth;
