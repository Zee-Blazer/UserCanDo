"use client";
import usePostRequest from "@/api/hooks/usePost";
import Loading from "@/components/General/loading";
import { ROUTES } from "@/constants/routes";
import { Typography } from "@material-tailwind/react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { use, useEffect } from "react";

const VerifyAccount = () => {
	const searchParams = useSearchParams();
	const token = searchParams.get("token");
	const { isSuccess, postRequest, loading } = usePostRequest();
	const router = useRouter();

	const verify = async () => {
		postRequest("/activate_account", { token });
	};

	useEffect(() => {
		if (token) {
			verify();
		}
	}, [token]);

	useEffect(() => {
		if (isSuccess) {
			setTimeout(() => {
				router.push(ROUTES.login);
			}, 3000);
		}
	}, [isSuccess]);
	return (
		<div>
			<Typography className='dark:text-white text-black text-2xl font-medium'>
				Verify your email address and start managing your home
			</Typography>
			<Typography className='mt-4'>
				Welcome to Keepingly! We&apos;re excited to help you simplify your home
				management. To get started, please verify your email address by clicking
				the link below.
			</Typography>
			<Typography className='mt-4'>
				Once verified, you&apos;ll be able to:
			</Typography>
			<ul className='ml-6 dark:text-gray_4 text-gray_3'>
				<li className='list-disc'>
					Easily schedule and track maintenance tasks
				</li>
				<li className='list-disc'>
					Manage your home&apos;s important documents
				</li>
				<li className='list-disc'>Access valuable homeownership resources</li>
				<li className='list-disc'>And more!</li>
			</ul>
			<Typography className='mt-4'>
				We&apos;re committed to making homeownership hassle-free. If you have
				any questions, our support team is ready to assist you at{" "}
				<span className='text-pry'>support@keepingly.com.</span>
			</Typography>
			<Typography className='mt-4'>Let&apos;s get started!</Typography>
			<Loading isLoading={loading} />
		</div>
	);
};

export default VerifyAccount;
