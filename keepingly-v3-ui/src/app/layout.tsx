import type { Metadata } from "next";
import { Marcellus, Quicksand } from "next/font/google";
import "./globals.css";
import "react-activity/dist/library.css";
import "react-toastify/dist/ReactToastify.css";
import App from "./app";
import { AppProps } from "@/types";

const quicksand = Quicksand({
	weight: ["300", "400", "500", "600", "700"],
	subsets: ["latin"],
	display: "swap",
});

export const metadata: Metadata = {
	title: "Keepingly",
	description: "Manage your home",
};

export default function RootLayout({
	auth,
	broker,
	homeowner,
	appraiser,
}: AppProps) {
	return (
		<html lang='en'>
			<head>
				<meta
					name='viewport'
					content='width=device-width, initial-scale=1, maximum-scale=1.0, user-scalable=no'
				/>
				<link rel='preconnect' href='https://fonts.googleapis.com'></link>
				<link
					rel='preconnect'
					href='https://fonts.gstatic.com'
					crossOrigin=''
				/>
				<link
					href='https://fonts.googleapis.com/css2?family=Marcellus&family=Quicksand:wght@300..700&display=swap'
					rel='stylesheet'
				></link>
				<link rel='icon' href='/logo.png' sizes='any' type='image/png'></link>
			</head>
			<body
				className={`${quicksand.className} dark:bg-gradient-to-b dark:from-[#000000E0] dark:to-[#000000F5] bg-gradient-to-b
				 from-[#FFFFFF] via-[#A61D4A40] to-[#FFFFFF] min-h-screen`}
			>
				<div className={`max-w-[2000px] mx-auto`}>
					<App
						auth={auth}
						broker={broker}
						homeowner={homeowner}
						appraiser={appraiser}
					/>
				</div>
			</body>
		</html>
	);
}
