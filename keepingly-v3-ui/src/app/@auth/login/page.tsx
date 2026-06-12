"use client";
import LoginPage from "@/app/(pages)/login";
import { ROUTES } from "@/constants/routes";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
	const router = useRouter();
	const query = useSearchParams();
	const user_id = query.get("user_id");
	useEffect(() => {
		if (!user_id) router.replace(ROUTES.home);
	}, []);
	return <LoginPage />;
};

export default Login;
