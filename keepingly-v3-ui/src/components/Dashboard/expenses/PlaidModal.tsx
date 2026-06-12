"use client";

import React, { useState, useEffect } from "react";
import { usePlaidLink } from "react-plaid-link";
import Image from "next/image";

import { Dialog, DialogBody, DialogFooter } from "@material-tailwind/react";
import { Plugs, EyeSlash } from "@phosphor-icons/react";

import { useAuthSelector } from "@/Redux/selectors";
import { baseURL } from "@/api";

interface PlaidModalProps {
	isOpen: boolean;
	onClose: () => void;
	onSuccessOpen: () => void;
	setAccessToken: (token: string) => void;
}

export default function PlaidModal({
	isOpen,
	onClose,
	onSuccessOpen,
	setAccessToken,
}: PlaidModalProps) {
	const { user } = useAuthSelector();
	const user_id = user?.user_id;
	const authToken = user?.access_token;

	const [linkToken, setLinkToken] = useState("");

	const create_link_token = `${baseURL}/ap/create_link_token`;
	const exchange_link_public_token = `${baseURL}/ap/exchange_link_public_token`;

	const headers = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${authToken}`,
	};

	// Fetch link token from the backend.
	useEffect(() => {
		const fetchLinkToken = async () => {
			try {
				const response = await fetch(create_link_token, {
					method: "POST",
					headers,
					body: JSON.stringify({ user_id }),
				});

				if (!response.ok) {
					const errorBody = await response.json();
					throw new Error(
						`Failed to create link token: ${
							errorBody.message || response.statusText
						}`
					);
				}

				const textData = await response.text();
				let data = JSON.parse(textData);

				if (typeof data === "string") {
					data = JSON.parse(data);
				}

				const serverToken = data?.payload?.link_token;
				setLinkToken(serverToken);
			} catch (error) {
				console.error("Error fetching link token:", error);
			}
		};

		if (user_id && authToken) {
			fetchLinkToken();
		}
	}, [user_id, authToken]);

	const onSuccess = async (public_token: string) => {
		try {
			// Exchange public token for an access token.
			const exchangeRes = await fetch(exchange_link_public_token, {
				method: "POST",
				headers,
				body: JSON.stringify({ public_token, user_id }),
			});

			if (!exchangeRes.ok) {
				const errorBody = await exchangeRes.json();
				throw new Error(
					`Error exchanging public token: ${
						errorBody.message || exchangeRes.statusText
					}`
				);
			}

			const textRes = await exchangeRes.text();
			let res = JSON.parse(textRes);

			if (typeof res === "string") {
				res = JSON.parse(res);
			}

			const access_token = res?.payload?.access_token;
			setAccessToken(access_token);

			// Close PlaidModal and open SuccessModal
			onClose();
			onSuccessOpen();
		} catch (error) {
			console.error("Error in onSuccess callback:", error);
		}
	};

	const config = {
		token: linkToken,
		onSuccess,
		onExit: (err: any) => {
			if (err) {
				console.error("Plaid Link exited with error:", err.error_message);
			} else {
			}
		},
		onEvent: (eventName: string, metadata: any) => {},
	};

	const { open, ready } = usePlaidLink(config);

	// Function to handle successful connection and close the modal
	const handleSuccess = async (public_token: string): Promise<void> => {
		try {
			const exchangeResponse = await fetch("/api/set_access_token", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ public_token }),
			});

			if (!exchangeResponse.ok) throw new Error("Error exchanging token");
			const { access_token } = await exchangeResponse.json();
		} catch (error) {
			console.error("Error:", error);
		} finally {
			onClose();
		}
	};

	return (
		<>
			<Dialog
				open={isOpen}
				handler={onClose}
				size='sm'
				className='rounded-xl bg-white dark:bg-black'
			>
				<div className='flex flex-col md:max-w-[438px] mx-auto'>
					<DialogBody className='text-base self-center text-black dark:text-white'>
						<div className='flex justify-center my-10 md:mt-[45px] md:mb-6'>
							<Image
								src='/images/svg/keepingly-plaid.svg'
								alt='Plaid Logo'
								width={175}
								height={94.11}
							/>
						</div>

						<h2 className='text-center text-2xl font-normal self-center my-5 md:mb-[47px]'>
							Keepingly uses <span className='font-bold'>Plaid</span> to keep
							track of your expenses
						</h2>

						<div className='space-y-4 gap-6 md:mb-6'>
							<div className='flex flex-col justify-center'>
								<div className='flex items-center gap-2'>
									<Plugs size={20} />
									<p className='font-semibold'>Connect effortlessly</p>
								</div>
								<p className='font-normal opacity-65'>
									Plaid lets you securely connect your financial accounts in
									seconds.
								</p>
							</div>

							<div className='flex flex-col justify-center'>
								<div className='flex gap-3 items-center'>
									<EyeSlash size={20} />
									<p className='font-semibold text-base'>
										Your data belongs to you
									</p>
								</div>
								<p className='font-normal opacity-65'>
									Plaid does not sell personal info, and will only use it with
									your permission.
								</p>
							</div>
						</div>
					</DialogBody>

					<DialogFooter className='flex flex-col gap-2'>
						{user && (
							<button
								onClick={() => open()}
								disabled={!ready}
								className='bg-pry text-white w-full py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50'
							>
								Continue
							</button>
						)}

						<p className='text-center text-xs dark:text-white opacity-65'>
							By selecting &ldquo;Continue&ldquo; you agree to the{" "}
							<a
								href='https://plaid.com/legal/'
								className='text-pry dark:text-white font-bold underline'
							>
								Plaid End User Privacy Policy
							</a>
						</p>
					</DialogFooter>
				</div>
			</Dialog>
		</>
	);
}
