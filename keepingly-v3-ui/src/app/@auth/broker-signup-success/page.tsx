"use client";
import { Typography } from "@material-tailwind/react";
import { Check } from "@phosphor-icons/react";
import React from "react";

const Page = () => {
	return (
		<div className='py-10'>
			<div className='mx-auto w-20 h-20 bg-green-600 rounded-full flex items-center justify-center'>
				<Check size={50} />
			</div>
			<Typography className='dark:text-white text-black text-center text-2xl font-medium my-6'>
				Registration successful
			</Typography>
			<Typography className='text-center mt-4'>
				Thank you for signing up, your registration is under review and
				we&apos;ll reach out shortly.
			</Typography>
		</div>
	);
};

export default Page;
