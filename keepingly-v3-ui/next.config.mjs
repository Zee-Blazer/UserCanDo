/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ["keepinglyblobstorage.blob.core.windows.net"],
		unoptimized: true,
	},
	reactStrictMode: false,
	output: process.env.NEXT_PUBLIC_USE_MOBILE === "true" ? "export" : undefined,
};

export default nextConfig;
