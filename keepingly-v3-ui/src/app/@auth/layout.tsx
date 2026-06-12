"use client";
import AuthLayerFooter from "@/components/Auth/Layout/footer";

import React from "react";
import { LogoSvg } from "@/assets/icons";
import { GoogleOAuthProvider } from "@react-oauth/google";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
	const clientId = process.env.NEXT_PUBLIC_GOOGLE_WEB_CLIENT_ID;
	return (
		<GoogleOAuthProvider clientId={clientId!}>
			<section className='authLayout min-h-screen flex flex-col items-center justify-center p-0 md:p-4 md:py-20'>
				<div className='w-full max-w-[1024px] mx-auto grid grid-cols-1 md:grid-cols-2 items-start justify-center '>
					<div className='hidden md:block'>
						{/* <Image
						src='/images/logo.png'
						alt='logo'
						width={120}
						height={120}
						className='w-[120px] h-[120px] mb-10'
					/> */}
						<LogoSvg />
						<AuthLayerFooter />
					</div>
					<div className='dark:bg-black bg-white shadow-md w-full rounded-md p-4 py-8 md:p-8 min-h-screen md:min-h-0'>
						{children}
					</div>
				</div>
			</section>
		</GoogleOAuthProvider>
	);
};

export default AuthLayout;
