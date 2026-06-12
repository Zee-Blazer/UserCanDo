"use client";

import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { AppleIconSvg, GoogleIconSvg } from "@/assets/icons";
import { useDispatch } from "react-redux";
import usePostRequest from "@/api/hooks/usePost";
import { useGoogleLogin } from "@react-oauth/google";
import { login } from "@/Redux/features/authSlice";
import ChooseRoleModal from "./chooseRoleModal";
import AppleLogin from "react-apple-signin-auth";
import { useAppContext } from "@/app/context";
import { useSearchParams } from "next/navigation";

const AuthBtns = ({ role }: { role?: string }) => {
	const dispatch = useDispatch();
	const [isModalShown, setIsModalShown] = useState(false);
	const [selectedRole, setSelectedRole] = useState("");
	const query = useSearchParams();
	const { isDarkMode } = useAppContext();

	// Helper function to clear URL params and reload
	const clearParamsAndReload = React.useCallback(() => {
		window.history.replaceState({}, "", window.location.pathname);
		window.location.reload();
	}, []);

	const {
		isSuccess: isGoogleAuthComplete,
		loading: isAuthLoading,
		postRequest: googleAuthReq,
		data: authData,
	} = usePostRequest();

	const {
		isSuccess: isAppleAuthComplete,
		loading: isAppleAuthLoading,
		postRequest: appleAuthReq,
		data: appleAuthData,
	} = usePostRequest();

	const {
		isSuccess: isRoleSet,
		loading: isRoleSetting,
		postRequest: updateRoleReq,
	} = usePostRequest();

	const signinWithGoogle = useGoogleLogin({
		onSuccess: async (tokenResponse) => {
			await googleAuthReq("/google_login", {
				access_token: tokenResponse.access_token,
				role: role || "homeowner",
			});
		},
		onError: (error) => console.error("Google Sign-In Error:", error),
	});

	useEffect(() => {
		if (isGoogleAuthComplete) {
			dispatch(login(authData?.payload));
			const payload = authData?.payload;
			if (payload?.access_token) {
				localStorage.setItem("token", payload?.access_token);
				if (payload?.role) {
					clearParamsAndReload();
				} else {
					setIsModalShown(true);
				}
			}
		}
	}, [
		isGoogleAuthComplete,
		authData,
		dispatch,
		setIsModalShown,
		clearParamsAndReload,
	]);

	useEffect(() => {
		if (isAppleAuthComplete) {
			dispatch(login(appleAuthData?.payload));
			const payload = appleAuthData?.payload;
			if (payload?.access_token) {
				if (payload?.role) {
					clearParamsAndReload();
				} else {
					setIsModalShown(true);
				}
			}
		}
	}, [
		isAppleAuthComplete,
		appleAuthData,
		dispatch,
		setIsModalShown,
		clearParamsAndReload,
	]);

	useEffect(() => {
		if (isRoleSet) {
			dispatch(login({ role: selectedRole ?? "homeowner" }));
			clearParamsAndReload();
		}
	}, [isRoleSet, selectedRole, dispatch, clearParamsAndReload]);

	const urlRole = query.get("role");
	const user_id = query.get("user_id");
	const access_token = query.get("access_token");
	const refresh_token = query.get("refresh_token");

	const finalizeAppleAuth = React.useCallback(() => {
		if (access_token) {
			const payload = { access_token, refresh_token, user_id, role: urlRole };
			localStorage.setItem("access_token", access_token);
			dispatch(login(payload));

			if (urlRole !== "homeowner" || urlRole?.includes("broker")) {
				return setIsModalShown(true);
			} else {
				clearParamsAndReload();
			}
		}
	}, [
		access_token,
		refresh_token,
		user_id,
		urlRole,
		dispatch,
		clearParamsAndReload,
	]);

	useEffect(() => {
		if (user_id) {
			finalizeAppleAuth();
		}
	}, [user_id, finalizeAppleAuth]);

	return (
		<div className='flex gap-4 mb-4'>
			<Button
				className='flex items-center gap-2 w-full justify-center dark:border-gray_5 border-gray_2 text-gray_3 lowercase first-letter:uppercase'
				variant='outlined'
				onClick={() => signinWithGoogle()}
				loading={isAuthLoading}
			>
				<GoogleIconSvg />
				<Typography className='capitalize text-gray_5 dark:text-gray_3'>
					Google
				</Typography>
			</Button>
			<AppleLogin
				uiType={isDarkMode ? "dark" : "light"}
				className='flex items-center gap-2 justify-center w-full bg-gray_1 border border-gray_2'
				authOptions={{
					clientId: process.env.NEXT_PUBLIC_SOCIAL_AUTH_APPLE_CLIENT_ID!,
					scope: "name email",
					redirectURI: "https://api.keepingly.com/api/v3/ap/apple_auth",
					state: "state",
					usePopup: false,
				}}
				onSuccess={() => {}}
				onError={(error: unknown) =>
					console.error("Apple Sign-In Error:", error)
				}
				render={(props: any) => (
					<Button
						{...props}
						className='flex items-center gap-2 justify-center w-full bg-gray_1 border border-gray_2'
						loading={isAppleAuthLoading}
					>
						<AppleIconSvg />
						<Typography className='capitalize text-black'>Apple</Typography>
					</Button>
				)}
			/>
			<ChooseRoleModal
				closeModal={() => setIsModalShown(false)}
				handleOpen={() => setIsModalShown(!isModalShown)}
				open={isModalShown}
				setRole={setSelectedRole}
				action={async () =>
					await updateRoleReq("/update_role", {
						role: selectedRole || "homeowner",
					})
				}
				loading={isRoleSetting}
			/>
		</div>
	);
};

export default AuthBtns;
