"use client";

import React from "react";
import { usePlaidLink } from "react-plaid-link";

const HARD_CODED_LINK_TOKEN = process.env.NEXT_PUBLIC_PLAID_LINK_TOKEN;

interface PlaidLinkProps {
	onSuccess: (public_token: string) => void;
}

const PlaidLink: React.FC<PlaidLinkProps> = ({ onSuccess }) => {
	const { open, ready } = usePlaidLink({
		token: HARD_CODED_LINK_TOKEN!,
		onSuccess,
		onExit: () => console.warn("User exited Plaid Link"),
	});

	return (
		<button
			onClick={() => open()}
			disabled={!ready}
			className='bg-pry text-white w-full py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50'
		>
			Continue
		</button>
	);
};

export default PlaidLink;
