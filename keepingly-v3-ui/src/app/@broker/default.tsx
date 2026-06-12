"use client";
import React, { useEffect } from "react";
import AuthLayout from "../@auth/layout";
import Login from "../@auth/login/page";
import { logUserOut } from "@/Redux/features/authSlice";
import { useDispatch } from "react-redux";

const DefaultBroker = () => {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(logUserOut());
	}, []);
	return (
		<AuthLayout>
			<Login />
		</AuthLayout>
	);
};

export default DefaultBroker;
