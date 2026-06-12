import { colors } from "@/constants/colors";
import { Typography } from "@material-tailwind/react";
import React from "react";
import { Levels } from "react-activity";

interface LoadingProps {
	isLoading: boolean;
	loadingText?: string;
}
const Loading = ({ isLoading, loadingText }: LoadingProps) => {
	if (!isLoading) return null;

	return (
		<div className='fixed w-full h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 flex-col gap-6'>
			<Levels color={colors.pry} />
			<Typography className='text-white text-base'>{loadingText}</Typography>
		</div>
	);
};

export default Loading;
